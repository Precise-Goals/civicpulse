import { MAX_BLOG_LENGTH } from "../utils/constants";
import { fetchWeather } from "./weather";
import { fetchStartupTrends } from "./startups";
import { fetchStockPrices } from "./stocks";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const API = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

export const generateBlogPost = async (articleContent) => {
  try {
    const response = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Write a blog about: ${articleContent}`,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      console.error("Gemini API error:", err);
      throw new Error(err.error?.message || "Failed to generate blog post");
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts[0]?.text || "No content.";
  } catch (error) {
    console.log("Error generating blog post:", error);
    console.log(
      "Failed to Generate the Blog, Please continue with the original article content."
    );
    return articleContent;
  }
};

export const sendMessage = async (message) => {
  try {
    let context = "";

    // 💡 Dynamically enrich context with real-time info
    if (/weather|temperature|rain|climate/i.test(message)) {
      const weather = await fetchWeather("Pune");
      context += `Weather in ${weather.city}: ${weather.temperature}°C, ${weather.condition}, humidity ${weather.humidity}%, wind ${weather.windSpeed}km/h.\n\n`;
    }


    if (/startup|launch|product|founder/i.test(message)) {
      const startupNews = await fetchStartupTrends();
      context += `Startup news:\n${startupNews
        .map((a) => `• ${a.title} (${a.source.name})`)
        .join("\n")}\n\n`;
    }

    if (/stock|market|nifty|tcs|infy|reliance/i.test(message)) {
      const stocks = await fetchStockPrices([
        "TCS.NS",
        "INFY.NS",
        "RELIANCE.NS",
      ]);
      context += `Stock updates:\n${stocks
        .map(
          (s) =>
            `${s.name} (${s.symbol}): ₹${s.price} (${s.change.toFixed(2)}%)`
        )
        .join("\n")}\n\n`;
    }

    const fullPrompt = `
${context}
You are a helpful News assistant. The user is asking: '${message}'.
Respond in the same language, keeping the tone friendly and concise.
Be knowledgeable to the topic and provide accurate information.
`;

    const response = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: fullPrompt.trim() }],
          },
        ],
        safetySettings: [
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 512,
          stopSequences: [],
        },
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      console.error("Gemini API Error:", err);
      throw new Error("Failed to process chat message");
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    // console.log("Chat response:", text);
    return text || "No response.";
  } catch (error) {
    console.error("Error processing chat message:", error);
    throw error;
  }
};

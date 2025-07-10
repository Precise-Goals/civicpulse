import { MAX_BLOG_LENGTH } from "../utils/constants";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const API = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

export const generateBlogPost = async (articleContent) => {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
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
      }
    );

    if (!response.ok) {
      const err = await response.json();
      console.error("Gemini API error:", err);
      throw new Error(err.error?.message || "Failed to generate blog post");
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts[0]?.text || "No content.";
  } catch (error) {
    console.error("Error generating blog post:", error);
    return "⚠️ Failed to generate blog. Please try again later.";
  }
};

export const sendMessage = async (message) => {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    const response = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `You are a helpful assistant. The user is asking: '${message}'. Respond in the same language, keeping the tone friendly and concise.`,
              },
            ],
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
          maxOutputTokens: 256,
          stopSequences: [],
        },
      }),
    });
    if (!response.ok) throw new Error("Failed to process chat message");
    const data = await response.json();
    console.log(
      "Chat response data:",
      data.candidates[0].content.parts[0].text
    );
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Error processing chat message:", error);
    throw error;
  }
};

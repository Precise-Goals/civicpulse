// src/api/gemini.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getDatabase, ref, get, set } from "firebase/database";

import { fetchWeather } from "./weather";
import { fetchStartupTrends } from "./startups";
import { fetchStockPrices } from "./stocks";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(apiKey);

// Reusable model instance
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  generationConfig: {
    temperature: 0.7,
    topK: 40,
    topP: 0.95,
    maxOutputTokens: 512,
  },
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
});

/**
 * Increment usage counters + timestamp logging
 */
async function incrementUserCount(userId, field) {
  if (!userId) return;

  const db = getDatabase();

  // Total count
  const countRef = ref(db, `users/${userId}/${field}Count`);
  const snapshot = await get(countRef);
  const currentCount = snapshot.exists() ? snapshot.val() : 0;
  await set(countRef, currentCount + 1);

  // Timestamp log
  const timestamp = Date.now();
  const tsRef = ref(db, `users/${userId}/${field}Timestamps/${timestamp}`);
  await set(tsRef, true);
}

/**
 * Blog generation
 */
export const generateBlogPost = async (articleContent, userId) => {
  try {
    const prompt = `Write a blog about: ${articleContent}`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    await incrementUserCount(userId, "blog");

    return text || "No content.";
  } catch (error) {
    console.error("Error generating blog post:", error);
    return articleContent;
  }
};

/**
 * Chat / News assistant
 */
export const sendMessage = async (message, userId) => {
  try {
    let context = "";

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
You are a helpful News assistant.
The user is asking: "${message}"

Respond in the same language.
Keep the tone friendly, concise, and accurate.
`;

    const result = await model.generateContent(fullPrompt.trim());
    const response = result.response;
    const text = response.text();

    await incrementUserCount(userId, "chat");

    return text || "No response.";
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

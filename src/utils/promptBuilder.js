import { fetchWeather } from "../api/weather";
import { fetchStockPrices } from "../api/stocks";
import { fetchStartupTrends } from "../api/startups";

/**
 * Builds a real-time enriched prompt for Gemini based on user input.
 */
export const buildPromptWithContext = async (userInput) => {
  let context = "";

  // 🔵 Weather injection
  if (/weather|temperature|rain|climate/i.test(userInput)) {
    try {
      const weather = await fetchWeather("India");
      context += `Weather update for ${weather.city}:\n- Temperature: ${weather.temperature}°C\n- Condition: ${weather.condition}\n- Humidity: ${weather.humidity}%\n- Wind Speed: ${weather.windSpeed} km/h\n\n`;
    } catch (err) {
      console.warn("Weather fetch failed:", err);
    }
  }

  // 🟢 Stock data injection
  if (/stock|market|nifty|sensex|tcs|infy|reliance/i.test(userInput)) {
    try {
      const stocks = await fetchStockPrices([
        "APPLE",
        "GOOGLE",
        "MICROSOFT",
        "TESLA",
        "META",
      ]);
      context += `Stock Market Snapshot:\n${stocks
        .map(
          (s) =>
            `- ${s.name} (${s.symbol}): ₹${s.price} (${s.change.toFixed(2)}%)`
        )
        .join("\n")}\n\n`;
    } catch (err) {
      console.warn("Stock fetch failed:", err);
    }
  }

  // 🟣 Startup launch headlines
  if (/startup|product|launch|founder|pitch/i.test(userInput)) {
    try {
      const startups = await fetchStartupTrends();
      context += `Latest Startup Highlights:\n${startups
        .map((a) => `- ${a.title} (${a.source.name})`)
        .join("\n")}\n\n`;
    } catch (err) {
      console.warn("Startup fetch failed:", err);
    }
  }

  // 🎯 Final prompt injected to Gemini
  return `
${context.trim()}
You are CivicPulse, a helpful real-time civic assistant.
The user says: "${userInput}"
Respond in the same language, concisely, factually, and in a friendly tone.
Avoid hallucinations. Always stick to current factual data if available.
`.trim();
};

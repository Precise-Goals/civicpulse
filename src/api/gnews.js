import { DEFAULT_TOPIC } from "../utils/constants";
// import process from "process";

const apiKey = "b2923d8c391df0bf64424d4db99c3e16";

export const fetchNews = async (topic = DEFAULT_TOPIC) => {
  try {
    // In production, try to use serverless function first
    // In development, use direct API call (with CORS limitations)
    const useServerless = import.meta.env.PROD;

    if (useServerless) {
      // Use serverless function in production
      const params = new URLSearchParams({
        category: 'Economy',
        lang: 'en',
        country: 'in',
        max: '5'
      });

      if (topic && topic !== DEFAULT_TOPIC) {
        params.set('topic', topic.trim().slice(0, 90));
      }

      const url = `/api/news?${params.toString()}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Serverless function error:", errorData);
        throw new Error(errorData.error || "Failed to fetch news from API");
      }

      const data = await response.json();
      console.log("Fetched news data from serverless:", data);
      return data.articles || [];
    } else {
      // Development: Direct API call (may have CORS issues in browser)
      // Note: This will work if running through a local proxy or server
      if (!apiKey) {
        console.error("VITE_GNEWS_API_KEY not found in environment");
        return [];
      }

      const url = `https://gnews.io/api/v4/top-headlines?category=Economy&lang=en&country=in&max=5&apikey=${apiKey}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        console.error("GNews API error:", response.status);
        throw new Error("Failed to fetch news");
      }

      const data = await response.json();
      console.log("Fetched news data:", data);
      return data.articles || [];
    }
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};

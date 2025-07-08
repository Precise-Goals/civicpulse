import { GNEWS_API_URL, DEFAULT_TOPIC } from "../utils/constants";

export const fetchNews = async (topic = DEFAULT_TOPIC) => {
  try {
    const apiKey = import.meta.env.VITE_GNEWS_API_KEY;
    const response = await fetch(`${GNEWS_API_URL}?q=${topic}&token=${apiKey}`);
    if (!response.ok) throw new Error("Failed to fetch news");
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};
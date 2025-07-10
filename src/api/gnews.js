import { GNEWS_API_URL, DEFAULT_TOPIC } from "../utils/constants";

export const fetchNews = async (topic = DEFAULT_TOPIC) => {
  try {
    const apiKey = import.meta.env.VITE_GNEWS_API_KEY;

    // Clean and encode query
    const cleanTopic = topic.trim().slice(0, 90); // avoid overly long queries
    const url = "https://gnews.io/api/v4/search?q=example&lang=en&country=in&max=10&apikey=b2923d8c391df0bf64424d4db99c3e16";
    // `${GNEWS_API_URL}?q=${encodeURIComponent(
    //   cleanTopic
    // )}&lang=en&max=5&token=${apiKey}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch news");

    const data = await response.json();
    console.log("Fetched news data:", data);
    return data.articles;
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
};

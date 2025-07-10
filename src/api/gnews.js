import { GNEWS_API_URL, DEFAULT_TOPIC } from "../utils/constants";

const apiKey = import.meta.env.VITE_GNEWS_API_KEY;

export const fetchNews = async (topic = DEFAULT_TOPIC) => {
  try {

    // Clean and encode query
    const cleanTopic = topic.trim().slice(0, 90); // avoid overly long queries
    // top-headlines?category=general&lang=en&country=us&max=10
    const url = `https://gnews.io/api/v4/top-headlines?category=Economy&lang=en&country=in&max=5&apikey=${apiKey}`;
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

import { GNEWS_API_URL } from "../utils/constants";

export const fetchStartupTrends = async () => {
  const apiKey = import.meta.env.VITE_GNEWS_API_KEY;

  const response = await fetch(
    `${GNEWS_API_URL}?q=startup+launch OR product+launch&lang=en&max=5&token=${apiKey}`
  );

  if (!response.ok) {
    console.error("Startup News API error", await response.text());
    throw new Error("Failed to fetch startup news");
  }

  const data = await response.json();
  return data.articles;
};

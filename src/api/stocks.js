import { mapToTwelveSymbol } from "../utils/stockSymbolMap";

export const fetchStockPrices = async (
  symbols = ["APPLE", "GOOGLE", "MICROSOFT", "TESLA", "META"]
) => {
  try {
    const results = [];

    for (const symbol of symbols) {
      const mapped = mapToTwelveSymbol(symbol);
      if (!mapped) {
        console.warn(`Symbol not mapped: ${symbol}`);
        continue;
      }

      const res = await fetch(
        `https://api.twelvedata.com/quote?symbol=${mapped}&apikey=${
          import.meta.env.VITE_TWELVEDATA_API_KEY
        }`
      );
      const data = await res.json();

      if (data.code) {
        console.warn("TwelveData error:", data.message);
        continue;
      }

      results.push({
        name: data.name,
        symbol: data.symbol,
        price: parseFloat(data.price),
        change: parseFloat(data.percent_change),
      });
    }

    return results;
  } catch (err) {
    console.error("Failed to fetch stock prices:", err);
    throw err;
  }
};

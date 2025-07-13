export const symbolMap = {
  APPLE: "AAPL",
  GOOGLE: "GOOG",
  MICROSOFT: "MSFT",
  TESLA: "TSLA",
  META: "META",
};

/**
 * Maps user-provided stock names or Yahoo-style symbols to TwelveData format.
 */
export const mapToTwelveSymbol = (rawSymbol) => {
  const key = rawSymbol.replace(".NS", "").replace(".BSE", "").toUpperCase();
  return symbolMap[key] || null;
};

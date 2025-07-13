// src/components/chat/SuggestionCards.jsx
import React from "react";

const suggestions = [
  "Weather updates",
  "Stock Market Highlights",
  "Startup launches this week",
];

const SuggestionCards = ({ onSelect }) => {
  return (
    <div className="flex overflow-x-auto space-x-3 p-2">
      {suggestions.map((s, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(s)}
          className="flex-shrink-0 bg-gray-100 hover:bg-blue-100 text-sm text-gray-800 px-3 py-1 rounded-full border border-gray-300"
        >
          {s}
        </button>
      ))}
    </div>
  );
};

export default SuggestionCards;

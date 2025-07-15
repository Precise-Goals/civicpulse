// src/components/chat/SuggestionCards.jsx
import React from "react";

const suggestions = [
  "Weather updates",
  "Stock Market Highlights",
  "Startup launches this week",
];

const SuggestionCards = ({ onSelect }) => {
  return (
    <div className="SuggestionCards">
      <h1 className="gemini">Civic Ai</h1>
      <div className="sugges">
        {suggestions.map((s, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(s)}
            className="suggestioncard"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestionCards;

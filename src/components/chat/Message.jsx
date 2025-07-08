import React from "react";

const Message = ({ text, sender }) => (
  <div
    className={`mb-4 p-3 rounded-lg max-w-[80%] ${
      sender === "user"
        ? "ml-auto bg-blue-100 text-right"
        : "mr-auto bg-gray-100 text-left"
    }`}
  >
    <p className="text-sm">{text}</p>
  </div>
);

export default Message;
import React from "react";

const Message = ({ text, sender }) => (
  <div
    className={`mb-4 p-3 rounded-lg max-w-[80%] ${
      sender === "user"
        ? "usee"
        : "gemi"
    }`}
  >
    <p className="txtsa">{text}</p>
  </div>
);

export default Message;
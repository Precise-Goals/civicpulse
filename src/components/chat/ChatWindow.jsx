import React, { useState, useEffect, useRef } from "react";
import Message from "./Message";
import Button from "../common/Button";
import ReactMarkdown from "react-markdown";
import { sendMessage } from "../../api/gemini";
import SuggestionCards from "./SuggestionCards";
import {
  saveMessageToThread,
  fetchThreadMessages,
} from "../../firebase/chatThreads";
import { v4 as uuidv4 } from "uuid";

const ChatWindow = ({ userId, threadId, onNewThread }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Fetch messages when threadId changes
  useEffect(() => {
    if (!userId || !threadId) return;
    const unsubscribe = fetchThreadMessages(userId, threadId, setMessages);
    return () => unsubscribe();
  }, [userId, threadId]);

  // Scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (customText) => {
    const messageText = customText || input;
    if (!messageText.trim()) return;

    setIsLoading(true);

    const userMessage = {
      text: messageText,
      sender: "user",
      timestamp: new Date(),
    };

    let currentThreadId = threadId;

    // New thread logic
    const isFirst = !currentThreadId;
    if (isFirst) {
      currentThreadId = uuidv4();
      if (onNewThread) onNewThread(currentThreadId); // Notify parent
    }

    setMessages((prev) => [...prev, userMessage]);

    try {
      await saveMessageToThread(userId, currentThreadId, userMessage, isFirst);

      const aiText = await sendMessage(messageText);
      const aiMessage = {
        text: aiText,
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      await saveMessageToThread(userId, currentThreadId, aiMessage, false);
      setInput("");
    } catch (err) {
      console.error("Chat error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[80vh] w-full bg-white shadow-md rounded-lg">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 && (
          <SuggestionCards
            onSelect={(text) => {
              setInput(text);
              handleSend(text);
            }}
          />
        )}

        {messages.map((msg, index) =>
          msg.sender === "ai" ? (
            <div
              key={index}
              className="mb-4 p-3 rounded-lg max-w-[80%] mr-auto bg-gray-100 text-left"
            >
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
          ) : (
            <Message key={index} text={msg.text} sender={msg.sender} />
          )
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !isLoading) handleSend();
            }}
            className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message..."
            disabled={isLoading}
          />
          <Button onClick={() => handleSend()} disabled={isLoading}>
            {isLoading ? "Sending..." : "Send"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;

import React, { useEffect, useState, useRef } from "react";
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
  const [localThreadId, setLocalThreadId] = useState(threadId);

  // Update localThreadId when a new one is passed from props
  useEffect(() => {
    setLocalThreadId(threadId);
  }, [threadId]);

  // Load messages when threadId exists
  useEffect(() => {
    if (!userId || !localThreadId) return;
    const unsubscribe = fetchThreadMessages(userId, localThreadId, setMessages);
    return () => unsubscribe();
  }, [userId, localThreadId]);

  // Auto-scroll
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

    let currentThreadId = localThreadId;

    const isNew = !currentThreadId;
    if (isNew) {
      currentThreadId = uuidv4();
      setLocalThreadId(currentThreadId); // For internal reference
      if (onNewThread) onNewThread(currentThreadId); // Let parent know
    }

    setMessages((prev) => [...prev, userMessage]);

    try {
      await saveMessageToThread(userId, currentThreadId, userMessage, isNew);

      const aiText = await sendMessage(messageText, userId);
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
    <div className="chatWindow">
      <div className="messages">
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
            <div key={index} className="msgggai">
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
          ) : (
            <Message key={index} text={msg.text} sender={msg.sender} />
          )
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="inputArea">
        <div className="seninp">
          
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)} 
            onKeyDown={(e) => {
              if (e.key === "Enter" && !isLoading) handleSend();
            }}
            className="inputField" 
            placeholder="Ask me anything"
            disabled={isLoading}
          />
          <Button onClick={() => handleSend()} disabled={isLoading}>
            {isLoading ? "Analyzing" : "Send"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;

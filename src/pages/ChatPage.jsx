import React, { useState } from "react";
import ChatWindow from "../components/chat/ChatWindow";
import Sidebar from "../components/chat/Sidebar";
import { useAuth } from "../hooks/useAuth";

const ChatPage = () => {
  const { user } = useAuth();
  const [threadId, setThreadId] = useState(null);

  return (
    <div className="geminiAi">
      <Sidebar
        userId={user.uid}
        currentThreadId={threadId}
        onSelectThread={setThreadId}
        onNewChat={() => setThreadId(null)}
      />
      <div className="geminiWind">
        <ChatWindow
          userId={user.uid}
          key={threadId || "new"}
          threadId={threadId}
          onNewThread={(newId) => setThreadId(newId)}
        />
      </div>
    </div>
  );
};

export default ChatPage;

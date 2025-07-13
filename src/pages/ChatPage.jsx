import Sidebar from "../components/chat/Sidebar";
import ChatWindow from "../components/chat/ChatWindow";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth"; // Assuming you have an auth hook

export default function ChatPage() {
  const { user } = useAuth();
  const [activeThreadId, setActiveThreadId] = useState(null);
  const handleNewChat = () => {
    setActiveThreadId(null); // triggers new thread creation in ChatWindow
  };
  if (!user) return <p>Loading...</p>;

  return (
    <div className="flex h-screen">
      <Sidebar
        userId={user.uid}
        currentThreadId={activeThreadId}
        onSelectThread={setActiveThreadId}
        onNewChat={handleNewChat}
      />
      <ChatWindow userId={user.uid} threadId={activeThreadId} />
    </div>
  );
}

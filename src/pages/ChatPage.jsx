import React from "react";
import { Navigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import ChatWindow from "../components/chat/ChatWindow";
import { useAuth } from "../hooks/useAuth";

const ChatPage = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-4">
        <ChatWindow userId={user.uid} />
      </div>
    </div>
  );
};

export default ChatPage;
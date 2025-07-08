import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";

const HomePage = () => (
  <div className="min-h-screen bg-gray-100">
    <Navbar />
    <div className="max-w-4xl mx-auto p-4 text-center">
      <h1 className="text-3xl font-bold mb-6">Welcome to News Blog</h1>
      <p className="text-lg mb-4">
        Discover the latest news transformed into engaging blog posts and chat with our multilingual AI assistant.
      </p>
      <div className="flex justify-center space-x-4">
        <Link
          to="/blogs"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Explore Blogs
        </Link>
        <Link
          to="/chat"
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Start Chatting
        </Link>
      </div>
    </div>
  </div>
);

export default HomePage;
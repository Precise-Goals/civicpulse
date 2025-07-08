import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-lg font-bold">
        <Link to="/">News Blog</Link>
      </div>
      <div className="flex space-x-4">
        <Link to="/" className="hover:text-blue-300">Home</Link>
        <Link to="/blogs" className="hover:text-blue-300">Blogs</Link>
        {user ? (
          <Link to="/chat" className="hover:text-blue-300">Chat</Link>
        ) : (
          <Link to="/login" className="hover:text-blue-300">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
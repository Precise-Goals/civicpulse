import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-lg font-bold">
        <Link to="/">CivicPulse</Link>
      </div>
      <div className="flex space-x-4">
        <Link to="/" className="c hover:text-blue-300">
          Home
        </Link>
        <Link to="/blogs" className=" c hover:text-blue-300">
          Blogs
        </Link>
        {user && (
          <Link to="/chat" className=" c hover:text-blue-300">
            Chat
          </Link>
        )}
        {user && (
          <Link to="/dashboard" className=" c hover:text-blue-300">
            Dashboard
          </Link>
        )}
        {!user ? (
          <Link to="/login" className=" c hover:text-blue-300">
            Login
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className=" c hover:text-red-400 bg-transparent border-none focus:outline-none"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

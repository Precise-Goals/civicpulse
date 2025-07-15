import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase/config";
import Navbar from "../components/common/Navbar";
import Button from "../components/common/Button";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/chat");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/chat");
    } catch (err) {
      setError("Google login failed");
    }
  };

  return (
    <div
      className="min-h-screen bg-gray-100 flex items-center justify-center"
      style={{ position: "relative" }}
    >
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <img src="spark.png" className="justimg" alt="justnewimage" />
        <p className="abs" style={{ position: "absolute" }}>
          As a Test User use test@admin.com as Email and testadmin as Password.
        </p>
        <h2 className="text-2xl font-bold mb Abi-4 text-center">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
          />
        </div>

        <Button onClick={handleEmailLogin} className="logmail">
          Login with Email
        </Button>
        <Button onClick={handleGoogleLogin} className="golog">
          Login with Google
        </Button>
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:text-blue-700">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

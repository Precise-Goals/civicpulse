import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { useAuth } from "./hooks/useAuth";
import BlogDetail from "./components/blog/BlogDetail";
import Navbar from "./components/common/Navbar";
import DashboardPage from "./pages/DashboardPage";
import ReviewPage from "./pages/ReviewPage";
import "./App.css";
import Footer from "./components/common/Footer";
import { Cursor } from "./components/common/Cursor";
import "./index.css";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  return user ? children : <Navigate to="/login" />;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />

    <Route
      path="/blogs"
      element={
        <ProtectedRoute>
          <BlogPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/blogs/:id"
      element={
        <ProtectedRoute>
          <BlogDetail />
        </ProtectedRoute>
      }
    />
    <Route
      path="/chat"
      element={
        <ProtectedRoute>
          <ChatPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      }
    />

    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<SignUpPage />} />
    <Route path="/reviews" element={<ReviewPage />} />
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

const App = () => (
  <AuthProvider>
    {/* <Cursor /> */}
    <BrowserRouter>
      <div className="wrap" style={{ padding: "4% 8%" }}>
        <Navbar />
        <hr className="navlin" />
        <AppRoutes />
      </div>
      <Footer />
    </BrowserRouter>
  </AuthProvider>
);

export default App;

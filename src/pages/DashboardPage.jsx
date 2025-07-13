// src/pages/DashboardPage.jsx
import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function DashboardPage() {
  const auth = getAuth();
  const user = auth.currentUser;
  const db = getDatabase();

  const [chatCount, setChatCount] = useState(0);
  const [blogCount, setBlogCount] = useState(0);
  const [chatLast30SecCount, setChatLast30SecCount] = useState(0);
  const [blogLast30SecCount, setBlogLast30SecCount] = useState(0);

  const [review, setReview] = useState("");
  const [savedReview, setSavedReview] = useState(null);
  const [loadingCounts, setLoadingCounts] = useState(true);
  const [loadingReview, setLoadingReview] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [chatHistory, setChatHistory] = useState([]);
  const [blogHistory, setBlogHistory] = useState([]);

  useEffect(() => {
    if (!user) return;

    const userRef = ref(db, `users/${user.uid}`);
    const unsubscribe = onValue(
      userRef,
      (snapshot) => {
        const data = snapshot.val() || {};
        setChatCount(data.chatCount || 0);
        setBlogCount(data.blogCount || 0);

        // Mock graph history
        setChatHistory([
          { date: "2025-07-11", count: data.chatCount || 0 },
          { date: "2025-07-12", count: data.chatCount || 0 },
          { date: "2025-07-13", count: data.chatCount || 0 },
        ]);
        setBlogHistory([
          { date: "2025-07-11", count: data.blogCount || 0 },
          { date: "2025-07-12", count: data.blogCount || 0 },
          { date: "2025-07-13", count: data.blogCount || 0 },
        ]);

        setLoadingCounts(false);
      },
      (error) => {
        console.error("Failed to load counts:", error);
        setLoadingCounts(false);
      }
    );

    return () => unsubscribe();
  }, [user, db]);

  useEffect(() => {
    if (!user) return;

    const reviewRef = ref(db, `reviews/${user.uid}`);
    const unsubscribe = onValue(
      reviewRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setReview(data.message || "");
          setSavedReview(data.message || "");
        } else {
          setReview("");
          setSavedReview(null);
        }
        setLoadingReview(false);
      },
      (error) => {
        console.error("Failed to load review:", error);
        setLoadingReview(false);
      }
    );

    return () => unsubscribe();
  }, [user, db]);

  // 🔁 Live 30-second metric count
  useEffect(() => {
    if (!user) return;

    const now = Date.now();
    const THIRTY_SECONDS = 30 * 1000;
    const fields = ["chat", "blog"];

    fields.forEach((field) => {
      const tsRef = ref(db, `users/${user.uid}/${field}Timestamps`);
      onValue(tsRef, (snapshot) => {
        const data = snapshot.val() || {};
        const recent = Object.keys(data).filter(
          (ts) => now - ts < THIRTY_SECONDS
        );
        if (field === "chat") {
          setChatLast30SecCount(recent.length);
        } else {
          setBlogLast30SecCount(recent.length);
        }
      });
    });
  }, [user]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!user) return alert("Please login first.");
    if (!review.trim()) return alert("Review cannot be empty.");
    setSubmitting(true);
    try {
      await set(ref(db, `reviews/${user.uid}`), {
        name: user.displayName || user.email || "Anonymous",
        message: review.trim(),
      });
      setSavedReview(review.trim());
      setReview("");
    } catch (error) {
      console.error("Failed to save review:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) return <p>Please login to view dashboard.</p>;

  return (
    <div style={{ maxWidth: 700, margin: "20px auto", padding: 20 }}>
      <h1>Dashboard for {user.displayName || user.email}</h1>

      <section style={{ marginBottom: 30 }}>
        <h2>Usage Metrics</h2>
        {loadingCounts ? (
          <p>Loading counts...</p>
        ) : (
          <>
            <ul>
              <li>
                Blog Posts Generated: <strong>{blogCount}</strong>
              </li>
              <li>
                Chat Messages Sent: <strong>{chatCount}</strong>
              </li>
            </ul>

            <div style={{ height: 300, marginTop: 30 }}>
              <h3>Blog Posts Over Time</h3>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={blogHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 50]}/>
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="count" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div style={{ height: 300, marginTop: 30 }}>
              <h3>Chat Messages Over Time</h3>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chatHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0,50]}/>
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="count" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </section>

      <section>
        <h2>Your Review</h2>
        {loadingReview ? (
          <p>Loading review...</p>
        ) : (
          <form onSubmit={handleSubmitReview}>
            <textarea
              rows={4}
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your review..."
              disabled={submitting}
              style={{ width: "100%", padding: 10 }}
            />
            <button
              type="submit"
              disabled={submitting}
              style={{ marginTop: 10, padding: "8px 16px" }}
            >
              {submitting
                ? "Saving..."
                : savedReview
                ? "Update Review"
                : "Submit Review"}
            </button>
          </form>
        )}
      </section>
    </div>
  );
}

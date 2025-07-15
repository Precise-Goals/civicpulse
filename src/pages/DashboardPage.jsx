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
import { groupTimestampsByHour } from "../utils/timeUtils";

export default function DashboardPage() {
  const auth = getAuth();
  const user = auth.currentUser;
  const db = getDatabase();

  const [chatCount, setChatCount] = useState(0);
  const [blogCount, setBlogCount] = useState(0);
  const [chatLast30SecCount, setChatLast30SecCount] = useState(0);
  const [blogLast30SecCount, setBlogLast30SecCount] = useState(0);
  const [chatHistory, setChatHistory] = useState([]);
  const [blogHistory, setBlogHistory] = useState([]);
  const [review, setReview] = useState("");
  const [savedReview, setSavedReview] = useState(null);
  const [loadingReview, setLoadingReview] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // ✅ Fetch usage counts & hourly breakdowns
  useEffect(() => {
    if (!user) return;

    const fields = ["chat", "blog"];
    const now = Date.now();
    const THIRTY_SECONDS = 30 * 1000;

    fields.forEach((field) => {
      const countRef = ref(db, `users/${user.uid}/${field}Count`);
      const tsRef = ref(db, `users/${user.uid}/${field}Timestamps`);

      onValue(countRef, (snapshot) => {
        const count = snapshot.val() || 0;
        if (field === "chat") setChatCount(count);
        else setBlogCount(count);
      });

      onValue(tsRef, (snapshot) => {
        const data = snapshot.val() || {};
        const hourly = groupTimestampsByHour(data);
        const recent = Object.keys(data).filter(
          (ts) => now - ts < THIRTY_SECONDS
        );

        if (field === "chat") {
          setChatHistory(hourly);
          setChatLast30SecCount(recent.length);
        } else {
          setBlogHistory(hourly);
          setBlogLast30SecCount(recent.length);
        }
      });
    });
  }, [user]);

  // ✅ Load review
  useEffect(() => {
    if (!user) return;

    const reviewRef = ref(db, `reviews/${user.uid}`);
    onValue(
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
  }, [user]);

  // ✅ Submit review
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

  if (!user) return <p>Please login to view your dashboard.</p>;

  return (
    <div className="lmao">
      <div className="divdasg">
        <h1 className="text-2xl font-bold mb-2">
          Dashboard for {user.displayName || user.email}
        </h1>

        <section className="mb-6">
          <ul className="text-sm space-y-1">
            <li>✅ Blog Posts: {blogCount}</li>
            <li>💬 Chat Messages: {chatCount}</li>
          </ul>
        </section>

        <section className="charts">
          <div className="blo">
            <h3 className="text-lg font-semibold">📈 Blog Usage</h3>
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={blogHistory}>
                  <CartesianGrid strokeDasharray="4 4" />
                  <XAxis dataKey="hour" />
                  <YAxis allowDecimals={false} domain={[0, 75]} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#8884d8"
                    name="Blogs"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="ch">
            <h3 className="text-lg font-semibold mt-8">📈 Chat Usage</h3>
            <div style={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chatHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis allowDecimals={false} domain={[0, 50]} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#34d399"
                    name="Chats"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      </div>

      <section className="ReviewSection">
        <h2 className="text-lg font-semibold mb-2">Your Reviews</h2>
        {loadingReview ? (
          <p>Loading review...</p>
        ) : (
          <form onSubmit={handleSubmitReview}>
            <textarea
              rows={4}
              className="w-full border p-2 rounded"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your review..."
              disabled={submitting}
            />
            <button
              type="submit"
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
              disabled={submitting}
            >
              {submitting
                ? "Submitting..."
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

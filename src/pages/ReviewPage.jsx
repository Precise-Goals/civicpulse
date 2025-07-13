import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = getDatabase();
    const reviewRef = ref(db, "reviews");

    const unsubscribe = onValue(
      reviewRef,
      (snapshot) => {
        const data = snapshot.val();
        const reviewList = [];

        if (data) {
          Object.entries(data).forEach(([uid, review]) => {
            reviewList.push({
              id: uid,
              name: review.name || "Anonymous",
              message: review.message,
            });
          });
        }

        setReviews(reviewList);
        setLoading(false);
      },
      (error) => {
        console.error("Failed to fetch reviews:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">📝 User Reviews</h2>
      {loading ? (
        <p className="text-gray-500">Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p className="text-gray-500">No reviews submitted yet.</p>
      ) : (
        <ul className="space-y-4">
          {reviews.map((review) => (
            <li
              key={review.id}
              className="border p-4 rounded-md shadow-sm bg-white"
            >
              <p className="text-gray-700 mb-1">"{review.message}"</p>
              
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReviewPage;

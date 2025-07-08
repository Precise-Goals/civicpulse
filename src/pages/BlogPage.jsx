import React, { useState, useEffect } from "react";
import Navbar from "../components/common/Navbar";
import BlogCard from "../components/blog/BlogCard";
import Loader from "../components/common/Loader";
import { fetchBlogs } from "../firebase/firestore";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const fetchedBlogs = await fetchBlogs();
        setBlogs(fetchedBlogs);
      } catch (error) {
        console.error("Error loading blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    loadBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Latest Blogs</h1>
        {loading ? (
          <Loader />
        ) : blogs.length === 0 ? (
          <p className="text-gray-600">No blogs available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                title={blog.title}
                content={blog.content}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
import { useEffect, useState } from "react";
import { fetchNews } from "../api/gnews";
import { generateBlogPost } from "../api/gemini";
import { saveBlog, fetchBlogs } from "../firebase/firestore";
import BlogCard from "../components/blog/BlogCard";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load generated blogs from Firestore
  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const storedBlogs = await fetchBlogs();
        setBlogs(storedBlogs);
      } catch (err) {
        console.error("Error loading blogs:", err);
      }
    };
    loadBlogs();
  }, []);

  // Admin: Generate & save blog from GNews
  const handleGenerateBlogs = async () => {
    setLoading(true);
    try {
      const newsArticles = await fetchNews("technology OR startups");
      const topArticles = newsArticles.slice(0, 2);

      for (const article of topArticles) {
        const content = article.content || article.description || article.title;
        const blog = await generateBlogPost(content);

        await saveBlog({
          title: article.title,
          content: blog,
          url: article.url,
        });
      }

      const updatedBlogs = await fetchBlogs();
      setBlogs(updatedBlogs);
    } catch (err) {
      console.error("Blog generation failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">CivicPulse Blog</h1>
        <button
          onClick={handleGenerateBlogs}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Blogs"}
        </button>
      </div>

      {blogs.length === 0 ? (
        <p className="text-gray-600">No blogs available yet.</p>
      ) : (
        <div className="grid gap-6">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogPage;

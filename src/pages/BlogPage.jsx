import { useEffect, useState } from "react";
import { fetchNews } from "../api/gnews";
import { generateBlogPost } from "../api/gemini";
// import { saveBlog, fetchBlogs } from "../firebase/firestore";
import BlogCard from "../components/blog/BlogCard";
import { useAuth } from "../hooks/useAuth";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // Admin: Generate & save blog from GNews
  const handleGenerateBlogs = async () => {
    setLoading(true);
    try {
      const newsArticles = await fetchNews("technology OR startups");
      const topArticles = newsArticles.slice(1, 7);

      console.log("Top articles fetched:", topArticles);

      const generated = [];

      for (const article of topArticles) {
        const content = article.content || article.description || article.title;
        const blogContent = await generateBlogPost(content, user.uid);

        generated.push({
          id: crypto.randomUUID(), // fake ID for rendering
          title: article.title,
          content: blogContent,
          image: article.image,
          source: article.source.name,
          original_news_url: article.url,
          generated_date: new Date().toISOString(),
          author: "Gemini AI",
        });
      }

      setBlogs(generated); // Show blogs without saving
    } catch (err) {
      console.error("Blog generation failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="content">
          CivicPulse <br /> <p>We have Realtime insightfull News Agent, currently its mainly optimized for Indian Regions, soon will be available based on user preferences.</p>
        </h1>
        <button
          onClick={handleGenerateBlogs}
          className={loading ? "still" : "not-still"}
          disabled={loading}
        >
          {loading ? "Generating" : "Try Out AI Blog"}
        </button>
      </div>

      {blogs.length === 0 ? (
        <p className="text-gray-600"></p>
      ) : (
        <div className="Blogs" style={{filter:"invert(1)"}} >
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogPage;

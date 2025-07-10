import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import ReactMarkdown from "react-markdown";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlog = async () => {
      try {
        const blogRef = doc(db, "blogs", id);
        const blogSnap = await getDoc(blogRef);

        if (blogSnap.exists()) {
          setBlog({ id: blogSnap.id, ...blogSnap.data() });
        } else {
          console.error("Blog not found");
        }
      } catch (err) {
        console.error("Failed to load blog", err);
      } finally {
        setLoading(false);
      }
    };

    loadBlog();
  }, [id]);

  if (loading) return <p className="text-center mt-4">Loading blog...</p>;
  if (!blog)
    return <p className="text-center mt-4 text-red-600">Blog not found.</p>;

  const date = blog.generated_date
    ? new Date(blog.generated_date.seconds * 1000).toLocaleDateString()
    : "Unknown date";

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
      <p className="text-sm text-gray-500 mb-4">
        {date} {blog.author && `· by ${blog.author}`}
      </p>
      <div className="prose prose-sm sm:prose lg:prose-lg">
        <ReactMarkdown>{blog.content}</ReactMarkdown>
      </div>
      <a
        href={blog.original_news_url}
        target="_blank"
        rel="noopener noreferrer"
        className="block mt-6 text-blue-600 hover:underline text-sm"
      >
        View Original News Article ↗
      </a>
    </div>
  );
};

export default BlogDetail;

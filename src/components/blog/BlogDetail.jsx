import { useParams, useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const BlogDetail = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const blog = state?.blog;

  if (!blog)
    return (
      <p className="text-center mt-4 text-red-600">
        Blog not available. Try returning to the homepage.
      </p>
    );

  const date = blog.generated_date
    ? new Date(blog.generated_date).toLocaleDateString()
    : "Unknown date";

  return (
    <div className="max-w-3xl mx-auto px-4 py-8" key = {id}>
      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
      <p className="text-sm text-gray-500 mb-4">
        {date} {blog.author && `· by ${blog.author}`}
      </p>
      <img src={blog.image} alt="" />
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

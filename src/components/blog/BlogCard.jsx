import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const formattedDate = blog.generated_date
    ? new Date(blog.generated_date.seconds * 1000).toLocaleDateString()
    : "Unknown date";

  return (
    <div className="bg-white shadow-md p-4 rounded-md">
      <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
      {/* Render markdown preview */}
      <div className="prose prose-sm max-w-none text-gray-700 mb-3">
        <ReactMarkdown>{blog.content.slice(0, 200) + "..."}</ReactMarkdown>
      </div>
      {/* Metadata */}
      <p className="text-xs text-gray-500 mb-2">
        {formattedDate} {blog.author ? `by ${blog.author}` : ""}
      </p>
      <Link
        to={`/blogs/${blog.id}`}
        className="text-blue-600 hover:underline text-sm"
      >
        Read Detailed Blog
      </Link>
    </div>
  );
};

export default BlogCard;

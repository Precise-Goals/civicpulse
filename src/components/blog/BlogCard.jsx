import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  

  return (
    <div className="bg-white shadow-md p-4 rounded-md">
      <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
      {/* Render markdown preview */}
      <div className="prose prose-sm max-w-none text-gray-700 mb-3">
        <ReactMarkdown>{blog.content.slice(0, 200) + "..."}</ReactMarkdown>
      </div>
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

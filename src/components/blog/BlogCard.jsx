import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white shadow-md p-4 rounded-md">
      <h1 className="blogTitle">{blog.title}</h1>
      {/* Render markdown preview */}
      <div className="prose prose-sm max-w-none text-gray-700 mb-3">
        <ReactMarkdown>{blog.content.slice(0, 200) + "..."}</ReactMarkdown>
      </div>
      <img src={blog.image} />
      <Link
        to={`/blogs/${blog.id}`}
        state={{ blog }} 
        className="text-blue-600 hover:underline text-sm"
      >
        Read full blog →
      </Link>
    </div>
  );
};

export default BlogCard;

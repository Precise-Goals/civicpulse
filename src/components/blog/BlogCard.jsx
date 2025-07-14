import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <div className="blog">
      {/* <h1 className="blogTitle">{blog.title}</h1> */}
      {/* Render markdown preview */}
      <div className="div">
        <div className="prose">
          <ReactMarkdown>{blog.content.slice(0, 200) + "..."}</ReactMarkdown>
        </div>
        <Link
          to={`/blogs/${blog.id}`}
          state={{ blog }}
          className="text-blue-600 hover:underline text-sm"
        >
          Read full blog →
        </Link>
      </div>
      <img src={blog.image} />
    </div>
  );
};

export default BlogCard;

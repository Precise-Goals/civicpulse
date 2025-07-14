import { useParams, useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const BlogDetail = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const blog = state?.blog;

  if (!blog)
    return (
      <p className="text-center mt-8 text-red-600 text-lg font-semibold">
        Blog not available. Try returning to the homepage.
      </p>
    );

  const date = blog.generated_date
    ? new Date(blog.generated_date).toLocaleDateString()
    : "Unknown date";

  return (
    <div className="blogdetail">
      <h1 className="btitle">
        {blog.title}
      </h1>
      <p className="bauthor">
        {date} {blog.author && `· by ${blog.author}`}
      </p>

      {/* Image and intro content side by side */}
      <div className="fr">
        <div className="frcont">
          <ReactMarkdown>{blog.content.slice(0, 500)}</ReactMarkdown>
        </div>
        {blog.image && (
          <div className="frimg">
            <img
              src={blog.image}
              alt={blog.title}
              className="frimgg"
            />
          </div>
        )}
      </div>

      {/* Remaining content */}
      <div className="bprose">
        <ReactMarkdown>{blog.content.slice(500)}</ReactMarkdown>
      </div>

      {/* Source link */}
      <a
        href={blog.original_news_url}
        target="_blank"
        rel="noopener noreferrer"
        className="oglink"
      >
        View Original News Article
      </a>
    </div>
  );
};

export default BlogDetail;

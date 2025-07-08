import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ id, title, content }) => (
  <div className="bg-white shadow-md rounded-lg p-4 m-4 max-w-md">
    <h2 className="text-xl font-semibold mb-2">{title}</h2>
    <p className="text-gray-600 mb-4 line-clamp-3">{content}</p>
    <Link
      to={`/blogs/${id}`}
      className="text-blue-500 hover:text-blue-700 font-medium"
    >
      Read More
    </Link>
  </div>
);

export default BlogCard;
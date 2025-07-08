import React from "react";

const BlogDetail = ({ title, content, original_news_url }) => (
  <div className="bg-white shadow-md rounded-lg p-6 m-4 max-w-2xl mx-auto">
    <h1 className="text-2xl font-bold mb-4">{title}</h1>
    <p className="text-gray-800 mb-6 whitespace-pre-wrap">{content}</p>
    {original_news_url && (
      <a
        href={original_news_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:text-blue-700 font-medium"
      >
        View Original Article
      </a>
    )}
  </div>
);

export default BlogDetail;
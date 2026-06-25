import React, { useState } from "react";
import blogService from "../services/blogs";

function Blog({ blog, updateBlogs, blogs }) {
  const [showDetails, setShowDetails] = useState(false);
  const handleDelete = (id) => {
    try {
      blogService.deleteBlog(id);
      const newBlogs = blogs.filter((b) => b.id != blog.id);
      updateBlogs(newBlogs);
    } catch (error) {}
  };
  return (
    <div className="border-2 my-2 px-2">
      {" "}
      {blog.title}{" "}
      {showDetails && (
        <div>
          <h1>{blog.url}</h1>
          <h1>
            {blog.likes}{" "}
            <button className="rounded bg-blue-600 m-2 px-4 text-white transition-colors active:bg-blue-800">
              like
            </button>
          </h1>
          <h1>{blog.author}</h1>
        </div>
      )}
      <button
        className="rounded bg-blue-600 m-2 px-4 py-2 text-white transition-colors active:bg-blue-800"
        onClick={() => {
          setShowDetails((p) => !p);
        }}
      >
        {showDetails ? "Hide" : "View"}
      </button>
      <button
        className="rounded bg-red-600 my-2 px-4 py-2 text-white transition-colors active:bg-emerald-800"
        onClick={() => {
          handleDelete(blog.id);
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default Blog;

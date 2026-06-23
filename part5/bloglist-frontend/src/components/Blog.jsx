import React from "react";
import blogService from "../services/blogs";

function Blog({ blog, updateBlogs, blogs }) {
  const handleDelete = (id) => {
    try {
      blogService.deleteBlog(id);
      const newBlogs = blogs.filter((b) => b.id != blog.id);
      updateBlogs(newBlogs);
    } catch (error) {}
  };
  return (
    <div>
      {" "}
      {blog.title} {blog.author}{" "}
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

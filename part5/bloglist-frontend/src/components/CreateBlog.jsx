import React, { useState } from "react";
import InputBox from "../components/inputBox";
import blogService from "../services/blogs";
function CreateBlog({
  setErrorMessage,
  setInfoMessage,
  setBlogs,
  createVisible,
  setCreateVisible,
}) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const hideWhenVisible = { display: createVisible ? "none" : "" };
  const showWhenVisible = { display: createVisible ? "" : "none" };

  const createBlog = async (e) => {
    e.preventDefault();

    try {
      const blog = { author, title, url };
      const res = await blogService.createBlog(blog);
      console.log("creating blog");
      setBlogs((prev) => [...prev, res]);
      setInfoMessage(`New blog ${title} by ${author} is added succesfully`);
      setTimeout(() => [setInfoMessage(null)], 5000);
    } catch (error) {
      setErrorMessage(`Error adding new blog`);
      setTimeout(() => [setErrorMessage(null)], 5000);
    }
  };
  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => setCreateVisible(true)}>create blog</button>
      </div>
      <div style={showWhenVisible}>
        <form onSubmit={createBlog} className="flex flex-col gap-4 max-w-sm">
          <InputBox
            value={title}
            name="Title"
            autoComplete=""
            onChangefun={setTitle}
            type="text"
          />

          <InputBox
            value={author}
            name="Author"
            autoComplete=""
            onChangefun={setAuthor}
            type="text"
          />
          <InputBox
            value={url}
            name="Url"
            autoComplete=""
            onChangefun={setUrl}
            type="text"
          />

          <button
            type="submit"
            className="rounded bg-emerald-600 px-4 py-2 text-white transition-colors active:bg-emerald-800"
          >
            Create
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              setCreateVisible(false);
            }}
          >
            cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateBlog;

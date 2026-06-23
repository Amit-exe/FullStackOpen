import React, { useEffect, useState } from "react";
import blogs from "../services/blogs";

function useBlogs() {
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    async function fetchBlog(params) {
      const res = await blogs.getAll();
      console.log(res);

      setBlog(res);
    }

    fetchBlog();
  }, []);
  return [blog, setBlog];
}

export default useBlogs;

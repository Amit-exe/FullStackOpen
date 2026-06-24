import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";

import Login from "./components/Login";
import Message from "./components/Message";
import CreateBlog from "./components/CreateBlog";
import useBlogs from "./utils/useBlogs";
import useInternetStatus from "./utils/useInternetStatus";

const App = () => {
  const internetStatus = useInternetStatus();
  const [blogs, setBlogs] = useBlogs();
  const [user, setUser] = useState(() => {
    const loggedInUser = window.localStorage.getItem("loggedBlogUser");
    const user = JSON.parse(loggedInUser);

    loggedInUser
      ? blogService.setToken(user.token)
      : blogService.setToken(null);
    return loggedInUser ? user : null;
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const [infoMessage, setInfoMessage] = useState(null);
  const [createVisible, setCreateVisible] = useState(false);

  const hangleLogout = () => {
    window.localStorage.removeItem("loggedBlogUser");
    setUser("");
  };

  if (!internetStatus) return <>Please check your connection</>;
  if (!blogs) return <>Loading...</>;

  return (
    <>
      {errorMessage && <Message type="error" value={errorMessage} />}

      {infoMessage && <Message type="info" value={infoMessage} />}
      {!user && <Login setUser={setUser} setError={setErrorMessage} />}
      {user && (
        <div>
          <h1>Welcome to my blog site</h1>
          <p className="text-2xl py-2 font-medium">
            {user.username} logged in{" "}
            <button
              className="rounded bg-emerald-600 px-2  text-white transition-colors active:bg-emerald-800"
              onClick={hangleLogout}
            >
              Logout
            </button>
          </p>

          <h2>blogs</h2>
          <CreateBlog
            setErrorMessage={setErrorMessage}
            setInfoMessage={setInfoMessage}
            setBlogs={setBlogs}
            createVisible={createVisible}
            setCreateVisible={setCreateVisible}
          />
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateBlogs={setBlogs}
              blogs={blogs}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default App;

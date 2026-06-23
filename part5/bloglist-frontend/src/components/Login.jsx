import React, { useState } from "react";
import InputBox from "./inputBox";
import userService from "../services/user";

function Login({ setUser, setError }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("heheh");

    try {
      const user = await userService.Login({ password, username });

      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      setUsername("");
      setPassword("");
      setUser(user);
    } catch (error) {
      setError("Invalid username or password");
      setTimeout(() => [setError(null)], 5000);
    }
  };
  return (
    <>
      <form onSubmit={handleLogin} className="flex flex-col gap-4 max-w-sm">
        <h2 className="text-3xl font-bold">Login</h2>

        <InputBox
          value={username}
          name="Username"
          autoComplete="username"
          onChangefun={setUsername}
          type="text"
        />

        <InputBox
          value={password}
          name="password"
          autoComplete="password"
          onChangefun={setPassword}
          type="password"
        />

        <button
          type="submit"
          className="rounded bg-emerald-600 px-4 py-2 text-white transition-colors active:bg-emerald-800"
        >
          Login
        </button>
      </form>
    </>
  );
}

export default Login;

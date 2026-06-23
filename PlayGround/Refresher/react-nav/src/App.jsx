import "./App.css";
import { Link, Route, Routes, NavLink } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Users from "./components/Users";
import UserDetails from "./components/UserDetails";

function App() {
  return (
    <>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/users">Users</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/users" element={<Users />}></Route>
        <Route path="/users/:id" element={<UserDetails />}></Route>
      </Routes>
    </>
  );
}

export default App;

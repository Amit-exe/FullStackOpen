import React, { Suspense, lazy } from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./store/slices/authSlice";
import ProtectedRoute from "./router/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";

// ── Lazy-loaded pages (Topic 4: code splitting) ──────────────────────────────
const FormValidation  = lazy(() => import("./pages/FormValidation"));
const Routing         = lazy(() => import("./pages/Routing"));
const Performance     = lazy(() => import("./pages/Performance"));
const Dashboard       = lazy(() => import("./pages/Dashboard"));
const DashboardStats  = lazy(() => import("./pages/DashboardStats"));
const UserList        = lazy(() => import("./pages/UserList"));
const UserProfile     = lazy(() => import("./pages/UserProfile"));

function PageLoader() {
  return <div className="page-loader">Loading chunk…</div>;
}

export default function App() {
  const user     = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(logout());
    navigate("/login");
  }

  return (
    <div className="app-shell">
      {/* ── Top nav ─────────────────────────────────────────────────────── */}
      <nav className="topnav">
        <span className="topnav-brand">React Learning App</span>

        <NavLink to="/"            className="nav-link" end>Home</NavLink>
        <NavLink to="/forms"       className="nav-link">Forms</NavLink>
        <NavLink to="/routing"     className="nav-link">Routing</NavLink>
        <NavLink to="/performance" className="nav-link">Performance</NavLink>
        <NavLink to="/users"       className="nav-link">Users</NavLink>
        <NavLink to="/dashboard"   className="nav-link">Dashboard 🔒</NavLink>

        <div className="topnav-auth">
          {user ? (
            <>
              <span className="nav-user">👤 {user.name}</span>
              <button className="btn btn-sm" onClick={handleLogout}>Log out</button>
            </>
          ) : (
            <NavLink to="/login" className="btn btn-sm">Log in</NavLink>
          )}
        </div>
      </nav>

      {/* ── Page content ────────────────────────────────────────────────── */}
      <main className="main-content">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public routes */}
            <Route path="/"      element={<Home />} />
            <Route path="/login" element={<Login />} />

            {/* Topic 1 — Form Validation */}
            <Route path="/forms" element={<FormValidation />} />

            {/* Topic 2 — Routing (nested) */}
            <Route path="/routing" element={<Routing />} />
            <Route path="/users"   element={<UserList />} />
            <Route path="/users/:userId" element={<UserProfile />} />

            {/* Topic 3 — Performance */}
            <Route path="/performance" element={<Performance />} />

            {/* Topic 2 + 4 — Protected + nested dashboard routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard"       element={<Dashboard />} />
              <Route path="/dashboard/stats" element={<DashboardStats />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={
              <div className="page">
                <h1>404 — Page not found</h1>
                <NavLink to="/" className="btn">Go home</NavLink>
              </div>
            } />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

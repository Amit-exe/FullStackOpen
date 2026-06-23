import { useNavigate, Link } from "react-router-dom";

export default function Routing() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <h1 className="page-title">🗺️ Routing & Protected Routes</h1>
      <p className="page-subtitle">
        React Router v6 — nested routes, <code>useParams</code>,{" "}
        <code>useNavigate</code>, and protected route pattern.
      </p>

      {/* useNavigate demo */}
      <div className="section">
        <h2 className="section-title">useNavigate — programmatic navigation</h2>
        <p className="section-desc">
          Use <code>useNavigate()</code> when you need to navigate in response to
          an event — not a link click. Common use cases: after a form submit,
          after login, or on a timer.
        </p>
        <div className="card">
          <div className="btn-row">
            <button className="btn" onClick={() => navigate("/")}>
              navigate("/")
            </button>
            <button className="btn" onClick={() => navigate(-1)}>
              navigate(-1) — back
            </button>
            <button className="btn" onClick={() => navigate("/login", { replace: true })}>
              navigate("/login", {"{"} replace: true {"}"})</button>
            <button className="btn btn-primary" onClick={() => navigate("/users")}>
              Go to /users →
            </button>
          </div>
          <p className="hint" style={{ marginTop: 12 }}>
            <strong>replace: true</strong> replaces the current history entry
            instead of pushing a new one. After auth redirects, this prevents the
            user pressing Back to reach a protected page they're no longer
            authorised to see.
          </p>
        </div>
      </div>

      {/* Route tree explainer */}
      <div className="section">
        <h2 className="section-title">Route tree for this app</h2>
        <div className="card">
          <pre style={{ fontSize: 13, lineHeight: 2, color: "#374151", overflowX: "auto" }}>
{`<BrowserRouter>
  <Routes>
    <Route path="/"            element={<Home />} />
    <Route path="/login"       element={<Login />} />
    <Route path="/forms"       element={<FormValidation />} />
    <Route path="/routing"     element={<Routing />} />

    {/* Nested — UserList owns <Outlet /> */}
    <Route path="/users"           element={<UserList />} />
    <Route path="/users/:userId"   element={<UserProfile />} />

    {/* ProtectedRoute has no path — it's a gate */}
    <Route element={<ProtectedRoute />}>
      <Route path="/dashboard"       element={<Dashboard />} />
      <Route path="/dashboard/stats" element={<DashboardStats />} />
    </Route>
  </Routes>
</BrowserRouter>`}
          </pre>
        </div>
      </div>

      {/* Nested routes callout */}
      <div className="section">
        <h2 className="section-title">Nested routes & &lt;Outlet /&gt;</h2>
        <p className="section-desc">
          Visit <Link to="/users">/users</Link> to see this in action. The
          sidebar layout stays mounted while the right-hand content (the Outlet)
          swaps between the user list and individual profiles.
        </p>
        <div className="alert alert-info">
          <strong>Try it:</strong> Click a user card on the /users page, then use
          the browser Back button. The URL changes but the sidebar never
          unmounts — that's nested routing.
        </div>
      </div>

      {/* Protected route callout */}
      <div className="section">
        <h2 className="section-title">Protected routes</h2>
        <p className="section-desc">
          <code>ProtectedRoute</code> (in <code>src/router/ProtectedRoute.js</code>)
          reads <code>state.auth.user</code> from Redux. If null, it redirects to
          /login and passes the intended URL in location state so you land back
          here after signing in.
        </p>
        <div className="btn-row">
          <Link to="/dashboard" className="btn btn-primary">Try /dashboard →</Link>
        </div>
      </div>
    </div>
  );
}

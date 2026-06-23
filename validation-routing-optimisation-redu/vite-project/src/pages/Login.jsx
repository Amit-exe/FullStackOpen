import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { login, clearAuthError } from "../store/slices/authSlice";

export default function Login() {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const location  = useLocation();
  const { user, error } = useSelector((state) => state.auth);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Where to send the user after login (defaults to dashboard)
  const from = location.state?.from?.pathname || "/dashboard";

  // If already logged in, go straight to destination
  useEffect(() => {
    if (user) navigate(from, { replace: true });
  }, [user, navigate, from]);

  // Clear stale errors when component mounts
  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(login({ username, password }));
  }

  return (
    <div className="page" style={{ maxWidth: 400, margin: "0 auto" }}>
      <h1 className="page-title">Log in</h1>
      <p className="page-subtitle">
        {location.state?.from
          ? `You need to log in to visit ${location.state.from.pathname}.`
          : "Enter your credentials to continue."}
      </p>

      {/* ── Redux concept callout ─────────────────────────────────────── */}
      <div className="alert alert-info" style={{ marginBottom: "1.25rem" }}>
        <strong>Redux:</strong> submitting dispatches <code>login()</code> action →
        authSlice reducer sets <code>state.user</code> → this component reads it
        via <code>useSelector</code> and navigates away.
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="alice or bob"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="anything works"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="hint">Password is ignored — just use alice or bob as the username.</p>
          </div>

          {error && <div className="alert alert-error">{error}</div>}

          <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
            Log in
          </button>
        </form>
      </div>

      <p style={{ fontSize: 13, color: "#6b7280", textAlign: "center", marginTop: "1rem" }}>
        <Link to="/">← Back to home</Link>
      </p>
    </div>
  );
}

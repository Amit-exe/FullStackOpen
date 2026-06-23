import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById, clearUser } from "../store/slices/userSlice";

export default function UserProfile() {
  const { userId }  = useParams();           // ← the whole point of this page
  const dispatch    = useDispatch();
  const navigate    = useNavigate();
  const { data: user, status, error } = useSelector((s) => s.user);

  // Fetch whenever userId changes (demonstrates createAsyncThunk too)
  useEffect(() => {
    dispatch(fetchUserById(Number(userId)));
    return () => dispatch(clearUser()); // cleanup on unmount
  }, [userId, dispatch]);

  const roleColors = {
    Admin:     "badge-purple",
    Moderator: "badge-blue",
    Member:    "badge-green",
  };

  return (
    <div>
      {/* ── useParams callout ──────────────────────────────────────── */}
      <div className="card" style={{ background: "#faf5ff", borderColor: "#ddd6fe", marginBottom: "1rem" }}>
        <div className="card-title" style={{ color: "#5b21b6" }}>useParams()</div>
        <pre style={{ fontSize: 13, color: "#374151" }}>
{`const { userId } = useParams();
// → "${userId}"  (from /users/:userId)`}
        </pre>
      </div>

      {/* ── Loading state ───────────────────────────────────────────── */}
      {status === "loading" && (
        <div className="card">
          <div style={{ color: "#6b7280", fontSize: 14 }}>
            ⏳ Fetching user #{userId}… (simulated 900ms delay)
          </div>
          <div style={{ marginTop: 12, height: 12, borderRadius: 6, background: "#e5e7eb", overflow: "hidden" }}>
            <div
              style={{
                height: "100%", background: "#7c3aed", borderRadius: 6,
                animation: "shimmer 1s infinite alternate",
                width: "60%",
              }}
            />
          </div>
        </div>
      )}

      {/* ── Error state ─────────────────────────────────────────────── */}
      {status === "failed" && (
        <div className="alert alert-error">
          {error} — <Link to="/users">back to users</Link>
        </div>
      )}

      {/* ── Success state ───────────────────────────────────────────── */}
      {status === "succeeded" && user && (
        <div className="card">
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
            <div
              style={{
                width: 52, height: 52, borderRadius: "50%",
                background: "#ede9fe", display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: 22, flexShrink: 0,
              }}
            >
              {user.name[0]}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 18 }}>{user.name}</div>
              <span className={`badge ${roleColors[user.role] || "badge-gray"}`}>
                {user.role}
              </span>
            </div>
          </div>

          {[
            ["Email",   user.email],
            ["Joined",  user.joined],
            ["Posts",   user.posts],
            ["User ID", `#${user.id} (from URL param)`],
          ].map(([label, value]) => (
            <div
              key={label}
              style={{
                display: "flex", justifyContent: "space-between",
                padding: "8px 0", borderBottom: "1px solid #f3f4f6",
                fontSize: 14,
              }}
            >
              <span style={{ color: "#6b7280" }}>{label}</span>
              <span style={{ fontWeight: 500 }}>{value}</span>
            </div>
          ))}

          <div className="btn-row" style={{ marginTop: "1rem" }}>
            <button className="btn" onClick={() => navigate(-1)}>← Back</button>
            <button className="btn" onClick={() => navigate("/users")}>All users</button>
          </div>
        </div>
      )}
    </div>
  );
}

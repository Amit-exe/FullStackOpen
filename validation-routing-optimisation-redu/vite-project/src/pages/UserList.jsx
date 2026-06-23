import { NavLink, Outlet, useParams } from "react-router-dom";

const USERS = [
  { id: 1, name: "Alice Chen",    role: "Admin",     emoji: "👩‍💼" },
  { id: 2, name: "Bob Okafor",   role: "Member",    emoji: "👨‍💻" },
  { id: 3, name: "Carol Mendes", role: "Moderator", emoji: "👩‍🔧" },
  { id: 4, name: "David Kim",    role: "Member",    emoji: "👨‍🎨" },
];

export { USERS };

export default function UserList() {
  const { userId } = useParams(); // truthy when on /users/:userId

  return (
    <div className="page">
      <h1 className="page-title">👥 Users — Nested Routes</h1>
      <p className="page-subtitle">
        The sidebar is a persistent layout. Clicking a user changes only the{" "}
        <code>&lt;Outlet /&gt;</code> — the sidebar never unmounts.
      </p>

      <div className="alert alert-info" style={{ marginBottom: "1.25rem" }}>
        <strong>useParams:</strong> the route <code>/users/:userId</code> exposes{" "}
        <code>userId</code> via <code>const {"{"} userId {"}"} = useParams()</code>{" "}
        inside <code>UserProfile</code>.
      </div>

      <div className="with-sidebar">
        {/* Sidebar — stays mounted */}
        <aside className="sidebar">
          <div className="sidebar-section">Users</div>
          {USERS.map((u) => (
            <NavLink
              key={u.id}
              to={`/users/${u.id}`}
              className={({ isActive }) =>
                "sidebar-link" + (isActive ? " active" : "")
              }
            >
              {u.emoji} {u.name}
            </NavLink>
          ))}
          <div className="sidebar-section" style={{ marginTop: 8 }}>Info</div>
          <NavLink to="/routing" className="sidebar-link">← Routing page</NavLink>
        </aside>

        {/* Outlet — swaps between users */}
        <div className="sidebar-content">
          {!userId ? (
            // Index content — shown at /users with no :userId
            <div>
              <div className="section-title" style={{ marginBottom: "0.75rem" }}>
                Select a user from the sidebar
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {USERS.map((u) => (
                  <NavLink key={u.id} to={`/users/${u.id}`} style={{ textDecoration: "none" }}>
                    <div
                      className="card"
                      style={{ cursor: "pointer" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#faf5ff")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "")}
                    >
                      <div style={{ fontSize: 24, marginBottom: 4 }}>{u.emoji}</div>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{u.name}</div>
                      <div>
                        <span className="badge badge-purple">{u.role}</span>
                      </div>
                      <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 6 }}>
                        /users/{u.id}
                      </div>
                    </div>
                  </NavLink>
                ))}
              </div>
            </div>
          ) : (
            // UserProfile rendered here via its own route
            <Outlet />
          )}
        </div>
      </div>
    </div>
  );
}

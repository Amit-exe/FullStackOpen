import { Link } from "react-router-dom";

const TOPICS = [
  {
    path: "/forms",
    emoji: "📋",
    title: "Form Validation",
    tags: ["controlled inputs", "on-blur", "on-submit", "React Hook Form"],
    desc: "Controlled inputs, validate on blur vs submit, custom logic, and React Hook Form with register / handleSubmit / formState.",
  },
  {
    path: "/users",
    emoji: "🗺️",
    title: "Routing & Protected Routes",
    tags: ["nested routes", "useParams", "useNavigate", "ProtectedRoute"],
    desc: "React Router v6 nested layouts, dynamic :userId params, programmatic navigation, and guarding routes with a ProtectedRoute wrapper.",
  },
  {
    path: "/performance",
    emoji: "⚡",
    title: "Performance Optimisation",
    tags: ["React.memo", "useMemo", "useCallback", "lazy()"],
    desc: "Prevent unnecessary re-renders with React.memo, cache values with useMemo, stabilise callbacks with useCallback, and split bundles with lazy().",
  },
  {
    path: "/dashboard",
    emoji: "🗄️",
    title: "Redux & Redux Toolkit",
    tags: ["createSlice", "useSelector", "useDispatch", "createAsyncThunk"],
    desc: "Global state with RTK createSlice, read state with useSelector, dispatch actions with useDispatch, and handle async API calls with createAsyncThunk.",
  },
];

export default function Home() {
  return (
    <div className="page">
      <h1 className="page-title">React Learning App</h1>
      <p className="page-subtitle">
        Four topics, one app. Every concept has live, editable code — dive into
        any topic from the nav or cards below.
      </p>

      <div className="two-col">
        {TOPICS.map((t) => (
          <Link
            key={t.path}
            to={t.path}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              className="card"
              style={{ height: "100%", cursor: "pointer", transition: "box-shadow 0.15s" }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)")}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "")}
            >
              <div style={{ fontSize: 28, marginBottom: 8 }}>{t.emoji}</div>
              <div className="card-title">{t.title}</div>
              <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 10, lineHeight: 1.6 }}>
                {t.desc}
              </p>
              <div>
                {t.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="card" style={{ marginTop: "1.5rem", background: "#faf5ff", borderColor: "#ddd6fe" }}>
        <div className="card-title" style={{ color: "#5b21b6" }}>🔒 Protected pages</div>
        <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 10 }}>
          The Dashboard is protected. Try visiting it while logged out — you'll
          be redirected to /login and sent back after signing in.
        </p>
        <p style={{ fontSize: 13, color: "#6b7280" }}>
          Login with username <code>alice</code> or <code>bob</code> (any password).
        </p>
      </div>
    </div>
  );
}

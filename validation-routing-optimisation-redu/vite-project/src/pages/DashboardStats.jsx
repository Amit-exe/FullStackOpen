import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById, clearUser } from "../store/slices/userSlice";

const STATS = [
  { label: "Total Users",    value: "1,284", delta: "+12%",  color: "#5b21b6" },
  { label: "Active Today",   value: "342",   delta: "+5%",   color: "#0891b2" },
  { label: "Revenue",        value: "$8,430",delta: "+23%",  color: "#059669" },
  { label: "Uptime",         value: "99.8%", delta: "stable",color: "#d97706" },
];

export default function DashboardStats() {
  const dispatch = useDispatch();
  const { data: user, status, error } = useSelector((s) => s.user);

  // Demonstrate createAsyncThunk inside a protected, nested route
  useEffect(() => {
    dispatch(fetchUserById(1));
    return () => dispatch(clearUser());
  }, [dispatch]);

  return (
    <div className="page">
      <h1 className="page-title">📊 Stats</h1>
      <p className="page-subtitle">
        Nested protected route at <code>/dashboard/stats</code>. Also demonstrates{" "}
        <code>createAsyncThunk</code> — fetching user #1 on mount.
      </p>

      {/* Stat cards */}
      <div className="stat-grid" style={{ marginBottom: "1.5rem", gridTemplateColumns: "repeat(2, 1fr)" }}>
        {STATS.map((s) => (
          <div className="stat-card" key={s.label} style={{ borderLeft: `3px solid ${s.color}` }}>
            <div className="stat-val" style={{ color: s.color }}>{s.value}</div>
            <div className="stat-lbl">{s.label}</div>
            <div style={{ fontSize: 11, color: "#6b7280", marginTop: 4 }}>{s.delta} vs last month</div>
          </div>
        ))}
      </div>

      {/* createAsyncThunk demo */}
      <div className="section">
        <h2 className="section-title">createAsyncThunk — live demo</h2>
        <p className="section-desc">
          On mount this component dispatched <code>fetchUserById(1)</code>. Below
          you can see the three lifecycle phases: pending → fulfilled / rejected.
        </p>

        {/* Status indicator */}
        <div className="card">
          <div className="card-title">Thunk lifecycle</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { phase: "pending",   label: "user/fetchById/pending",   active: status === "loading",   done: ["succeeded","failed"].includes(status) },
              { phase: "fulfilled", label: "user/fetchById/fulfilled",  active: status === "succeeded", done: false },
              { phase: "rejected",  label: "user/fetchById/rejected",   active: status === "failed",    done: false },
            ].map(({ phase, label, active, done }) => (
              <div key={phase} style={{
                display: "flex", alignItems: "center", gap: 10, padding: "8px 12px",
                borderRadius: 7, fontSize: 13,
                background: active ? (phase === "rejected" ? "#fef2f2" : phase === "fulfilled" ? "#f0fdf4" : "#fffbeb")
                          : done   ? "#f9fafb" : "#f9fafb",
                border: "1px solid",
                borderColor: active ? (phase === "rejected" ? "#fca5a5" : phase === "fulfilled" ? "#86efac" : "#fde68a")
                           : "#e5e7eb",
              }}>
                <span style={{ fontSize: 16 }}>
                  {active ? (phase === "pending" ? "⏳" : phase === "fulfilled" ? "✅" : "❌")
                          : done ? "✓" : "○"}
                </span>
                <code style={{ fontSize: 12 }}>{label}</code>
                {active && <span className="badge badge-amber" style={{ marginLeft: "auto" }}>active</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Result */}
        {status === "loading" && (
          <div className="alert alert-warning">Fetching user… (simulated 900ms delay)</div>
        )}
        {status === "failed" && (
          <div className="alert alert-error">{error}</div>
        )}
        {status === "succeeded" && user && (
          <div className="card" style={{ background: "#f0fdf4", borderColor: "#86efac" }}>
            <div className="card-title" style={{ color: "#166534" }}>✅ Fulfilled — action.payload:</div>
            <pre style={{ fontSize: 12, color: "#374151", overflowX: "auto" }}>
              {JSON.stringify(user, null, 2)}
            </pre>
          </div>
        )}

        {/* Try other IDs */}
        <div className="card">
          <div className="card-title">Try other users (or trigger a rejection)</div>
          <div className="btn-row">
            {[1, 2, 3, 4].map((id) => (
              <button key={id} className="btn" onClick={() => dispatch(fetchUserById(id))}>
                fetch user #{id}
              </button>
            ))}
            <button className="btn btn-danger" onClick={() => dispatch(fetchUserById(99))}>
              fetch #99 → rejected
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

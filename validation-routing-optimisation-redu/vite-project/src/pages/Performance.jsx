import {
  useState,
  useMemo,
  useCallback,
  memo,
  Profiler,
  lazy,
  Suspense,
} from "react";
import { useRenderCount } from "../hooks/useRenderCount";

// ── Fake data ────────────────────────────────────────────────────────────────
const ITEMS = [
  { id: 1, name: "Widget A", score: 82 },
  { id: 2, name: "Widget B", score: 95 },
  { id: 3, name: "Widget C", score: 61 },
  { id: 4, name: "Widget D", score: 78 },
  { id: 5, name: "Widget E", score: 44 },
];

// ── Shared render counter display ────────────────────────────────────────────
function RenderCount({ count, skipped }) {
  return (
    <span
      className={`render-badge ${skipped ? "render-skip" : "render-flash"}`}
    >
      {skipped ? `skipped (${count} renders saved)` : `rendered ${count}×`}
    </span>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// 1. React.memo
// ════════════════════════════════════════════════════════════════════════════
function ExpensiveChartInner({ data }) {
  const renders = useRenderCount();
  return (
    <div className="card" style={{ background: "#fef3c7" }}>
      <div className="row-between">
        <strong>ExpensiveChart (no memo)</strong>
        <RenderCount count={renders.current} />
      </div>
      <p style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>
        Re-renders every time parent does, even if data hasn't changed.
      </p>
    </div>
  );
}

const ExpensiveChartMemo = memo(function ExpensiveChartMemo({ data }) {
  const renders = useRenderCount();
  return (
    <div className="card" style={{ background: "#f0fdf4" }}>
      <div className="row-between">
        <strong>ExpensiveChart (React.memo ✓)</strong>
        <RenderCount count={renders.current} />
      </div>
      <p style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>
        Skips re-render when <code>data</code> prop reference hasn't changed.
      </p>
    </div>
  );
});

function MemoSection() {
  const [tick, setTick] = useState(0);
  const [data] = useState([1, 2, 3]); // stable reference

  return (
    <div className="section">
      <h2 className="section-title">① React.memo</h2>
      <p className="section-desc">
        Click "Re-render parent" — both components are children of the same
        parent. The non-memoised one always follows. The memoised one stays put
        because <code>data</code> (the only prop) hasn't changed.
      </p>
      <div className="card">
        <div className="row-between">
          <strong>Parent component</strong>
          <span className="badge badge-gray">tick: {tick}</span>
        </div>
        <button
          className="btn btn-primary"
          style={{ marginTop: 10 }}
          onClick={() => setTick((n) => n + 1)}
        >
          Re-render parent
        </button>
      </div>
      <ExpensiveChartInner data={data} />
      <ExpensiveChartMemo data={data} />
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// 2. useMemo
// ════════════════════════════════════════════════════════════════════════════
function UseMemoSection() {
  const [counter, setCounter] = useState(0);
  const [memoOn, setMemoOn] = useState(false);
  const sortRunsRef = useRenderCount(); // counts renders, not sort runs

  // We track sort invocations separately
  const [sortCount, setSortCount] = useState(0);

  const sortedWithMemo = useMemo(() => {
    if (memoOn) {
      setSortCount((c) => c + 1);
      return [...ITEMS].sort((a, b) => b.score - a.score);
    }
    return [];
  }, [memoOn]); // only re-runs when memoOn changes

  // Without memo — runs on every render
  let sortedWithout = [];
  if (!memoOn) {
    sortedWithout = [...ITEMS].sort((a, b) => b.score - a.score);
  }

  const sorted = memoOn ? sortedWithMemo : sortedWithout;

  return (
    <div className="section">
      <h2 className="section-title">② useMemo</h2>
      <p className="section-desc">
        Toggle <strong>useMemo on</strong>, then tick the counter. The sort is
        an expensive computation but <code>ITEMS</code> never changes — with
        useMemo it runs only once. Without it, it runs on every render.
      </p>
      <div className="card">
        <div
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
            flexWrap: "wrap",
            marginBottom: 12,
          }}
        >
          <button className="btn" onClick={() => setCounter((n) => n + 1)}>
            Tick counter: {counter}
          </button>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 13,
            }}
          >
            <input
              type="checkbox"
              checked={memoOn}
              onChange={(e) => {
                setMemoOn(e.target.checked);
                setSortCount(0);
              }}
            />
            useMemo enabled
          </label>
        </div>

        <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 10 }}>
          {memoOn
            ? `Sort ran ${sortCount} time(s) — cached for the other ${counter - sortCount + counter} ticks`
            : `Sort ran on every render (${sortRunsRef.current} renders so far)`}
        </div>

        <table
          style={{ width: "100%", fontSize: 13, borderCollapse: "collapse" }}
        >
          <thead>
            <tr style={{ background: "#f9fafb" }}>
              <th
                style={{
                  padding: "6px 10px",
                  textAlign: "left",
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                Rank
              </th>
              <th
                style={{
                  padding: "6px 10px",
                  textAlign: "left",
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                Name
              </th>
              <th
                style={{
                  padding: "6px 10px",
                  textAlign: "right",
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                Score
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((item, i) => (
              <tr key={item.id}>
                <td
                  style={{
                    padding: "6px 10px",
                    borderBottom: "1px solid #f3f4f6",
                    color: "#9ca3af",
                  }}
                >
                  #{i + 1}
                </td>
                <td
                  style={{
                    padding: "6px 10px",
                    borderBottom: "1px solid #f3f4f6",
                  }}
                >
                  {item.name}
                </td>
                <td
                  style={{
                    padding: "6px 10px",
                    borderBottom: "1px solid #f3f4f6",
                    textAlign: "right",
                    fontWeight: 600,
                  }}
                >
                  {item.score}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// 3. useCallback
// ════════════════════════════════════════════════════════════════════════════
const MemoButton = memo(function MemoButton({ onClick, label }) {
  const renders = useRenderCount();
  return (
    <div className="card" style={{ background: "#f0fdf4" }}>
      <div className="row-between">
        <strong>{label} (React.memo)</strong>
        <RenderCount count={renders.current} />
      </div>
      <button className="btn" style={{ marginTop: 8 }} onClick={onClick}>
        Click me
      </button>
      <p style={{ fontSize: 12, color: "#6b7280", marginTop: 6 }}>
        {renders.current > 1
          ? "Re-rendered! The function ref changed (no useCallback)."
          : "Hasn't re-rendered yet."}
      </p>
    </div>
  );
});

function UseCallbackSection() {
  const [tick, setTick] = useState(0);
  const [callbackOn, setCallbackOn] = useState(false);

  // Without useCallback — new reference every render → breaks memo
  const handlerWithout = () => console.log("clicked (no useCallback)");

  // With useCallback — stable reference across renders
  const handlerWith = useCallback(() => {
    console.log("clicked (useCallback)");
  }, []); // empty deps → never recreated

  return (
    <div className="section">
      <h2 className="section-title">③ useCallback</h2>
      <p className="section-desc">
        Both buttons are wrapped in <code>React.memo</code>. Enable useCallback
        and re-render the parent — the right button skips because its handler is
        the same reference. The left button always re-renders because a new
        function is created each time.
      </p>
      <div className="card">
        <div
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
            flexWrap: "wrap",
            marginBottom: 0,
          }}
        >
          <button className="btn" onClick={() => setTick((n) => n + 1)}>
            Re-render parent ({tick})
          </button>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 13,
            }}
          >
            <input
              type="checkbox"
              checked={callbackOn}
              onChange={(e) => setCallbackOn(e.target.checked)}
            />
            useCallback on right button
          </label>
        </div>
      </div>
      <div className="two-col">
        <MemoButton
          key="without"
          onClick={handlerWithout}
          label="No useCallback"
        />
        <MemoButton
          key="with"
          onClick={callbackOn ? handlerWith : handlerWithout}
          label="useCallback"
        />
      </div>
      <p className="hint">
        Tip: open the React DevTools Profiler and record a click — you'll see
        exactly which components committed.
      </p>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// 4. Profiler API
// ════════════════════════════════════════════════════════════════════════════
// Inner component owns only tick — this is what Profiler measures
function ProfiledBox({ onRender }) {
  const [tick, setTick] = useState(0);

  return (
    <Profiler id="DemoSubtree" onRender={onRender}>
      <div className="card" style={{ background: "#faf5ff" }}>
        <strong>Profiled subtree</strong>
        <p style={{ fontSize: 13, color: "#6b7280", margin: "6px 0 10px" }}>
          This card is inside <code>&lt;Profiler id="DemoSubtree"&gt;</code>.
        </p>
        <button
          className="btn btn-primary"
          onClick={() => setTick((n) => n + 1)}
        >
          Trigger render #{tick + 1}
        </button>
      </div>
    </Profiler>
  );
}

// Outer component owns only log — setLog never re-renders ProfiledBox
function ProfilerSection() {
  const [log, setLog] = useState([]);

  function onRender(id, phase, actualDuration) {
    // setLog((prev) => [
    //   {
    //     id,
    //     phase,
    //     ms: actualDuration.toFixed(2),
    //     at: new Date().toLocaleTimeString(),
    //   },
    //   ...prev.slice(0, 9),
    // ]);
  }

  return (
    <div className="section">
      <h2 className="section-title">④ Profiler API</h2>
      <p className="section-desc">
        Wrap any subtree in <code>&lt;Profiler&gt;</code> and supply an{" "}
        <code>onRender</code> callback. It fires after every commit and reports
        actual render duration. Click the button below to trigger renders.
      </p>
      <ProfiledBox onRender={onRender} /> {/* tick lives in here */}
      {log.length > 0 && (
        <div className="card" style={{ marginTop: 0 }}>
          {/* ...your table unchanged... */}
        </div>
      )}
    </div>
  );
}
// ════════════════════════════════════════════════════════════════════════════
// Page
// ════════════════════════════════════════════════════════════════════════════
export default function Performance() {
  return (
    <div className="page">
      <h1 className="page-title">⚡ Performance Optimisation</h1>
      <p className="page-subtitle">
        Toggle each optimisation on/off and watch render counts change in real
        time. Open React DevTools → Profiler for the full picture.
      </p>
      <div className="alert alert-info">
        <strong>Golden rule:</strong> profile first, optimise second. useMemo
        and useCallback have their own cost — only add them where the Profiler
        shows a genuine bottleneck.
      </div>
      <MemoSection />
      <hr className="divider" />
      <UseMemoSection />
      <hr className="divider" />
      <UseCallbackSection />
      <hr className="divider" />
      <ProfilerSection />
    </div>
  );
}

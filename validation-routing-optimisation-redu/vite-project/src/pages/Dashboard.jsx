import { useSelector, useDispatch } from "react-redux";
import { NavLink, Outlet, Link } from "react-router-dom";
import { addItem, removeItem, clearCart } from "../store/slices/cartSlice";
import { logout } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

const PRODUCTS = [
  { id: 1, name: "Mechanical Keyboard", price: 79,  emoji: "⌨️" },
  { id: 2, name: "Wireless Mouse",      price: 29,  emoji: "🖱️" },
  { id: 3, name: "4K Monitor",          price: 249, emoji: "🖥️" },
  { id: 4, name: "Noise-Cancel Headset",price: 59,  emoji: "🎧" },
];

export default function Dashboard() {
  const user     = useSelector((state) => state.auth.user);
  const cart     = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(logout());
    navigate("/login");
  }

  const itemCount = cart.items.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="page">
      <div className="row-between" style={{ marginBottom: "0.25rem" }}>
        <h1 className="page-title">🗄️ Dashboard</h1>
        <button className="btn btn-sm btn-danger" onClick={handleLogout}>
          Log out
        </button>
      </div>
      <p className="page-subtitle">
        Protected route — you're here because{" "}
        <code>state.auth.user !== null</code>. Redux powers both auth and the
        cart below.
      </p>

      {/* Sub-nav */}
      <div style={{ display: "flex", gap: 8, marginBottom: "1.5rem" }}>
        <NavLink to="/dashboard"       end className={({ isActive }) => `btn${isActive ? " btn-primary" : ""}`}>Overview</NavLink>
        <NavLink to="/dashboard/stats"     className={({ isActive }) => `btn${isActive ? " btn-primary" : ""}`}>Stats</NavLink>
      </div>

      {/* Auth state */}
      <div className="card" style={{ marginBottom: "1rem" }}>
        <div className="card-title">useSelector — auth state</div>
        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <div style={{
            width: 44, height: 44, borderRadius: "50%", background: "#ede9fe",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, fontWeight: 700, color: "#5b21b6",
          }}>
            {user?.name?.[0]}
          </div>
          <div>
            <div style={{ fontWeight: 600 }}>{user?.name}</div>
            <div style={{ fontSize: 13, color: "#6b7280" }}>{user?.email}</div>
          </div>
          <span className="badge badge-purple" style={{ marginLeft: "auto" }}>{user?.role}</span>
        </div>
      </div>

      {/* Cart — RTK demo */}
      <div className="section">
        <h2 className="section-title">
          🛒 Cart{" "}
          <span className="badge badge-purple">{itemCount} item{itemCount !== 1 ? "s" : ""}</span>
        </h2>
        <p className="section-desc">
          Dispatches <code>addItem</code> / <code>removeItem</code> / <code>clearCart</code>{" "}
          actions from <code>cartSlice</code>. The total updates instantly via Redux state.
        </p>

        {/* Product grid */}
        <div className="two-col" style={{ marginBottom: "1rem" }}>
          {PRODUCTS.map((p) => {
            const inCart = cart.items.find((i) => i.id === p.id);
            return (
              <div className="card" key={p.id} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 28, marginBottom: 4 }}>{p.emoji}</div>
                <div style={{ fontWeight: 600, marginBottom: 2 }}>{p.name}</div>
                <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 10 }}>${p.price}</div>
                {inCart ? (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                    <button className="btn btn-sm" onClick={() => dispatch(removeItem({ id: p.id, price: p.price }))}>−</button>
                    <span style={{ fontWeight: 600 }}>{inCart.qty}</span>
                    <button className="btn btn-sm" onClick={() => dispatch(addItem(p))}>+</button>
                  </div>
                ) : (
                  <button className="btn btn-primary btn-sm" onClick={() => dispatch(addItem(p))}>
                    Add to cart
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Cart summary */}
        <div className="card">
          <div className="card-title">Cart state (from Redux store)</div>
          {cart.items.length === 0 ? (
            <p style={{ fontSize: 13, color: "#9ca3af" }}>Cart is empty — add something above.</p>
          ) : (
            <>
              {cart.items.map((item) => (
                <div key={item.id} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid #f3f4f6", fontSize: 14 }}>
                  <span>{item.emoji} {item.name} × {item.qty}</span>
                  <span style={{ fontWeight: 600 }}>${(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0 0", fontWeight: 700, fontSize: 15 }}>
                <span>Total</span>
                <span>${cart.total.toFixed(2)}</span>
              </div>
              <button className="btn btn-danger btn-sm" style={{ marginTop: 10 }} onClick={() => dispatch(clearCart())}>
                Clear cart
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

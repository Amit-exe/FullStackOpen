import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

/**
 * ProtectedRoute
 *
 * Sits in the route tree with NO path of its own — it's invisible to the URL.
 * Any <Route> nested inside it is automatically protected.
 *
 * How it works:
 *  1. Reads auth state from Redux store.
 *  2. If user is logged in  → render <Outlet /> (the matched child route).
 *  3. If user is logged out → redirect to /login, passing current location in
 *     state so Login can send them back after a successful sign-in.
 *
 * Usage in App.js:
 *   <Route element={<ProtectedRoute />}>
 *     <Route path="/dashboard" element={<Dashboard />} />
 *     <Route path="/settings"  element={<Settings  />} />
 *   </Route>
 */
export default function ProtectedRoute() {
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();

  if (!user) {
    // replace={true} removes this URL from history so Back doesn't loop
    console.log(location);

    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { Spinner } from "../ui/Spinner";

function ProtectedRoute() {
  const user = useAuth();
  if (user) {
    return children;
  }
  return <div>ProtectedRoute</div>;
}

export default ProtectedRoute;

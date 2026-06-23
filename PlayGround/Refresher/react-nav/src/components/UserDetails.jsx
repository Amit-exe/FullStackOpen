import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import useGetUser from "../utils/useGetUser";

function UserDetails() {
  const { id } = useParams(); // Extracts ID from URL path
  const { user, loading, error } = useGetUser(id);

  if (loading) return <p>Loading user details...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!user) return <p>No user found.</p>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  );
}

export default UserDetails;

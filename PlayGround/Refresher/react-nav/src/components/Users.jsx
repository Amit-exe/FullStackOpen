import React from "react";
import { Link } from "react-router-dom";
import useGetAllUser from "../utils/useGetAllUser";

function Users() {
  const { users, loading, error } = useGetAllUser();

  if (loading) return <p>Loading user details...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!users) return <p>No user found.</p>;

  return (
    <div>
      {users.map((e) => (
        <div>
          <Link to={`/users/${e.id}`}>{e.name}</Link>
          <br></br>
        </div>
      ))}
    </div>
  );
}

export default Users;

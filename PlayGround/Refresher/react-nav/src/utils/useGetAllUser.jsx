import { useState, useEffect } from "react";
import axios from "axios";

function useGetAllUser() {
  const [users, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(`/api/users/`);
        console.log(res.data);

        setUser(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  return { users, loading, error };
}

export default useGetAllUser;

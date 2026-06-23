import { useState, useEffect } from "react";
import axios from "axios";

function useGetUser(id) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(`/api/users/${id}`);
        setUser(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [id]);

  return { user, loading, error };
}

export default useGetUser;

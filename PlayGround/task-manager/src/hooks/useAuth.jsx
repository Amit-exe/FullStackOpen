import axios from "axios";
import React, { useEffect, useState } from "react";

function useAuth() {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // api call
    // const user = axios.get('/api/login')
    const user = { name: "amit", id: "1" };
    setUser(user);
    setIsLoading(false);
  }, []);

  return [user, isLoading];
}

export default useAuth;

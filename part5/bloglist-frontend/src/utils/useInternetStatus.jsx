import React, { useEffect, useState } from "react";

function useInternetStatus() {
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    window.addEventListener("offline", () => setIsOnline(false));
    window.addEventListener("online", () => setIsOnline(true));
  }, []);

  return isOnline;
}

export default useInternetStatus;

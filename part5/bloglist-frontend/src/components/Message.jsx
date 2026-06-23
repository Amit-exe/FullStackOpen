import React from "react";

function Message({ type, value }) {
  return (
    <p
      className={`${type === "info" ? "text-green-400" : "text-red-400"} text-2xl font-bold border-2 rounded-2xl bg-gray-100 p-2 my-5`}
    >
      {value}
    </p>
  );
}

export default Message;

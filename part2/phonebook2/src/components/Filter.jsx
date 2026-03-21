import React from "react";

function Filter({ search, handleSearch }) {
  return (
    <div>
      <p>search with a</p>
      <input type="text" value={search} onChange={handleSearch} />
    </div>
  );
}

export default Filter;

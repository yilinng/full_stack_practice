import React from "react";

export default function Filter({ filterByName, setFilterByName }) {
  return (
    <div>
      filter shown with:
      <input
        value={filterByName}
        onChange={(event) => setFilterByName(event.target.value)}
      />
    </div>
  );
}

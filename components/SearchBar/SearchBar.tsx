import React, { useState } from "react";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  return (
    <div className="flex w-full cursor-text gap-2 rounded border bg-gray-100 p-2 hover:border-gray-500">
      <span className="material-symbols-outlined text-gray-500">search</span>
      <input
        className="w-full bg-gray-100 outline-none"
        type="text"
        placeholder="Search families"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;

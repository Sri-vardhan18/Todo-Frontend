import { useState } from "react";

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState("");
  return (
    <div>
      <input
        type="text"
        placeholder="Search To-Do"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchBar

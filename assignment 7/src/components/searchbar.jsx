// src/components/SearchBar.js
import React from 'react';

const SearchBar = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="px-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Search items..."
      />
    </div>
  );
};

export default SearchBar;

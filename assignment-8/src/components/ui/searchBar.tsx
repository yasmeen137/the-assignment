import React from 'react';
import useStore from '../../useStore';

const SearchBar = () => {
  const setSearchQuery = useStore((state) => state.setSearchQuery);
  const searchQuery = useStore((state) => state.searchQuery);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value); 
  };

  return (
    <div className="flex justify-center mb-6">
      <input
        type="text"
        placeholder="Search Anime..."
        value={searchQuery}
        onChange={handleInputChange}
        className="search-bar mb-6 p-2 bg-gray-700 text-white border border-gray-600 rounded"
      />
    </div>
  );
};

export default SearchBar;

import React from 'react';
import { Button } from './Button';

const SearchBar = () => {
  const handleSearch = () => {
    console.log('Search clicked');
  };

  const handleClear = () => {
    console.log('Clear clicked');
  };

  return (
    <div className="flex items-center space-x-2">
      <Button variant="outline" size="default" onClick={handleSearch}>
        Search
      </Button>
      <Button variant="ghost" size="default" onClick={handleClear}>
        Clear
      </Button>
    </div>
  );
};

export default SearchBar;
import React, { useState } from 'react';
import Header from './Header';
import MoviesContainer from './MoviesContainer';
import FilterModal from './FilterModal';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div>
      <Header onSearch={handleSearch} />
      <MoviesContainer searchQuery={searchQuery} filters={filters} />
      <FilterModal onApplyFilters={handleApplyFilters} />
    </div>
  );
};

export default App;

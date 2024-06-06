import React, { useState } from 'react';
import Header from './Header';
import MoviesContainer from './MoviesContainer';
import FilterModal from './FilterModal';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const handleOpenFilter = () => {
    setIsFilterModalOpen(true);
  };

  const handleCloseFilter = () => {
    setIsFilterModalOpen(false);
  };

  const handleApplyFilters = (appliedFilters) => {
    setFilters(appliedFilters);
  };

  return (
    <div>
      <Header onSearch={setSearchQuery} onOpenFilter={handleOpenFilter} />
      <MoviesContainer searchQuery={searchQuery} filters={filters} />
      {isFilterModalOpen && <FilterModal onClose={handleCloseFilter} onApplyFilters={handleApplyFilters} />}
    </div>
  );
}

export default App;

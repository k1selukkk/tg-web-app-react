import React, { useState } from 'react';
import Header from './Header';
import MoviesContainer from './MoviesContainer';
import FilterModal from './FilterModal';
import Modal from './Modal';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleOpenFilter = () => {
    setIsFilterModalOpen(true);
  };

  const handleCloseFilter = () => {
    setIsFilterModalOpen(false);
  };

  const handleApplyFilters = (appliedFilters) => {
    setFilters(appliedFilters);
  };

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
  };

  const handleSendToBot = (movie) => {
    sendMovieInfoToBot(movie);
  };

  const sendMovieInfoToBot = (movie) => {
    fetch('https://my-json-server.typicode.com/typicode/demo/db', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(movie)
    })
    .then(response => {
      console.log('Информация успешно отправлена боту');
    })
    .catch(error => {
      console.error('Ошибка при отправке информации боту:', error);
    });
  };

  return (
    <div>
      <Header onSearch={setSearchQuery} onOpenFilter={handleOpenFilter} />
      <MoviesContainer searchQuery={searchQuery} filters={filters} onMovieSelect={handleMovieSelect} />
      {isFilterModalOpen && <FilterModal onClose={handleCloseFilter} onApplyFilters={handleApplyFilters} />}
      {selectedMovie && <Modal movie={selectedMovie} onClose={() => setSelectedMovie(null)} onSendToBot={handleSendToBot} />}
    </div>
  );
}

export default App;


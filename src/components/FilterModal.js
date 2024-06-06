import React, { useState, useEffect } from 'react';

const API_KEY = "8c8e1a50-6322-4135-8875-5d40a5420d86";
const API_URL_GENRES = "https://kinopoiskapiunofficial.tech/api/v2.2/films/filters";

function FilterModal({ onClose, onApplyFilters }) {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');

  useEffect(() => {
    const fetchGenres = async () => {
      const response = await fetch(API_URL_GENRES, {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": API_KEY,
        },
      });
      const data = await response.json();
      setGenres(data.genres);
    };

    fetchGenres();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    onApplyFilters({ genre: selectedGenre });
    onClose();
  };

  return (
    <div className="filter-modal" onClick={onClose}>
      <div className="filter-modal__content" onClick={e => e.stopPropagation()}>
        <h2>Фильтры</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Жанр:</label>
            <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
              <option value="">Все</option>
              {genres.map(genre => (
                <option key={genre.id} value={genre.id}>{genre.genre}</option>
              ))}
            </select>
          </div>
          <button type="submit">Применить</button>
        </form>
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
}

export default FilterModal;

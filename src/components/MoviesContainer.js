import React, { useState, useEffect } from 'react';
import Movie from './Movie';
import Modal from './Modal';

const API_KEY = "8c8e1a50-6322-4135-8875-5d40a5420d86";
const API_URL_POPULAR = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
const API_URL_SEARCH = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";

function MoviesContainer() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetchMovies(API_URL_POPULAR);
  }, []);

  const fetchMovies = async (url) => {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": API_KEY,
      },
    });
    const data = await response.json();
    setMovies(data.films);
  };

  const handleSearch = (query) => {
    fetchMovies(`${API_URL_SEARCH}${query}`);
  };

  const handleModal = (movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="container">
      <div className="movies">
        {movies.map(movie => (
          <Movie key={movie.filmId} movie={movie} onClick={() => handleModal(movie)} />
        ))}
      </div>
      {selectedMovie && <Modal movie={selectedMovie} onClose={closeModal} />}
    </div>
  );
}

export default MoviesContainer;

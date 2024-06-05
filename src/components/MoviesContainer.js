import React, { useState, useEffect } from 'react';
import Movie from './Movie';
import Modal from './Modal';

const API_KEY = "8c8e1a50-6322-4135-8875-5d40a5420d86";
const API_URL_POPULAR = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
const API_URL_SEARCH = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
const API_URL_MOVIE_DETAILS = "https://kinopoiskapiunofficial.tech/api/v2.2/films/";

function MoviesContainer({ searchQuery }) {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (searchQuery) {
      fetchMovies(`${API_URL_SEARCH}${searchQuery}`);
    } else {
      fetchMovies(API_URL_POPULAR);
    }
  }, [searchQuery]);

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

  const handleModal = async (id) => {
    const response = await fetch(`${API_URL_MOVIE_DETAILS}${id}`, {
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": API_KEY,
      },
    });
    const movie = await response.json();
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="container">
      <div className="movies">
        {movies.map(movie => (
          <Movie key={movie.filmId} movie={movie} onClick={() => handleModal(movie.filmId)} />
        ))}
      </div>
      {selectedMovie && <Modal movie={selectedMovie} onClose={closeModal} />}
    </div>
  );
}

export default MoviesContainer;

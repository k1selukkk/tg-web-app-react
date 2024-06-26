import React from 'react';

function getClassByRate(vote) {
  if (vote >= 7) {
    return "green";
  } else if (vote > 5) {
    return "orange";
  } else {
    return "red";
  }
}

function Movie({ movie, onClick }) {
  const rating = movie.rating || movie.ratingKinopoisk || movie.ratingImdb;

  return (
    <div className="movie" onClick={onClick}>
      <div className="movie__cover-inner">
        <img src={movie.posterUrlPreview || movie.posterUrl} className="movie__cover" alt={movie.nameRu || movie.nameEn} />
        <div className="movie__cover--darkened"></div>
      </div>
      <div className="movie__info">
        <div className="movie__title">{movie.nameRu || movie.nameEn}</div>
        <div className="movie__category">{movie.genres.map(genre => ` ${genre.genre}`)}</div>
        {rating && (
          <div className={`movie__average movie__average--${getClassByRate(rating)}`}>{rating}</div>
        )}
      </div>
    </div>
  );
}

export default Movie;

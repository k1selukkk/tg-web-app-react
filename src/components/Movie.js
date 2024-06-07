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

function Movie({ movie }) {
  const rating = movie.rating || movie.ratingKinopoisk || movie.ratingImdb;

  const handleClick = async () => {
    const tg = window.Telegram.WebApp;
    const chatId = tg.initDataUnsafe.user.id;

    const movieDetails = `
      ${movie.nameRu} - ${movie.year}
      Жанр - ${movie.genres.map(el => el.genre).join(', ')}
      Время - ${movie.filmLength} минут
      Сайт: ${movie.webUrl}
      Описание - ${movie.description}
    `;

    try {
      const response = await fetch('http://localhost:3000/sendMovieDetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ chatId, movieDetails }),
      });

      if (response.ok) {
        console.log('Movie details sent successfully');
      } else {
        console.error('Failed to send movie details');
      }
    } catch (error) {
      console.error('Failed to send movie details', error);
    }
  };

  return (
    <div className="movie" onClick={handleClick}>
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

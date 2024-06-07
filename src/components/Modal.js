import React from 'react';
import axios from 'axios';

const Telegraf = require('telegraf');
const bot = new Telegraf('6839956141:AAEHaAlbHk-m5VFPFkrJDXflekn5AHR6inM');

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

  const handleClick = () => {
    onClick();
    sendMovieInfoToBot(movie);
  };

  const sendMovieInfoToBot = async (movie) => {
    try {
      await axios.post(`https://api.telegram.org/bot${bot.token}/sendMessage`, {
        chat_id: '983259207',
        text: `
          Название: ${movie.nameRu || movie.nameEn}
          Жанры: ${movie.genres.map(genre => genre.genre).join(', ')}
          Рейтинг: ${rating}
        `,
      });
    } catch (error) {
      console.error('Ошибка отправки сообщения в Telegram:', error);
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

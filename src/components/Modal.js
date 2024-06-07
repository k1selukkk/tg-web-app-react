import React from 'react';
import axios from 'axios';

const Telegraf = require('telegraf');
const bot = new Telegraf('6839956141:AAEHaAlbHk-m5VFPFkrJDXflekn5AHR6inM');

function Modal({ movie, onClose }) {
  if (!movie || !movie.genres) return null; // Prevent rendering if no movie is selected or genres are not defined

  const handleClose = () => {
    onClose();
    sendMovieInfoToBot(movie);
  };

  const sendMovieInfoToBot = async (movie) => {
    try {
      await axios.post(`https://api.telegram.org/bot${bot.token}/sendMessage`, {
        chat_id: '983259207',
        text: `
          Название: ${movie.nameRu}
          Жанры: ${movie.genres.map(genre => genre.genre).join(', ')}
          Год: ${movie.year}
          Длительность: ${movie.filmLength} минут
          Описание: ${movie.description}
          Ссылка: ${movie.webUrl}
        `,
      });
    } catch (error) {
      console.error('Ошибка отправки сообщения в Telegram:', error);
    }
  };

  return (
    <div className="modal modal--show" onClick={handleClose}>
      <div className="modal__card" onClick={e => e.stopPropagation()}>
        <img className="modal__movie-backdrop" src={movie.posterUrl} alt="" />
        <h2>
          <span className="modal__movie-title">{movie.nameRu}</span>
          <span className="modal__movie-release-year"> - {movie.year}</span>
        </h2>
        <ul className="modal__movie-info">
          <li className="modal__movie-genre">Жанр - {movie.genres.map(el => <span key={el.genre}>{el.genre}</span>)}</li>
          {movie.filmLength && <li className="modal__movie-runtime">Время - {movie.filmLength} минут</li>}
          <li>Сайт: <a className="modal__movie-site" href={movie.webUrl}>{movie.webUrl}</a></li>
          <li className="modal__movie-overview">Описание - {movie.description}</li>
        </ul>
        <button type="button" className="modal__button-close" onClick={handleClose}>Закрыть</button>
      </div>
    </div>
  );
}

export default Modal;


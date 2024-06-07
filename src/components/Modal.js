import React from 'react';

function Modal({ movie, onClose, onSendToBot }) {
  if (!movie || !movie.genres) return null; // Prevent rendering if no movie is selected or genres are not defined

  return (
    <div className="modal modal--show" onClick={(e) => {
      onClose();
      onSendToBot(movie);
    }}>
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
        <button type="button" className="modal__button-close" onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
}

export default Modal;

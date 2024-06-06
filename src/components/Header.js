import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

const API_KEY = "8c8e1a50-6322-4135-8875-5d40a5420d86";
const API_URL_SEARCH = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";

function Header({ onSearch, onOpenFilter }) {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(input);
    setSuggestions([]);
  };

  const fetchSuggestions = async (query) => {
    if (query.length > 2) {
      const response = await fetch(`${API_URL_SEARCH}${query}`, {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": API_KEY,
        },
      });
      const data = await response.json();
      setSuggestions(data.films.slice(0, 3));
    } else {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    if (input) {
      fetchSuggestions(input);
    } else {
      setSuggestions([]);
    }
  }, [input]);

  return (
    <header className="container">
      <div className="header__content">
        <button className="filter-button" onClick={onOpenFilter}>
          <FontAwesomeIcon icon={faFilter} />
        </button>
        <a href="/" className="header__logo">MovieApp</a>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="header__search"
            placeholder="Поиск"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          {suggestions.length > 0 && (
            <ul className="suggestions">
              {suggestions.map(suggestion => (
                <li key={suggestion.filmId} onClick={() => {
                  onSearch(suggestion.nameRu);
                  setInput(suggestion.nameRu);
                  setSuggestions([]);
                }}>
                  {suggestion.nameRu} ({suggestion.rating})
                </li>
              ))}
            </ul>
          )}
        </form>
      </div>
    </header>
  );
}

export default Header;

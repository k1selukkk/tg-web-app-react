import React, { useState } from 'react';

function Header({ onSearch }) {
  const [input, setInput] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(input);
  };

  return (
    <header className="container">
      <div className="header__content">
        <a href="/" className="header__logo">FilmsSearching</a>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="header__search"
            placeholder="Поиск"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </form>
      </div>
    </header>
  );
}

export default Header;

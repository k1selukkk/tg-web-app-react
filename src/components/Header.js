import React, { useState } from 'react';

const Header = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <header className="container">
      <div className="header__content">
        <a href="/" className="header__logo">MovieApp</a>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="header__search"
            placeholder="Поиск"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </div>
    </header>
  );
};

export default Header;

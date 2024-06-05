import React, { useState } from 'react';
import Header from './Header';
import MoviesContainer from './MoviesContainer';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div>
      <Header onSearch={setSearchQuery} />
      <MoviesContainer searchQuery={searchQuery} />
    </div>
  );
}

export default App;

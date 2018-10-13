import React from 'react';
import '../styles/Header.css';

const Header = () => {
  return (
    <div className="header">
      <img width="80" src="moviedb-icon.svg" alt="" />
      <h2 className="title">React Movies</h2>
    </div>
  );
};

export default Header;

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  return (
    <Link
      to="/"
      className="header"
      style={{ textDecoration: 'none', color: 'white' }}
    >
      <img width="80" src="moviedb-icon.svg" alt="logo" />
      <h2 className="title">React Movies</h2>
    </Link>
  );
};

export default Header;

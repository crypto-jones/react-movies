import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import logo from '../images/movie-logo.png';

const Header = () => {
  return (
    <Link
      to="/"
      className="header"
      style={{ textDecoration: 'none', color: 'white' }}
    >
      <img width="80" src={logo} alt="logo" className="db-logo" />
      <h2 className="title">React Movies</h2>
    </Link>
  );
};

export default Header;

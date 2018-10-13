import React, { Component } from 'react';
import '../styles/SearchBar.css';

class SearchBar extends Component {
  state = {};
  render() {
    return (
      <input
        className="search-bar"
        type="text"
        placeholder="Search for a movie..."
      />
    );
  }
}

export default SearchBar;

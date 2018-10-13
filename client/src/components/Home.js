import React, { Component } from 'react';
// import queryString from 'query-string';
import Header from './Header';
import SearchBar from './SearchBar';
import MovieList from './MovieList';
import '../styles/Home.css';

class Home extends Component {
  // componentDidMount() {
  //   console.log(this.props.location.search);
  //   const values = queryString.parse(this.props.location.search);
  //   console.log(values);
  // }

  render() {
    return (
      <div className="home-container">
        <Header />
        <SearchBar />
        <MovieList />
      </div>
    );
  }
}

export default Home;

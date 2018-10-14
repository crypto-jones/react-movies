import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';
import '../styles/MovieList.css';

// Create your own API Key at https://developers.themoviedb.org/3/getting-started
import API_KEY from '../config';

class MovieList extends Component {
  state = {
    movies: [],
    search: ''
  };

  componentDidMount() {
    this.fetchMovies();
  }

  updateSearch = e => {
    if (e.target.value.length < this.state.search.length) {
      this.fetchMovies();
    }
    this.setState({ search: e.target.value });
    this.filterMovies();
  };

  filterMovies = () => {
    let filter = this.state.movies.filter(movie => {
      if (
        movie.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
        -1
      ) {
        return true;
      }
    });
    this.setState({ movies: filter });
  };

  fetchMovies() {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    )
      .then(response => response.json())
      .then(data => {
        this.setState({ movies: data.results });
        console.log(this.state.movies);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    if (!this.state.movies) {
      return <div>Loading movies...</div>;
    }

    return (
      <Fragment>
        <input
          className="search-bar"
          type="text"
          placeholder="Search movie by title..."
          value={this.state.search}
          onChange={this.updateSearch}
        />
        <div className="movie-card-container">
          {this.state.movies.map(movie => (
            <MovieDetails key={movie.id} movie={movie} />
          ))}
        </div>
      </Fragment>
    );
  }
}

function MovieDetails({ movie }) {
  return (
    <Link
      to={`/movies/${movie.id}`}
      style={{ textDecoration: 'none', color: 'white' }}
    >
      <MovieCard movie={movie} />
    </Link>
  );
}

export default MovieList;

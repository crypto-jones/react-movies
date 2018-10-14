import React, { Component } from 'react';
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
      <div>
        <input
          className="search-bar"
          type="text"
          placeholder="Search for a movie..."
        />
        {this.state.movies.map(movie => (
          <ul className="movie-card" key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
              alt="Movie Poster"
            />
            <div className="movie-text">
              <h2>{movie.title}</h2>
              <p>{movie.overview}</p>
            </div>
          </ul>
        ))}
      </div>
    );
  }
}

export default MovieList;

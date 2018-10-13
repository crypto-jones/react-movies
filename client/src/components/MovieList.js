import React, { Component } from 'react';

// Create your own API Key at https://developers.themoviedb.org/3/getting-started
import API_KEY from '../config';

class MovieList extends Component {
  state = {
    movies: []
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
        {this.state.movies.map(movie => (
          <ul key={movie.id}>{movie.title}</ul>
        ))}
      </div>
    );
  }
}

export default MovieList;

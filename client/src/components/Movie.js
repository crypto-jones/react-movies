import React, { Component } from 'react';
import '../styles/Movie.css';

// Create your own API Key at https://developers.themoviedb.org/3/getting-started
import API_KEY from '../config';

class Movie extends Component {
  state = {
    title: [],
    releaseDate: '',
    voteAverage: null,
    poster: null
  };

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  fetchMovie = id => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
    )
      .then(response => response.json())
      .then(data => {
        this.setState(() => ({
          title: data.title,
          releaseDate: data.release_date,
          voteAverage: data.vote_average,
          poster: data.poster_path
        }));
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    if (!this.state) {
      return <div>Loading movie information...</div>;
    }
    return (
      <div className="movie-container">
        <h2>{this.state.title}</h2>
        <p>{this.state.releaseDate}</p>
        <p>{this.state.voteAverage}</p>
        <img
          src={`https://image.tmdb.org/t/p/w400/${this.state.poster}`}
          alt="Movie Poster"
        />
      </div>
    );
  }
}

export default Movie;

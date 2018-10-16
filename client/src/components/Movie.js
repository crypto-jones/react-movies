import React, { Component } from 'react';
import '../styles/Movie.css';

// Create your own API Key at https://developers.themoviedb.org/3/getting-started
const API_KEY = process.env.REACT_APP_API_KEY;

const noImage =
  'https://vignette.wikia.nocookie.net/bakemonogatari1645/images/2/26/No-cover-placeholder.png/revision/latest?cb=20171227065818';

class Movie extends Component {
  state = {
    title: [],
    releaseDate: '',
    voteAverage: null,
    poster: null,
    runTime: null,
    overview: ''
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
          poster: data.poster_path,
          runTime: data.runtime,
          overview: data.overview
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
        <img
          src={`https://image.tmdb.org/t/p/w400/${this.state.poster}`}
          alt="Movie Poster"
          style={{ border: '1.5px solid white' }}
          className="movie-poster"
          onError={e => {
            e.target.onerror = null;
            e.target.src = noImage;
          }}
        />
        <p>
          <span className="movie-details">Release Date:</span>{' '}
          {this.state.releaseDate}
        </p>
        <p>
          {' '}
          <span className="movie-details">Rating: </span>{' '}
          {this.state.voteAverage}
        </p>
        <p>
          {' '}
          <span className="movie-details">Run Time: </span> {this.state.runTime}{' '}
          Minutes
        </p>
        <p className="movie-details overview">Overview</p>
        <p className="align-left">{this.state.overview}</p>
      </div>
    );
  }
}

export default Movie;

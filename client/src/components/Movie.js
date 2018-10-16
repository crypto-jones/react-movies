import React, { Component } from 'react';
import YouTube from 'react-youtube';
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
    overview: '',
    video: []
  };

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
    this.fetchVideo(this.props.match.params.id);
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

  fetchVideo = id => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
    )
      .then(response => response.json())
      .then(json => json.results)
      .then(data => {
        const results = data.map(movie => {
          let temp = {};
          temp.key = movie.key;
          return temp;
        });
        this.setState({
          video: results[0]
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    if (!this.state) {
      return <div>Loading movie information...</div>;
    }

    if (!this.state.video) {
      return (
        <div className="movie-container">
          <h2 className="movie-header">{this.state.title}</h2>
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
            <span className="movie-details">Run Time: </span>{' '}
            {this.state.runTime} Minutes
          </p>
          <p className="movie-details overview">Overview</p>
          <p className="align-left">{this.state.overview}</p>
        </div>
      );
    } else {
      return (
        <div className="movie-container">
          <h2 className="movie-header">{this.state.title}</h2>
          <div className="iframe-container">
            <YouTube
              videoId={Object.values(this.state.video).toString()}
              className="iframe"
            />
          </div>
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
            <span className="movie-details">Run Time: </span>{' '}
            {this.state.runTime} Minutes
          </p>
          <p className="movie-details overview">Overview</p>
          <p className="align-left">{this.state.overview}</p>
        </div>
      );
    }
  }
}

export default Movie;

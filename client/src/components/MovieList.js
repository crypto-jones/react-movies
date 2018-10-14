import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';
import '../styles/MovieList.css';

// Create your own API Key at https://developers.themoviedb.org/3/getting-started
import API_KEY from '../config';

class MovieList extends Component {
  state = {
    movies: [],
    search: '',
    suggestions: []
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

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ search: '' });
  };

  // searchMovies = () => {
  //   const trimmedValue = this.state.search.trim();

  //   if (trimmedValue.length > 0) {
  //     let url = `https://api.themoviedb.org/3/search/movie?query=${trimmedValue}&api_key=${API_KEY}`;
  //     fetch(url)
  //       .then(response => response.json())
  //       .then(json => json.results)
  //       .then(data => {
  //         const results = data.map(movie => {
  //           let temp = {};
  //           temp.id = movie.id;
  //           temp.title = movie.title;
  //           temp.overview = movie.overview;
  //           temp.img = movie.poster_path;
  //         });
  //         this.setState({
  //           suggestions: results
  //         });
  //         console.log(this.state.suggestions);
  //       })
  //       // .then(data => {
  //       //   this.setState({ suggestions: data.results });
  //       //   console.log(this.state.suggestions);
  //       // })
  //       .catch(error => console.log('Cannot get suggestions.'));
  //   } else {
  //     this.setState({
  //       suggestions: []
  //     });
  //   }
  // };

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
    } else if (this.state.suggestions.length > 1) {
      return (
        <Fragment>
          <input
            className="search-bar"
            type="text"
            placeholder="Search movie by title..."
            value={this.state.search}
            onChange={this.updateSearch}
            onClick={this.searchMovies}
          />
          <div className="movie-card-container">
            {this.state.suggestions.map(movie => (
              <MovieDetails key={movie.id} movie={movie} />
            ))}
          </div>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <input
            className="search-bar"
            type="text"
            placeholder="Search movie by title..."
            value={this.state.search}
            onChange={this.updateSearch}
            onClick={this.searchMovies}
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

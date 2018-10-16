import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import MovieCard from './MovieCard';
import 'bootstrap/dist/css/bootstrap.css';
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
    this.setState({ search: e.target.value }, () => this.searchMovies());
  };

  handleSubmit = () => {
    window.location.href = '/';
  };

  filterMovies = () => {
    let filter = this.state.suggestions.filter(movie => {
      if (
        movie.title.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
        -1
      ) {
        return true;
      }
    });
    this.setState({ suggestions: filter });
  };

  searchMovies = () => {
    const trimmed = this.state.search.trim();

    if (trimmed.length > 0) {
      let url = `https://api.themoviedb.org/3/search/movie?query=${trimmed}&api_key=${API_KEY}`;
      // console.log(url);
      fetch(url)
        .then(response => response.json())
        .then(json => json.results)
        .then(data => {
          const results = data.map(movie => {
            let temp = {};
            temp.id = movie.id;
            temp.title = movie.title;
            temp.overview = movie.overview;
            temp.poster_path = movie.poster_path;
            return temp;
          });
          this.setState({
            suggestions: results
          });
          this.searchMovies();
        })
        .catch(error => console.log('Cannot get suggested movies.'));
    } else {
      this.setState({
        suggestions: []
      });
    }
  };

  fetchMovies() {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    )
      .then(response => response.json())
      .then(data => {
        this.setState({ movies: data.results });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    if (!this.state.movies) {
      return <div>Loading movies...</div>;
    }
    if (this.state.search.length > 0) {
      return (
        <Fragment>
          <input
            className="search-bar"
            type="text"
            placeholder="Search movie by title..."
            value={this.state.search}
            onChange={this.updateSearch}
          />
          <br />
          <Button outline color="info" size="sm" onClick={this.handleSubmit}>
            Reset
          </Button>

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
          />
          <h3 className="trending">Trending Now</h3>
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

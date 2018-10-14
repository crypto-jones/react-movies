import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import Movie from './components/Movie';
import './App.css';

class App extends Component {
  state = {
    movieList: []
  };

  render() {
    return (
      <div className="App">
        <Route path="/" component={Header} />
        <Route exact path="/" component={Home} />
        <Route
          path="/movies/:id"
          render={props => {
            return <Movie {...props} />;
          }}
        />
      </div>
    );
  }
}

export default App;

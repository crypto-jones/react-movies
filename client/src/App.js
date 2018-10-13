import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from './components/Home';
import './App.css';

class App extends Component {
  state = {
    movieList: []
  };

  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Home} />
      </div>
    );
  }
}

export default App;

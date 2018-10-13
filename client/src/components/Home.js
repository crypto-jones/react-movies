import React, { Component, Fragment } from 'react';
// import queryString from 'query-string';
import Header from './Header';

class Home extends Component {
  // componentDidMount() {
  //   console.log(this.props.location.search);
  //   const values = queryString.parse(this.props.location.search);
  //   console.log(values);
  // }

  render() {
    return (
      <Fragment>
        <Header />
      </Fragment>
    );
  }
}

export default Home;

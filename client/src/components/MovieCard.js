import React from 'react';

const MovieCard = props => {
  const { id, title, overview, poster_path } = props.movie;
  return (
    <ul className="movie-card" key={id}>
      <img
        src={`https://image.tmdb.org/t/p/w200/${poster_path}`}
        alt="Movie Poster"
      />
      <div className="movie-text">
        <h2>{title}</h2>
        <p>{overview}</p>
      </div>
    </ul>
  );
};

export default MovieCard;

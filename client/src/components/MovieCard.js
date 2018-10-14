import React from 'react';
import TextTruncate from 'react-text-truncate';

const MovieCard = props => {
  const { id, title, overview, poster_path } = props.movie;
  return (
    <ul className="movie-card" key={id}>
      <img
        src={`https://image.tmdb.org/t/p/w200/${poster_path}`}
        alt="Movie Poster"
      />
      <div className="movie-text">
        <h2 className="movie-title">{title}</h2>
        <TextTruncate line={5} truncateText="..." text={overview} />
      </div>
    </ul>
  );
};

export default MovieCard;

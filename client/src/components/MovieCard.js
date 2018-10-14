import React from 'react';
import TextTruncate from 'react-text-truncate';

const noImage =
  'https://vignette.wikia.nocookie.net/bakemonogatari1645/images/2/26/No-cover-placeholder.png/revision/latest?cb=20171227065818';

const MovieCard = props => {
  const { id, title, overview, poster_path } = props.movie;
  return (
    <ul className="movie-card" key={id}>
      <img
        src={`https://image.tmdb.org/t/p/w200/${poster_path}`}
        alt="Movie Poster"
        onError={e => {
          e.target.onerror = null;
          e.target.src = noImage;
        }}
      />
      <div className="movie-text">
        <h2 className="movie-title">{title}</h2>
        <TextTruncate line={5} truncateText="..." text={overview} />
      </div>
    </ul>
  );
};

export default MovieCard;

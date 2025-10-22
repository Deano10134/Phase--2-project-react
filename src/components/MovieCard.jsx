import React from 'react';
import { Link } from 'react-router-dom';

function MovieCard({ movie }) {
  const { id, title, year, rating, poster } = movie;

  return (
    <Link to={`/movies/${id}`} className="movie-card">
      <div className="movie-card-image">
        {poster ? (
          <img src={poster} alt={`${title} poster`} />
        ) : (
          <div className="no-image">
            <span>🎬</span>
            <p>No Image</p>
          </div>
        )}
      </div>
      <div className="movie-card-content">
        <h3 className="movie-card-title">{title}</h3>
        <div className="movie-card-meta">
          <span className="year">{year}</span>
          <span className="rating">⭐ {rating}</span>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { slugify } from '../utils/slugify';

const API_BASE = 'http://localhost:5000';

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/movies/${id}`)
      .then(response => response.json())
      .then(data => {
        setMovie(data);
      })
      .catch(error => {
        console.error('Error fetching movie:', error);
      });
  }, [id]);

  // Handle delete movies button

  function handleDelete() {
    if (window.confirm(`Are you sure you want to delete "${movie.title}"?`)) {
      fetch(`${API_BASE}/movies/${id}`, { method: 'DELETE' })
        .then(() => {
          navigate('/movies');
        })
        .catch(error => console.error('Error deleting movie:', error));
    }
  }

  if (!movie) {
    return (
      <div className="movie-details-container">
        <div className="empty-state">
          <h2>Movie not found</h2>
          <Link to="/movies" className="btn btn-primary">
            Back to Movies
          </Link>
        </div>
      </div>
    );
  }

  const { title, year, rating, poster, description, director, cast, classification } = movie;

  return (
    <div className="movie-details-container">
      <div className="movie-details-card">
        <div className="details-header">
          <Link to="/movies" className="back-link">
            ← Back to Movies
          </Link>
          <div className="action-buttons">
            <Link to={`/movies/${id}/${slugify(title)}/edit`} className="btn btn-edit">
              Edit
            </Link>
            <button onClick={handleDelete} className="btn btn-danger">
              Delete
            </button>
          </div>
        </div>

        <div className="movie-details-content">
          <div className="movie-poster-large">
            {poster ? (
              <img src={poster} alt={`${title} poster`} />
            ) : (
              <div className="no-image-large">
                <span>🎬</span>
                <p>No Image Available</p>
              </div>
            )}
          </div>

          <div className="movie-info">
            <h1 className="movie-title">
              {title}
              <span className="movie-year">({year})</span>
            </h1>

            <div className="movie-rating-large">
              <span className="rating-label">Rating</span>
              <span className="rating-value">⭐ {rating}/10</span>
            </div>

            <div className="movie-description">
              <h3>About This Movie</h3>
              <p>
                {description
                  ? description
                  : `${title} was released in ${year} and has a rating of ${rating}/10.`}
              </p>
            </div>

            <div className="movie-stats">
              <div className="stat-item">
                <span className="stat-label">Release Year</span>
                <span className="stat-value">{year}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">User Rating</span>
                <span className="stat-value">{rating}/10</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Director</span>
                <span className="stat-value">{director || 'Unknown'}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Starring</span>
                <span className="stat-value">
                  {Array.isArray(cast) && cast.length > 0 ? cast.join(', ') : 'Unknown'}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Classification (AU)</span>
                <span className="stat-value">{classification || 'NR'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;

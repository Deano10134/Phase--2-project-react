import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const API_BASE = 'http://localhost:5000';

function MovieForm({ isEdit = false }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    year: '',
    rating: '',
    poster: ''
  });

  const [error, setError] = useState(null);

  // Fetch existing movie data if editing
  useEffect(() => {
    if (isEdit && id) {
      fetch(`${API_BASE}/movies/${id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch movie');
          }
          return response.json();
        })
        .then(movie => {
          setFormData({
            title: movie.title || '',
            year: movie.year || '',
            rating: movie.rating || '',
            poster: movie.poster || ''
          });
        })
        .catch(err => {
          console.error('Error fetching movie:', err);
          setError('Could not load movie data.');
        })
    }
  }, [isEdit, id]);

  // Controlled form - handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    const movieData = {
      title: formData.title.trim(),
      year: parseInt(formData.year),
      rating: parseFloat(formData.rating),
      poster: formData.poster.trim()
    };

    const configObj = {
      method: isEdit ? 'PATCH' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(movieData)
    };

    const endpoint = isEdit ? `${API_BASE}/movies/${id}` : `${API_BASE}/movies`;

    fetch(endpoint, configObj)
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to save movie');
        }
        return res.json();
      })
      .then(data => {
        navigate(`/movies/${isEdit ? id : data.id}`);
      })
      .catch(err => {
        console.error('Error saving movie:', err);
        setError('Something went wrong. Please try again.');
      });
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <div className="form-header">
          <h2>{isEdit ? 'Edit Movie' : 'Add New Movie'}</h2>
          <Link to="/movies" className="cancel-link">Cancel</Link>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="movie-form">
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter movie title"
              aria-label="Movie title"
              aria-required="true"
              aria-invalid={!!error}
              aria-describedby={error ? "title-error" : undefined}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="year">Year *</label>
              <input
                type="number"
                id="year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
                min="1900"
                max="2100"
                placeholder="2024"
              />
            </div>

            <div className="form-group">
              <label htmlFor="rating">Rating *</label>
              <input
                type="number"
                id="rating"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                required
                min="0"
                max="10"
                step="0.1"
                placeholder="8.5"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="poster">Poster URL</label>
            <input
              type="url"
              id="poster"
              name="poster"
              value={formData.poster}
              onChange={handleChange}
              placeholder="https://image.tmdb.org/t/p/w500/..."
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {isEdit ? 'Update Movie' : 'Add Movie'}
            </button>
            <Link to="/movies" className="btn btn-secondary">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MovieForm;
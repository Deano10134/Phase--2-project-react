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
  
  const [loading, setLoading] = useState(false);

  // Fetch existing movie data if editing
  useEffect(() => {
    if (isEdit && id) {
      setLoading(true);
      fetch(`${API_BASE}/movies/${id}`)
        .then(response => response.json())
        .then(movie => {
          setFormData({
            title: movie.title || '',
            year: movie.year || '',
            rating: movie.rating || '',
            poster: movie.poster || ''
          });
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching movie:', error);
          setLoading(false);
        });
    }
  }, [isEdit, id]);

  // Controlled form - handle input changes
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault();
    
    // Convert year and rating to numbers
    const movieData = {
      title: formData.title,
      year: parseInt(formData.year),
      rating: parseFloat(formData.rating),
      poster: formData.poster
    };

    if (isEdit) {
      // UPDATE - PATCH request
      const configObj = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(movieData)
      };

      fetch(`${API_BASE}/movies/${id}`, configObj)
        .then(res => res.json())
        .then(() => {
          navigate(`/movies/${id}`);
        })
        .catch(error => console.error('Error updating movie:', error));
    } else {
      // CREATE - POST request
      const configObj = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(movieData)
      };

      fetch(`${API_BASE}/movies`, configObj)
        .then(res => res.json())
        .then(data => {
          // Navigate to the new movie's detail page
          navigate(`/movies/${data.id}`);
        })
        .catch(error => console.error('Error creating movie:', error));
    }
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading movie...</p>
      </div>
    );
  }

  return (
    <div className="form-container">
      <div className="form-card">
        <div className="form-header">
          <h2>{isEdit ? 'Edit Movie' : 'Add New Movie'}</h2>
          <Link to="/movies" className="cancel-link">
            Cancel
          </Link>
        </div>

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
            <Link to="/movies" className="btn btn-secondary">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MovieForm;
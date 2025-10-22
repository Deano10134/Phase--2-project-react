import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';
import SearchBar from './SearchBar';

const API_BASE = 'http://localhost:5000';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    fetch(`${API_BASE}/movies`)
      .then(response => response.json())
      .then(data => {
        // Ensure data is always an array
        setMovies(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
        setMovies([]); // Set to empty array on error
        setLoading(false);
      });
  }, []);

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading movies...</p>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="empty-state">
        <h2>No movies yet!</h2>
        <p>Start by adding your first movie.</p>
        <Link to="/movies/new" className="btn btn-primary">
          Add Movie
        </Link>
      </div>
    );
  }

  return (
    <div className="movie-list-container">
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      
      <div className="movie-list-header">
        <h2>All Movies</h2>
        <div className="header-actions">
          <span className="movie-count">{filteredMovies.length} movies</span>
          <Link to="/movies/new" className="btn btn-primary">
            + Add Movie
          </Link>
        </div>
      </div>
      
      {filteredMovies.length === 0 ? (
        <div className="empty-state">
          <h2>No movies found</h2>
          <p>Try adjusting your search.</p>
        </div>
      ) : (
        <div className="movies-grid">
          {filteredMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MovieList;
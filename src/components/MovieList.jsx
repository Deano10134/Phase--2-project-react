import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';
import SearchBar from './SearchBar';

const API_BASE = 'http://localhost:5000';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState(null); // null | 'title' | 'year' | 'rating'
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' | 'desc' (ignored when sortBy is null)

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

  // Prefer user rating if present; fall back to TMDB vote_average; coerce to number
  const getUserRating = (movie) => {
    const candidate =
      movie.userRating ??
      movie.user_rating ??
      movie.rating ??
      movie.myRating ??
      movie.vote_average ??
      0;

    const num = typeof candidate === 'string' ? parseFloat(candidate) : Number(candidate);
    return Number.isFinite(num) ? num : 0;
};

  // Extract a year from various shapes; return number or null if unknown
  const getYear = (movie) => {
    const y =
      movie.year ??
      movie.release_year ??
      movie.releaseYear ??
      (movie.release_date ? new Date(movie.release_date).getFullYear() : null) ??
      null;

    const num = typeof y === 'string' ? parseInt(y, 10) : Number(y);
    return Number.isFinite(num) ? num : null;
  };

  const getSortedMovies = (list) => {
    // If no sort field selected, leave list as-is (no ordering)
    if (!sortBy) return list;

    const sorted = [...list].sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case 'title':
          aValue = a.title?.toLowerCase() || '';
          bValue = b.title?.toLowerCase() || '';
          break;
        case 'year': {
          const ay = getYear(a);
          const by = getYear(b);
          const norm = (v) =>
            v ?? (sortOrder === 'asc' ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY);
          aValue = norm(ay);
          bValue = norm(by);
          break;
        }
        case 'rating':
          aValue = getUserRating(a);
          bValue = getUserRating(b);
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  };

  const defaultOrderFor = (field) => {
    if (field === 'title') return 'asc';
    if (field === 'year') return 'desc';
    if (field === 'rating') return 'desc';
    return 'asc';
  };
// Clicking the same field toggles asc/desc; switching field picks default order
/**
 * Clicking the same field toggles asc/desc; switching field picks default order
 */
const handleSortField = (field) => {
  if (sortBy === field) {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  } else {
    setSortBy(field);
    setSortOrder(defaultOrderFor(field));
  }
};
  // Use the existing filteredMovies and then sort it
  const sortedAndFilteredMovies = getSortedMovies(filteredMovies);

  return (
    <div className="movie-list-container">
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <div className="movie-list-header">
        <h2>All Movies</h2>
        <div className="header-actions">
          <span className="movie-count">{sortedAndFilteredMovies.length} movies</span>
          <Link to="/movies/new" className="btn btn-primary">
            + Add Movie
          </Link>
        </div>
      </div>

      {/* Sort controls: Year/Rating and Asc/Desc */}
      <div className="sort-controls">
        <span className="sort-label">Sort by:</span>
        <button
          className={`sort-btn ${sortBy === 'title' ? 'active' : ''}`}
          onClick={() => handleSortField('title')}
        >
          Title {sortBy === 'title' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
        </button>
        <button
          className={`sort-btn ${sortBy === 'year' ? 'active' : ''}`}
          onClick={() => handleSortField('year')}
        >
          Year {sortBy === 'year' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
        </button>
        <button
          className={`sort-btn ${sortBy === 'rating' ? 'active' : ''}`}
          onClick={() => handleSortField('rating')}
        >
          Rating {sortBy === 'rating' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
        </button>
      </div>

      {sortedAndFilteredMovies.length === 0 ? (
        <div className="empty-state">
          <h2>No movies found</h2>
          <p>Try adjusting your search.</p>
        </div>
      ) : (
        <div className="movies-grid">
          {sortedAndFilteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
export default MovieList;
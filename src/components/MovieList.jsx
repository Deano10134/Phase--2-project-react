import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';
import SearchBar from './SearchBar';

const API_BASE = 'http://localhost:5000';

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState(null); // 'title' | 'year' | 'rating'
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' | 'desc'

  useEffect(() => {
    fetch(`${API_BASE}/movies`)
      .then(response => response.json())
      .then(data => {
        setMovies(Array.isArray(data) ? data : []);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
        setMovies([]);
      });
  }, []);

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

  const getYear = (movie) => {
    const y =
      movie.year ??
      movie.release_year ??
      movie.releaseYear ??
      (movie.release_date ? new Date(movie.release_date).getFullYear() : null);

    const num = typeof y === 'string' ? parseInt(y, 10) : Number(y);
    return Number.isFinite(num) ? num : null;
  };

  const getSortedMovies = (list) => {
    if (!sortBy) return list;

    return [...list].sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case 'title':
          aValue = a.title?.toLowerCase().trim() || '';
          bValue = b.title?.toLowerCase().trim() || '';
          break;
        case 'year':
          aValue = getYear(a) ?? (sortOrder === 'asc' ? Infinity : -Infinity);
          bValue = getYear(b) ?? (sortOrder === 'asc' ? Infinity : -Infinity);
          break;
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
  };

  const defaultOrderFor = (field) => {
    return field === 'title' ? 'asc' : 'desc';
  };

  const handleSortField = (field) => {
    if (sortBy === field) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(field);
      setSortOrder(defaultOrderFor(field));
    }
  };

  const filteredMovies = movies.filter(movie =>
    movie.title?.toLowerCase().trim().includes(searchTerm.toLowerCase().trim())
  );

  const sortedAndFilteredMovies = getSortedMovies(filteredMovies);


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
          <span className="movie-count">{sortedAndFilteredMovies.length} movies</span>
          <Link to="/movies/new" className="btn btn-primary">
            + Add Movie
          </Link>
        </div>
      </div>

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
          {sortedAndFilteredMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MovieList;
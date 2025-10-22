import React from "react";

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search movies by title..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
        {searchTerm && (
          <button 
            className="clear-button"
            onClick={() => onSearchChange('')}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}


export default SearchBar;

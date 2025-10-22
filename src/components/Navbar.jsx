import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/movies" className="navbar-logo">
          🎬 Movie Database
        </NavLink>
        <ul className="nav-menu">
          <li className="nav-item">
            <NavLink 
              to="/movies" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              end
            >
              All Movies
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/movies/new" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              + Add Movie
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
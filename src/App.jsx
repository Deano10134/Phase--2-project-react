import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import MovieForm from './components/MovieForm';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            {/* Redirect root to /movies */}
            <Route path="/" element={<Navigate to="/movies" replace />} />
            
            {/* Index - Display all movies */}
            <Route path="/movies" element={<MovieList />} />
            
            {/* New - Display form to add new movie */}
            <Route path="/movies/new" element={<MovieForm isEdit={false} />} />
            
            {/* Show - Display single movie details */}
            <Route path="/movies/:id" element={<MovieDetails />} />
            
            {/* Edit - Display form to edit movie */}
            <Route path="/movies/:id/edit" element={<MovieForm isEdit={true} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
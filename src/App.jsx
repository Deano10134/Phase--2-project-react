import React from 'react';
import { RouterProvider, createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import MovieForm from './components/MovieForm';

// Root layout component with Navbar
function RootLayout() {
  return (
    <div className="App">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

// Create router with layout
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/movies" replace />
      },
      {
        path: "movies",
        element: <MovieList />
      },
      {
        path: "movies/new",
        element: <MovieForm isEdit={false} />
      },
      {
        path: "movies/:id/:slug",
        element: <MovieDetails />
      },
      {
        path: "movies/:id/:slug/edit",
        element: <MovieForm isEdit={true} />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
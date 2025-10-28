

## Project Overview

As part of Phase 2 of the Academy Xi's Software Engineering Transform course, this project is a React application that demonstrates CRUD operations with a mock backend.

It is a simple React application that allows a user to view a list of movies. The user can add a new movie to the list, edit existing movies, and delete movies from the list. For simplicity, the list is limted to just 10 from the movie TMDB API: 'https://www.themoviedb.org/'. The application uses React Router v7 for navigation between different pages. It also uses a mock backend using JSON Server to simulate CRUD operations.

(Full disclaimer: This is a learning project and is not intended for production use.)


![React](https://img.shields.io/badge/React-18.x-blue)
![React Router](https://img.shields.io/badge/React%20Router-v7-red)
![JSON Server](https://img.shields.io/badge/JSON%20Server-Mock%20API-green)


## Features
- 📋 **View Movies** - Browse your complete movie collection in a responsive grid
- ➕ **Add Movies** - Create new movie entries with title, year, rating, and poster
- ✏️ **Edit Movies** - Update existing movie information
- 🗑️ **Delete Movies** - Remove movies with confirmation dialog
- 🔍 **Search** - Filter movies by title in real-time
- 🔢 **Sort** - Organize by title, year, or rating (ascending/descending)
- 🧭 **Routing** - Seamless navigation using React Router v7

### Frontend
- **React 18.x** - UI library
- **React Router v7** - Client-side routing
- **JavaScript (ES6+)** - Programming language
- **CSS3** - Styling

### Backend
- **JSON Server** - Mock REST API for development


## 📦 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14.0.0 or higher)
- **npm** (v6.0.0 or higher) or **yarn**

Check your versions:
```bash
node --version
npm --version
```



## Installation
1. Clone the repository:
    ```bash
    git clone  <repository_url>
    ```
2. Navigate to the project directory:
    ```bash
    cd Phase-2-project-react
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```
4. Start the development server:
    ```bash
    npm start
    ```
## 🏃 Running the Application

You need to run **two servers** simultaneously:

### Terminal 1: JSON Server (Backend)
```bash
npx json-server --watch db.json --port 5000
```

**Expected output:**
```
JSON Server is running on http://localhost:5000
Resources:
  http://localhost:5000/movies
```

### Terminal 2: React Development Server (Frontend)
```bash
npm start
```

**Expected output:**
```
Compiled successfully!
You can now view the app in the browser.
  Local:            http://localhost:3000
```

### 🌐 Access the Application
- **React App:** [http://localhost:3000](http://localhost:3000)
- **JSON API:** [http://localhost:5000/movies](http://localhost:5000/movies)



## 🔌 API Endpoints

The JSON Server provides the following REST API endpoints:

| Method | Endpoint           | Description              |
|--------|-------------------|--------------------------|
| GET    | `/movies`         | Get all movies           |
| GET    | `/movies/:id`     | Get movie by ID          |
| POST   | `/movies`         | Create new movie         |
| PATCH  | `/movies/:id`     | Update movie             |
| DELETE | `/movies/:id`     | Delete movie             |


### Example Request
```javascript
// GET all movies
fetch('http://localhost:5000/movies')
  .then(res => res.json())
  .then(data => console.log(data));
```


## 📖 Usage Guide

### Adding a Movie
1. Click the **"+ Add Movie"** button
2. Fill in the form:
   - **Title** (required)
   - **Year** (required, 1900-2100)
   - **Rating** (required, 0-10)
   - **Poster URL** (optional)
3. Click **"Add Movie"** to save

### Editing a Movie
1. Navigate to a movie's detail page
2. Click the **"Edit"** button
3. Update the form fields
4. Click **"Update Movie"** to save changes

### Deleting a Movie
1. From any movie card, click **"Delete"**
2. Confirm the action in the dialog
3. Movie is removed from the collection

### Searching
- Use the search bar to filter movies by title
- Results update in real-time as you type

### Sorting
- Click column headers to sort:
  - **Title** (A-Z / Z-A)
  - **Year** (Newest / Oldest)
  - **Rating** (Highest / Lowest)
- Click again to reverse sort order


## 🤝 Contributing

Contributions are welcome! To contribute:

1. **Fork** the repository
2. **Create** a feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit** your changes
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push** to the branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open** a Pull Request

### Coding Standards
- Use functional components with hooks
- Follow existing code style
- Add comments for complex logic
- Test your changes thoroughly

The React app was created using Create React App. See the section below for more information.
_________________________________________________________________________________________________________



# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


## Project Overview

This is a simple React application that allows a user to view a list of movies. The user can add a new movie to the list, edit existing movies, and delete movies from the list. For simplicity, the list is limted to just 10 from the movie TMDB API:'https://www.themoviedb.org/'. The application uses React Router v7 for navigation between different pages. It also uses a mock backend using Json Server to simulate CRUD operations.
## Features
- View a list of movies
- Add a new movie
- Edit existing movies
- Delete movies
- Navigation using React Router v7
## Technologies Used
- React
- React Router v7
- JavaScript
- HTML/CSS
- Json Server (for mock backend)

## Installation
1. Clone the repository:
    ```bash
    git clone

    ``` 
    git clone


            <repository_url>
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
5. In a separate terminal, start the mock backend server using Json Server:
    ```bash
    npx json-server --watch db.json --port 5001
    ```
6. Open your browser and go to `http://localhost:5001/movies` to view the mock backend.

7. In a separate tab, in your browser go to `http://localhost:3000` to view the application.

## Usage
- To view the list of movies, navigate to the home page.
- To add a new movie, click on the "Add Movie" button and fill out the form.
- To edit an existing movie, click on the "Edit" button next to the movie you want to edit, make the changes in the form, and save.
- To delete a movie, click on the "Delete" button next to the movie you want to delete and confirm the action in the pop-up confirmation dialog.        
- Use the navigation links to switch between different pages of the application.
## Contributing
Contributions are welcome! If you would like to contribute to this project, please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with descriptive messages.
4. Push your changes to your forked repository

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

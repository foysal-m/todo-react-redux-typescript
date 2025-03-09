# Todo App

## Description

This is a **Todo App** that allows users to manage and track tasks. Users can add, complete, and delete tasks. This application uses React with Redux for state management, and the tasks are fetched from an API, stored, and updated in the backend.

## Features

- **Task Management**: Users can create, edit, and delete tasks.
- **Completion Tracking**: Users can mark tasks as complete or incomplete.
- **Real-time Updates**: Tasks are updated in real-time with the backend database.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/foysal-m/todo-react-redux-typescript.git
   ```

2. Navigate to the project directory and go to server folder and run `npm i` and then `npm start` which will start the express server on 4000.

3. You may need to have a MongoDb compass running on your local machine to be able connect to Database.

4. Then navigate to client folder and run `npm i` and then `npm start` which will start the react app on a random port (shown in the terminal)

5. Open your browser `http://localhost:3000`

## test

- To run the tests: `npm run test`
- To run the test with coverage report: `npm run coverage`
- To run cypress e2e test, `npm run cypress:open`, which will produce a headless browser where e2e is shown
- To run cypress test in terminal `npm run cypress:run`

## Technologies and Concepts

## Redux toolkit

- Redux Toolkit is used for managing global state in the application, including tasks and their completion statuses. It simplifies Redux usage by providing a standardized way to manage reducers, actions, and stores.

## Express and Mondodb with mongoose

- Express is used as a backend framework to handle requests for creating, updating, and deleting tasks. MongoDB with Mongoose handles the storage and retrieval of tasks in the database.

## Vite

- Vite is a fast build tool and development server used for bundling the application, offering hot module replacement (HMR) and a streamlined build process to ensure quick development and optimized performance.

## Vitest and React testing library

- Vitest: This testing framework is used for unit testing, ensuring that the components behave as expected.
- - React Testing Library: This library is used for testing React components, simulating user interactions, and asserting that the correct UI is rendered.

## Cypress

- Cypress is used for end-to-end (E2E) testing in this project

## Other Technologies Used

- **React**:Facilitates the creation of the board and streamlines app development with its component-based architecture
- **ReactDOM**: Handles DOM-specific methods for efficient rendering of React components.
- **React StrictMode**: Activates additional checks and warnings to highlight potential problems in the application.
- **TypeScript**: Provides strict type checking to enhance code quality and maintainability
- **React Testing Library**: Used for unit testing to ensure component functionality and reliability
- **SCSS**: Utilized for styling the board, offering advanced features and a more maintainable CSS structure

adding this just to test

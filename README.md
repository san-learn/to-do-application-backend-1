# To-Do Application Backend 1

A simple backend server for managing a to-do list using Node.js, Express.js, SQLite3, and JWT authentication. This project can also serve as a learning tool for frontend developers experimenting with APIs.

## Features

- User authentication (register and login).
- CRUD operations for managing to-do items.
- Simple and lightweight design.

## Target Users

Everyone.

## Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org)

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/san-learn/to-do-application-backend-1.git
   cd to-do-application-backend-1
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following keys:

   ```env
   PORT=5001
   JWT_SECRET=your_secret_key
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication

#### Register

- **Method**: `POST`
- **Endpoint**: `/api/authentication/register`
- **Request Body**:

  ```json
  {
    "username": "exampleUser",
    "password": "examplePassword"
  }
  ```

#### Login

- **Method**: `POST`
- **Endpoint**: `/api/authentication/login`
- **Request Body**:

  ```json
  {
    "username": "exampleUser",
    "password": "examplePassword"
  }
  ```

### To-Do Management

#### Get All Todos

- **Method**: `GET`
- **Endpoint**: `/api/todos`
- **Headers**:

  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```

#### Create Todo

- **Method**: `POST`
- **Endpoint**: `/api/todos`
- **Headers**:

  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```

- **Request Body**:

  ```json
  {
    "task": "New Task"
  }
  ```

#### Update Todo

- **Method**: `PUT`
- **Endpoint**: `/api/todos/:todoId`
- **Headers**:

  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```

- **Request Body**:

  ```json
  {
    "task": "Updated Task",
    "is_completed": 1
  }
  ```

#### Delete Todo

- **Method**: `DELETE`
- **Endpoint**: `/api/todos/:todoId`
- **Headers**:

  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```

## Project Structure

```bash
src/
├── server.js # Main server file
├── database.js # Database connection
├── middleware/
│   └── authentication-middleware.js # Middleware for authentication
└── routes/
    ├── authentication-routes.js # API routes for authentication
    └── todo-routes.js # API routes for to-do management
```

## Dependencies

- [Express.js](https://expressjs.com)
- [bcrypt.js](https://www.npmjs.com/package/bcryptjs)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

## Testing

No automated tests are available for this project.

## License

This project does not use any license.

## Contribution

Contributions are currently not accepted.

## Contact

If you have any questions or feedback, feel free to reach out:

- **Email**: [sanlearn3@gmail.com](mailto:sanlearn3@gmail.com)
- **LinkedIn**: [Ikhsan Farizki](https://www.linkedin.com/in/ikhsan-farizki/)
- **GitHub**: [san-learn](https://github.com/san-learn)
- **Instagram**: [ikhsan.farizki](https://www.instagram.com/ikhsan.farizki/)

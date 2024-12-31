import express from 'express';

import { database } from '../database.js';

const routes = express.Router();

routes.get('/', (request, response) => {
  try {
    const selectTodosStatement = database.prepare(
      'SELECT * FROM todos WHERE user_id = ?'
    );

    const selectTodosResult = selectTodosStatement.all(request.userId);

    console.log(
      `HTTP GET | /api/todos at ${new Date().toUTCString()}: Successfully fetched ${
        selectTodosResult.length
      } todos for user with id ${request.userId}.`
    );

    response.json({ status: 'success', data: { todos: selectTodosResult } });
  } catch (error) {
    console.error(`
      HTTP GET | /api/todos at ${new Date().toUTCString()}: ${error.message}
    `);

    response
      .status(503)
      .json({ status: 'error', message: 'Something went wrong.' });
  }
});

routes.post('/', (request, response) => {});

routes.put('/:todo-id', (request, response) => {});

routes.delete('/:todo-id', (request, response) => {});

export { routes as todoRoutes };

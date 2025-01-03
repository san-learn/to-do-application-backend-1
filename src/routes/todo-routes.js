import express from 'express';

import { database } from '../database.js';

const routes = express.Router();

routes.get('/', (request, response) => {
  const { userId } = request;
  try {
    const selectTodosStatement = database.prepare(
      'SELECT * FROM todos WHERE user_id = ?'
    );

    const selectTodosResult = selectTodosStatement.all(userId);

    console.log(
      'HTTP GET | /api/todos at ' +
        new Date().toUTCString() +
        ': Successfully fetched ' +
        selectTodosResult.length +
        ' todos for user with id ' +
        userId +
        '.'
    );

    response.json({ status: 'success', data: { todos: selectTodosResult } });
  } catch (error) {
    console.error(
      'HTTP GET | /api/todos at ' +
        new Date().toUTCString() +
        ': ' +
        error.message
    );

    response
      .status(503)
      .json({ status: 'error', message: 'Something went wrong.' });
  }
});

routes.post('/', (request, response) => {
  const { userId } = request;
  const { task } = request.body;

  try {
    const insertTodoStatement = database.prepare(
      'INSERT INTO todos (user_id, task) VALUES (?, ?)'
    );

    const insertTodoResult = insertTodoStatement.run(userId, task);

    console.log(
      'HTTP POST | /api/todos at ' +
        new Date().toUTCString() +
        ': Successfully inserted todo with id ' +
        insertTodoResult.lastInsertRowid +
        ' for user with id ' +
        userId +
        '.'
    );

    response.json({
      status: 'success',
      data: {
        todo: {
          id: insertTodoResult.lastInsertRowid,
          user_id: userId,
          task,
          is_completed: 0,
        },
      },
    });
  } catch (error) {
    console.error(
      `HTTP POST | /api/todos at ${new Date().toUTCString()}: ${error.message}`
    );

    response
      .status(503)
      .json({ status: 'error', message: 'Something went wrong.' });
  }
});

routes.put('/:todoId', (request, response) => {
  const { userId } = request;
  const { todoId } = request.params;
  const { task, is_completed } = request.body;

  try {
    const updateTodoStatement = database.prepare(
      'UPDATE todos SET task = ?, is_completed = ? WHERE id = ?'
    );

    updateTodoStatement.run(task, is_completed, todoId);

    console.log(
      'HTTP PUT | /api/todos at ' +
        new Date().toUTCString() +
        ': Successfully updated todo with id ' +
        todoId +
        ' for user with id ' +
        userId +
        '.'
    );

    response.json({
      status: 'success',
      data: {
        todo: {
          id: todoId,
          user_id: userId,
          task: task,
          is_completed: is_completed,
        },
      },
    });
  } catch (error) {
    console.error(
      `HTTP PUT | /api/todos at ${new Date().toUTCString()}: ${error.message}`
    );

    response
      .status(503)
      .json({ status: 'error', message: 'Something went wrong.' });
  }
});

routes.delete('/:todoId', (request, response) => {
  const { userId } = request;
  const { todoId } = request.params;

  try {
    const deleteTodoStatement = database.prepare(
      'DELETE FROM todos WHERE id = ?'
    );

    deleteTodoStatement.run(todoId);

    console.log(
      'HTTP DELETE | /api/todos at ' +
        new Date().toUTCString() +
        ': Successfully deleted todo with id ' +
        todoId +
        ' for user with id ' +
        userId +
        '.'
    );

    response.json({ status: 'success' });
  } catch (error) {
    console.error(
      `HTTP DELETE | /api/todos at ${new Date().toUTCString()}: ${
        error.message
      }`
    );

    response
      .status(503)
      .json({ status: 'error', message: 'Something went wrong.' });
  }
});

export { routes as todoRoutes };

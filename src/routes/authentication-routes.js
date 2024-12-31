import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { database } from '../database.js';

const routes = express.Router();

routes.post('/register', (request, response) => {
  const { username, password } = request.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    const insertUserStatement = database.prepare(`
      INSERT INTO users (username, password)
      VALUES (?, ?)
    `);

    const insertUserResult = insertUserStatement.run(username, hashedPassword);

    const insertTodoStatement = database.prepare(`
      INSERT INTO todos (user_id, task)
      VALUES (?, ?)  
    `);

    insertTodoStatement.run(
      insertUserResult.lastInsertRowid,
      `Hello ${username} 🙂, don't forget to add your first todo!`
    );

    const token = jwt.sign(
      { id: insertUserResult.lastInsertRowid },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    console.log(
      `HTTP POST | /api/authentication/register at ${new Date().toUTCString()}: User with Id ${
        insertUserResult.lastInsertRowid
      } has been registered.`
    );

    response.json({ status: 'success', data: { token: token } });
  } catch (error) {
    console.error(
      `HTTP POST | /api/authentication/register at ${new Date().toUTCString()}: ${
        error.message
      }`
    );

    response
      .status(503)
      .json({ status: 'error', message: 'Something went wrong.' });
  }
});

routes.post('/login', (request, response) => {
  const { username, password } = request.body;

  try {
    const selectUserStatement = database.prepare(
      'SELECT * FROM users WHERE username = ?'
    );

    const selectUserResult = selectUserStatement.get(username);

    if (!selectUserResult) {
      console.log(
        `HTTP POST | /api/authentication/login at ${new Date().toUTCString()}: User with username ${username} not found.`
      );

      return response.status(404).json({
        status: 'fail',
        message: 'Invalid login credentials. Please try again.',
      });
    }

    const isPasswordValid = bcrypt.compareSync(
      password,
      selectUserResult.password
    );

    if (!isPasswordValid) {
      console.log(
        `HTTP POST | /api/authentication/login at ${new Date().toUTCString()}: Password for user with username ${username} is incorrect.`
      );

      return response.status(401).json({
        status: 'fail',
        message: 'Invalid login credentials. Please try again.',
      });
    }

    const token = jwt.sign(
      { id: selectUserResult.id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    console.log(
      `HTTP POST | /api/authentication/login at ${new Date().toUTCString()}: User with username ${username} has logged in.`
    );

    response.json({ status: 'success', data: { token: token } });
  } catch (error) {
    console.error(
      `HTTP POST | /api/authentication/login at ${new Date().toUTCString()}: ${
        error.message
      }`
    );

    response
      .status(503)
      .json({ status: 'error', message: 'Something went wrong.' });
  }
});

export { routes as authenticationRoutes };

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

    response.json({ token: token });
  } catch (error) {
    console.error(error.message);

    response.sendStatus(503);
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
      return response
        .status(404)
        .send({ message: 'Invalid login credentials. Please try again.' });
    }

    const isPasswordValid = bcrypt.compareSync(
      password,
      selectUserResult.password
    );

    if (!isPasswordValid) {
      return response
        .status(401)
        .send({ message: 'Invalid login credentials. Please try again.' });
    }

    const token = jwt.sign(
      { id: selectUserResult.id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    response.json({ token: token });
  } catch (error) {
    console.error(error.message);

    response.sendStatus(503);
  }
});

export { routes as authenticationRoutes };

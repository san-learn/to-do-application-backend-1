import express from 'express';

import { database } from '../database.js';

const todoRoutes = express.Router();

todoRoutes.get('/', (request, response) => {});

todoRoutes.post('/', (request, response) => {});

todoRoutes.put('/:todo-id', (request, response) => {});

todoRoutes.delete('/:todo-id', (request, response) => {});

export { todoRoutes };

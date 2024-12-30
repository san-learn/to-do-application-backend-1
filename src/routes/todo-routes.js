import express from 'express';

import { database } from '../database.js';

const routes = express.Router();

routes.get('/', (request, response) => {});

routes.post('/', (request, response) => {});

routes.put('/:todo-id', (request, response) => {});

routes.delete('/:todo-id', (request, response) => {});

export { routes as todoRoutes };

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import { authenticationRoutes } from './routes/authentication-routes.js';
import { todoRoutes } from './routes/todo-routes.js';

import { authenticationMiddleware } from './middleware/authentication-middleware.js';

const application = express();

const PORT = process.env.PORT || 5001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

application.use(express.json());
application.use(express.static(path.join(__dirname, '../public')));

application.use('/api/authentication', authenticationRoutes);
application.use('/api/todos', authenticationMiddleware, todoRoutes);

application.listen(PORT, () => {
  console.log(
    'Server has started at ' + new Date().toUTCString() + ' on port: ' + PORT
  );
});

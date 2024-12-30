import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { database } from '../database.js';

const authenticationRoutes = express.Router();

authenticationRoutes.post('/register', (request, response) => {});

authenticationRoutes.post('/login', (request, response) => {});

export { authenticationRoutes };

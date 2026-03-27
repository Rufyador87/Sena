import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export const hashPassword = async (plainPassword) => bcrypt.hash(plainPassword, 10);
export const comparePassword = async (plainPassword, passwordHash) =>
  bcrypt.compare(plainPassword, passwordHash);

export const signToken = (payload) =>
  jwt.sign(payload, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn
  });

export const verifyToken = (token) => jwt.verify(token, env.jwtSecret);

import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: Number(process.env.PORT || 4000),
  dbHost: process.env.DB_HOST || 'localhost',
  dbPort: Number(process.env.DB_PORT || 5432),
  dbName: process.env.DB_NAME || 'optilogistics',
  dbUser: process.env.DB_USER || 'postgres',
  dbPassword: process.env.DB_PASSWORD || 'postgres',
  jwtSecret: process.env.JWT_SECRET || 'change_this_secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '8h'
};

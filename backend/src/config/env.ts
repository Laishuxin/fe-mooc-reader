import { join } from 'path';
export const IS_DEV = process.env.NODE_ENV != 'production';
export const SALT_ROUNDS = '';

export const JWT = {
  secret: 'mooc-reader-jwt-secret',
  expiresIn: '24h',
};

export const IMG_STORE_DIR = join(__dirname, '..', '..', 'public/images');
export const API_PREFIX = '/api';
export const PORT = 3000;
export const HOST = 'http://localhost:3000';
export const IMAGE_BASE_URL = `${HOST}/public/images/`;

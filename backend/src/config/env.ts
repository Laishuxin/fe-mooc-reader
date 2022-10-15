export const IS_DEV = process.env.NODE_ENV != 'production';
export const SALT_ROUNDS = '';

export const JWT = {
  secret: 'mooc-reader-jwt-secret',
  expiresIn: '24h',
};

export const CONFIG = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  RATE_LIMIT: parseInt(process.env.RATE_LIMIT || '200'),
  ENABLE_COMPRESSION: process.env.ENABLE_COMPRESSION !== 'false',
  ENABLE_LOGGING: process.env.ENABLE_LOGGING !== 'false',
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS?.split(',') || [
    'http://localhost:3000',
    'https://kaihi.vercel.app'
  ]
};

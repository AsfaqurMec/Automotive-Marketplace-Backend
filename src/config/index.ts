import dotenv from 'dotenv';
dotenv.config();

export const configData = {
  PORT: process.env.PORT || 8080,
  CORS_ORIGINS: process.env.CORS_ORIGINS?.split(',') || [],
  VALID_API_KEYS: new Set(process.env.VALID_API_KEYS?.split(',') || []),
};



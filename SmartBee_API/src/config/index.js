require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 3000,
  jwt: {
    secret: process.env.JWT_SECRET || 'dev-secret-change-in-production',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
  },
  ai: {
    apiKey: process.env.AI_API_KEY,
  },
  databaseUrl: process.env.DATABASE_URL,
};

module.exports = config;

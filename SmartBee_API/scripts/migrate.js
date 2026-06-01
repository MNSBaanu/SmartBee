/**
 * Placeholder migration script.
 * Add SQL migrations under ../supabase/migrations when PostgreSQL is configured.
 */
const { isSupabaseConfigured } = require('../src/config/database');

console.log('SmartBee API migrations');
if (isSupabaseConfigured()) {
  console.log('Supabase is configured. Apply migrations via Supabase CLI: supabase db push');
} else {
  console.log('Using in-memory store. Set SUPABASE_URL and SUPABASE_KEY for persistent storage.');
}
console.log('No migrations to run for in-memory mode.');

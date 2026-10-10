const { Pool } = require('pg');
const config = require('./index');

const isLocal = !config.databaseUrl || /localhost|127\.0\.0\.1/.test(config.databaseUrl);

const pool = new Pool({
  connectionString: config.databaseUrl,
  ssl: isLocal ? undefined : { rejectUnauthorized: false },
});

module.exports = { pool, query: (text, params) => pool.query(text, params) };

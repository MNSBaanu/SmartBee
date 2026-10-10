const fs = require('fs');
const path = require('path');
const { pool } = require('../src/config/database');

(async () => {
  const sql = fs.readFileSync(path.join(__dirname, '../db/schema.sql'), 'utf8');
  await pool.query(sql);
  console.log('Migration complete');
  await pool.end();
})().catch((err) => {
  console.error(err);
  process.exit(1);
});

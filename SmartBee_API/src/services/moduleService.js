const AppError = require('../utils/AppError');
const { query } = require('../config/database');

const COLS = 'id, code, name, credits, semester, instructor';
const FIELDS = ['code', 'name', 'credits', 'semester', 'instructor'];

const list = async (userId) =>
  (await query(`SELECT ${COLS} FROM modules WHERE user_id = $1 ORDER BY id`, [userId])).rows;

const getById = async (id, userId) => {
  const { rows } = await query(`SELECT ${COLS} FROM modules WHERE id = $1 AND user_id = $2`, [id, userId]);
  if (!rows[0]) throw new AppError('Module not found', 404);
  return rows[0];
};

const create = async (userId, data) => {
  const { rows } = await query(
    `INSERT INTO modules (user_id, ${FIELDS.join(', ')}) VALUES ($1, $2, $3, $4, $5, $6) RETURNING ${COLS}`,
    [userId, ...FIELDS.map((f) => data[f])]
  );
  return rows[0];
};

const update = async (id, userId, data) => {
  const merged = { ...(await getById(id, userId)), ...data };
  const { rows } = await query(
    `UPDATE modules SET ${FIELDS.map((f, i) => `${f} = $${i + 3}`).join(', ')}
     WHERE id = $1 AND user_id = $2 RETURNING ${COLS}`,
    [id, userId, ...FIELDS.map((f) => merged[f])]
  );
  return rows[0];
};

const remove = async (id, userId) => {
  const { rowCount } = await query('DELETE FROM modules WHERE id = $1 AND user_id = $2', [id, userId]);
  if (!rowCount) throw new AppError('Module not found', 404);
};

module.exports = { list, getById, create, update, remove };

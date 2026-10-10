const AppError = require('../utils/AppError');
const { query } = require('../config/database');

const COLS = 'id, title, description, due_date AS "dueDate", priority, category, completed';
const FIELDS = ['title', 'description', 'dueDate', 'priority', 'category', 'completed'];
const COLUMN = { dueDate: 'due_date' };

const list = async (userId) =>
  (await query(`SELECT ${COLS} FROM tasks WHERE user_id = $1 ORDER BY id`, [userId])).rows;

const getById = async (id, userId) => {
  const { rows } = await query(`SELECT ${COLS} FROM tasks WHERE id = $1 AND user_id = $2`, [id, userId]);
  if (!rows[0]) throw new AppError('Task not found', 404);
  return rows[0];
};

const create = async (userId, data) => {
  const { rows } = await query(
    `INSERT INTO tasks (user_id, title, description, due_date, priority, category, completed)
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING ${COLS}`,
    [userId, ...FIELDS.map((f) => data[f])]
  );
  return rows[0];
};

const update = async (id, userId, data) => {
  const merged = { ...(await getById(id, userId)), ...data };
  const { rows } = await query(
    `UPDATE tasks SET ${FIELDS.map((f, i) => `${COLUMN[f] || f} = $${i + 3}`).join(', ')}
     WHERE id = $1 AND user_id = $2 RETURNING ${COLS}`,
    [id, userId, ...FIELDS.map((f) => merged[f])]
  );
  return rows[0];
};

const remove = async (id, userId) => {
  const { rowCount } = await query('DELETE FROM tasks WHERE id = $1 AND user_id = $2', [id, userId]);
  if (!rowCount) throw new AppError('Task not found', 404);
};

module.exports = { list, getById, create, update, remove };

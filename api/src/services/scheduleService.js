const AppError = require('../utils/AppError');
const { query } = require('../config/database');

const COLS = 'id, day, title, code, start_time AS "start", end_time AS "end", room, type';
const FIELDS = ['day', 'title', 'code', 'start', 'end', 'room', 'type'];
const COLUMN = { start: 'start_time', end: 'end_time' };

const list = async (userId) =>
  (await query(`SELECT ${COLS} FROM schedule_entries WHERE user_id = $1 ORDER BY id`, [userId])).rows;

const getById = async (id, userId) => {
  const { rows } = await query(`SELECT ${COLS} FROM schedule_entries WHERE id = $1 AND user_id = $2`, [id, userId]);
  if (!rows[0]) throw new AppError('Schedule entry not found', 404);
  return rows[0];
};

const create = async (userId, data) => {
  const { rows } = await query(
    `INSERT INTO schedule_entries (user_id, day, title, code, start_time, end_time, room, type)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING ${COLS}`,
    [userId, ...FIELDS.map((f) => data[f])]
  );
  return rows[0];
};

const update = async (id, userId, data) => {
  const merged = { ...(await getById(id, userId)), ...data };
  const { rows } = await query(
    `UPDATE schedule_entries SET ${FIELDS.map((f, i) => `${COLUMN[f] || f} = $${i + 3}`).join(', ')}
     WHERE id = $1 AND user_id = $2 RETURNING ${COLS}`,
    [id, userId, ...FIELDS.map((f) => merged[f])]
  );
  return rows[0];
};

const remove = async (id, userId) => {
  const { rowCount } = await query('DELETE FROM schedule_entries WHERE id = $1 AND user_id = $2', [id, userId]);
  if (!rowCount) throw new AppError('Schedule entry not found', 404);
};

module.exports = { list, getById, create, update, remove };

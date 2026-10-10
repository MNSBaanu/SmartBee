const AppError = require('../utils/AppError');
const { query } = require('../config/database');

const COLS = 'id, module_id AS "moduleId", date, status';

const list = async (userId, { moduleId, from, to } = {}) => {
  const params = [userId];
  let sql = `SELECT ${COLS} FROM attendance WHERE user_id = $1`;
  if (moduleId) sql += ` AND module_id = $${params.push(moduleId)}`;
  if (from) sql += ` AND date >= $${params.push(from)}`;
  if (to) sql += ` AND date <= $${params.push(to)}`;
  return (await query(`${sql} ORDER BY id`, params)).rows;
};

const record = async (userId, { moduleId, date, status }) => {
  const mod = await query('SELECT 1 FROM modules WHERE id = $1 AND user_id = $2', [moduleId, userId]);
  if (!mod.rows[0]) throw new AppError('Module not found', 404);

  const { rows } = await query(
    `INSERT INTO attendance (user_id, module_id, date, status) VALUES ($1, $2, $3, $4)
     ON CONFLICT (user_id, module_id, date) DO UPDATE SET status = EXCLUDED.status
     RETURNING ${COLS}`,
    [userId, moduleId, date, status]
  );
  return rows[0];
};

const stats = async (userId) => {
  const records = await list(userId);
  const total = records.length;
  const byStatus = records.reduce((acc, r) => {
    acc[r.status] = (acc[r.status] || 0) + 1;
    return acc;
  }, {});

  const modules = (await query('SELECT id, code FROM modules WHERE user_id = $1', [userId])).rows;
  const moduleIds = [...new Set(records.map((r) => r.moduleId))];
  const byModule = moduleIds.map((moduleId) => {
    const modRecords = records.filter((r) => r.moduleId === moduleId);
    const present = modRecords.filter((r) => r.status === 'present').length;
    return {
      moduleId,
      moduleCode: modules.find((m) => m.id === moduleId)?.code,
      total: modRecords.length,
      present,
      rate: modRecords.length ? Math.round((present / modRecords.length) * 100) : 0,
    };
  });

  return { total, byStatus, byModule };
};

module.exports = { list, record, stats };

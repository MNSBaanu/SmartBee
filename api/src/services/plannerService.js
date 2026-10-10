const { query } = require('../config/database');
const taskService = require('./taskService');

const todayString = () => new Date().toISOString().slice(0, 10);

const COLS = 'id, date, items, generated, created_at AS "createdAt"';

const getDaily = async (userId, date = todayString()) => {
  const { rows } = await query(`SELECT ${COLS} FROM daily_plans WHERE user_id = $1 AND date = $2`, [userId, date]);
  return rows[0] || { date, items: [], generated: false };
};

const generate = async (userId, { date, focusAreas }) => {
  const tasks = (await taskService.list(userId)).filter((t) => !t.completed);
  const pending = tasks.slice(0, 5).map((t) => ({
    time: '09:00',
    title: t.title,
    type: 'task',
    taskId: t.id,
  }));

  const focus = (focusAreas.length ? focusAreas : ['Study', 'Review notes']).map((area, i) => ({
    time: `${10 + i}:00`,
    title: area,
    type: 'focus',
  }));

  const items = [
    { time: '08:00', title: 'Morning review', type: 'routine' },
    ...pending,
    ...focus,
    { time: '18:00', title: 'Wrap up & plan tomorrow', type: 'routine' },
  ];

  const { rows } = await query(
    `INSERT INTO daily_plans (user_id, date, items, generated) VALUES ($1, $2, $3, true)
     ON CONFLICT (user_id, date) DO UPDATE SET items = EXCLUDED.items, created_at = now()
     RETURNING ${COLS}`,
    [userId, date, JSON.stringify(items)]
  );
  return rows[0];
};

module.exports = { getDaily, generate };

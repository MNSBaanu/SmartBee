const { query } = require('../config/database');

const COLS = 'id, role, content, created_at AS "createdAt"';

const buildStubReply = (message) => {
  const lower = message.toLowerCase();
  if (lower.includes('deadline') || lower.includes('task')) {
    return 'Check your Tasks tab for upcoming deadlines. Want help prioritizing?';
  }
  if (lower.includes('attendance')) {
    return 'You can view attendance stats under the Attendance section. Keep showing up!';
  }
  if (lower.includes('module') || lower.includes('course')) {
    return 'Your modules are listed in Module Management. Need help organizing your schedule?';
  }
  return "I'm your SmartBee virtual friend! Ask me about tasks, modules, attendance, or your daily plan.";
};

const insert = async (userId, role, content) =>
  (
    await query(
      `INSERT INTO chat_messages (user_id, role, content) VALUES ($1, $2, $3) RETURNING ${COLS}`,
      [userId, role, content]
    )
  ).rows[0];

const sendMessage = async (userId, message) => {
  const reply = buildStubReply(message);
  const entry = await insert(userId, 'user', message);
  const assistantEntry = await insert(userId, 'assistant', reply);
  return { message: entry, reply: assistantEntry };
};

const getHistory = async (userId, limit = 50) =>
  (
    await query(
      `SELECT * FROM (SELECT ${COLS} FROM chat_messages WHERE user_id = $1 ORDER BY id DESC LIMIT $2) t ORDER BY id`,
      [userId, limit]
    )
  ).rows;

module.exports = { sendMessage, getHistory };

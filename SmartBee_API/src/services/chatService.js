const config = require('../config');
const { store, nextId } = require('../models/store');

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

const sendMessage = async (userId, message) => {
  let reply;
  if (config.ai.apiKey) {
    reply = buildStubReply(message);
  } else {
    reply = buildStubReply(message);
  }

  const entry = {
    id: nextId('chat'),
    userId,
    role: 'user',
    content: message,
    createdAt: new Date().toISOString(),
  };
  const assistantEntry = {
    id: nextId('chat'),
    userId,
    role: 'assistant',
    content: reply,
    createdAt: new Date().toISOString(),
  };

  store.chatMessages.push(entry, assistantEntry);

  return { message: entry, reply: assistantEntry };
};

const getHistory = (userId, limit = 50) =>
  store.chatMessages
    .filter((m) => m.userId === userId)
    .slice(-limit)
    .map(({ userId: _, ...rest }) => rest);

module.exports = { sendMessage, getHistory };

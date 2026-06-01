const { store, nextId } = require('../models/store');
const taskService = require('./taskService');

const todayString = () => new Date().toISOString().slice(0, 10);

const getDaily = (userId, date = todayString()) => {
  const plan = store.dailyPlans.find((p) => p.userId === userId && p.date === date);
  if (plan) {
    const { userId: _, ...rest } = plan;
    return rest;
  }
  return { date, items: [], generated: false };
};

const generate = (userId, { date, focusAreas }) => {
  const tasks = taskService.list(userId).filter((t) => !t.completed);
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

  const existingIndex = store.dailyPlans.findIndex((p) => p.userId === userId && p.date === date);
  const plan = {
    id: existingIndex >= 0 ? store.dailyPlans[existingIndex].id : nextId('plan'),
    userId,
    date,
    items,
    generated: true,
    createdAt: new Date().toISOString(),
  };

  if (existingIndex >= 0) {
    store.dailyPlans[existingIndex] = plan;
  } else {
    store.dailyPlans.push(plan);
  }

  const { userId: _, ...rest } = plan;
  return rest;
};

module.exports = { getDaily, generate };

const AppError = require('../utils/AppError');
const { store, nextId } = require('../models/store');

const assertOwner = (task, userId) => {
  if (task.userId !== userId) {
    throw new AppError('Task not found', 404);
  }
};

const list = (userId) =>
  store.tasks.filter((t) => t.userId === userId).map(({ userId: _, ...rest }) => rest);

const getById = (id, userId) => {
  const task = store.tasks.find((t) => t.id === id);
  if (!task) throw new AppError('Task not found', 404);
  assertOwner(task, userId);
  const { userId: _, ...rest } = task;
  return rest;
};

const create = (userId, data) => {
  const task = { id: nextId('task'), userId, ...data };
  store.tasks.push(task);
  const { userId: _, ...rest } = task;
  return rest;
};

const update = (id, userId, data) => {
  const index = store.tasks.findIndex((t) => t.id === id);
  if (index === -1) throw new AppError('Task not found', 404);
  assertOwner(store.tasks[index], userId);
  store.tasks[index] = { ...store.tasks[index], ...data };
  const { userId: _, ...rest } = store.tasks[index];
  return rest;
};

const remove = (id, userId) => {
  const index = store.tasks.findIndex((t) => t.id === id);
  if (index === -1) throw new AppError('Task not found', 404);
  assertOwner(store.tasks[index], userId);
  store.tasks.splice(index, 1);
};

module.exports = { list, getById, create, update, remove };

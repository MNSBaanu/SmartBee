const AppError = require('../utils/AppError');
const { store, nextId } = require('../models/store');

const assertOwner = (module, userId) => {
  if (module.userId !== userId) {
    throw new AppError('Module not found', 404);
  }
};

const list = (userId) =>
  store.modules.filter((m) => m.userId === userId).map(({ userId: _, ...rest }) => rest);

const getById = (id, userId) => {
  const mod = store.modules.find((m) => m.id === id);
  if (!mod) throw new AppError('Module not found', 404);
  assertOwner(mod, userId);
  const { userId: _, ...rest } = mod;
  return rest;
};

const create = (userId, data) => {
  const mod = { id: nextId('module'), userId, ...data };
  store.modules.push(mod);
  const { userId: _, ...rest } = mod;
  return rest;
};

const update = (id, userId, data) => {
  const index = store.modules.findIndex((m) => m.id === id);
  if (index === -1) throw new AppError('Module not found', 404);
  assertOwner(store.modules[index], userId);
  store.modules[index] = { ...store.modules[index], ...data };
  const { userId: _, ...rest } = store.modules[index];
  return rest;
};

const remove = (id, userId) => {
  const index = store.modules.findIndex((m) => m.id === id);
  if (index === -1) throw new AppError('Module not found', 404);
  assertOwner(store.modules[index], userId);
  store.modules.splice(index, 1);
};

module.exports = { list, getById, create, update, remove };

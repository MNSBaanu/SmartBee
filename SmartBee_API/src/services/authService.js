const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');
const AppError = require('../utils/AppError');
const { store, nextId } = require('../models/store');

const sanitizeUser = (user) => ({
  id: user.id,
  email: user.email,
  name: user.name,
  createdAt: user.createdAt,
});

const createToken = (userId) =>
  jwt.sign({ sub: userId }, config.jwt.secret, { expiresIn: config.jwt.expiresIn });

const register = async ({ email, password, name }) => {
  if (store.users.some((u) => u.email === email)) {
    throw new AppError('Email already registered', 409);
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    id: nextId('user'),
    email,
    name,
    passwordHash,
    createdAt: new Date().toISOString(),
  };
  store.users.push(user);

  const token = createToken(user.id);
  store.sessions.add(token);

  return { user: sanitizeUser(user), token };
};

const login = async ({ email, password }) => {
  const user = store.users.find((u) => u.email === email);
  if (!user) {
    throw new AppError('Invalid email or password', 401);
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    throw new AppError('Invalid email or password', 401);
  }

  const token = createToken(user.id);
  store.sessions.add(token);

  return { user: sanitizeUser(user), token };
};

const logout = (token) => {
  store.sessions.delete(token);
};

const getMe = (userId) => {
  const user = store.users.find((u) => u.id === userId);
  if (!user) {
    throw new AppError('User not found', 404);
  }
  return sanitizeUser(user);
};

module.exports = { register, login, logout, getMe };

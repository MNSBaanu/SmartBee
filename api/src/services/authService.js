const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');
const AppError = require('../utils/AppError');
const { query } = require('../config/database');

const USER_COLS = 'id, email, name, created_at AS "createdAt"';

const createToken = (userId) =>
  jwt.sign({ sub: userId }, config.jwt.secret, { expiresIn: config.jwt.expiresIn });

const register = async ({ email, password, name }) => {
  const passwordHash = await bcrypt.hash(password, 10);
  const { rows } = await query(
    `INSERT INTO users (email, name, password_hash) VALUES ($1, $2, $3)
     ON CONFLICT (email) DO NOTHING RETURNING ${USER_COLS}`,
    [email, name, passwordHash]
  );
  if (!rows[0]) throw new AppError('Email already registered', 409);
  return { user: rows[0], token: createToken(rows[0].id) };
};

const login = async ({ email, password }) => {
  const { rows } = await query(
    `SELECT ${USER_COLS}, password_hash AS "passwordHash" FROM users WHERE email = $1`,
    [email]
  );
  const user = rows[0];
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    throw new AppError('Invalid email or password', 401);
  }
  const { passwordHash: _, ...safe } = user;
  return { user: safe, token: createToken(user.id) };
};

const logout = () => {};

const getMe = async (userId) => {
  const { rows } = await query(`SELECT ${USER_COLS} FROM users WHERE id = $1`, [userId]);
  if (!rows[0]) throw new AppError('User not found', 404);
  return rows[0];
};

module.exports = { register, login, logout, getMe };

const jwt = require('jsonwebtoken');
const config = require('../config');
const AppError = require('../utils/AppError');
const { query } = require('../config/database');

const authenticate = async (req, _res, next) => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return next(new AppError('Authentication required', 401));
  }

  const token = header.slice(7);
  let payload;
  try {
    payload = jwt.verify(token, config.jwt.secret);
  } catch {
    return next(new AppError('Invalid token', 401));
  }

  try {
    const { rows } = await query('SELECT id, email, name FROM users WHERE id = $1', [payload.sub]);
    if (!rows[0]) return next(new AppError('User not found', 401));
    req.user = rows[0];
    req.token = token;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { authenticate };

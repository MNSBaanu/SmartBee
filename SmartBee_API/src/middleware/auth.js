const jwt = require('jsonwebtoken');
const config = require('../config');
const AppError = require('../utils/AppError');
const { store } = require('../models/store');

const authenticate = (req, _res, next) => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return next(new AppError('Authentication required', 401));
  }

  const token = header.slice(7);
  if (!store.sessions.has(token)) {
    return next(new AppError('Session expired or invalid', 401));
  }

  try {
    const payload = jwt.verify(token, config.jwt.secret);
    const user = store.users.find((u) => u.id === payload.sub);
    if (!user) {
      return next(new AppError('User not found', 401));
    }
    req.user = { id: user.id, email: user.email, name: user.name };
    req.token = token;
    next();
  } catch {
    next(new AppError('Invalid token', 401));
  }
};

module.exports = { authenticate };

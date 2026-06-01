const authService = require('../services/authService');
const asyncHandler = require('../utils/asyncHandler');

const register = asyncHandler(async (req, res) => {
  const result = await authService.register(req.body);
  res.status(201).json({ success: true, data: result });
});

const login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body);
  res.json({ success: true, data: result });
});

const logout = asyncHandler(async (req, res) => {
  authService.logout(req.token);
  res.json({ success: true, message: 'Logged out successfully' });
});

const me = asyncHandler(async (req, res) => {
  const user = authService.getMe(req.user.id);
  res.json({ success: true, data: user });
});

module.exports = { register, login, logout, me };

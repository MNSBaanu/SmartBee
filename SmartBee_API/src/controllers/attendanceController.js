const attendanceService = require('../services/attendanceService');
const asyncHandler = require('../utils/asyncHandler');

const list = asyncHandler(async (req, res) => {
  const data = attendanceService.list(req.user.id, req.query);
  res.json({ success: true, data });
});

const record = asyncHandler(async (req, res) => {
  const data = attendanceService.record(req.user.id, req.body);
  res.status(201).json({ success: true, data });
});

const stats = asyncHandler(async (req, res) => {
  const data = attendanceService.stats(req.user.id);
  res.json({ success: true, data });
});

module.exports = { list, record, stats };

const plannerService = require('../services/plannerService');
const asyncHandler = require('../utils/asyncHandler');

const daily = asyncHandler(async (req, res) => {
  const data = await plannerService.getDaily(req.user.id, req.query.date);
  res.json({ success: true, data });
});

const generate = asyncHandler(async (req, res) => {
  const data = await plannerService.generate(req.user.id, req.body);
  res.json({ success: true, data });
});

module.exports = { daily, generate };

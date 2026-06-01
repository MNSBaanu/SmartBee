const chatService = require('../services/chatService');
const asyncHandler = require('../utils/asyncHandler');

const send = asyncHandler(async (req, res) => {
  const data = await chatService.sendMessage(req.user.id, req.body.message);
  res.json({ success: true, data });
});

const history = asyncHandler(async (req, res) => {
  const data = chatService.getHistory(req.user.id);
  res.json({ success: true, data });
});

module.exports = { send, history };

const moduleService = require('../services/moduleService');
const asyncHandler = require('../utils/asyncHandler');

const list = asyncHandler(async (req, res) => {
  const data = moduleService.list(req.user.id);
  res.json({ success: true, data });
});

const getById = asyncHandler(async (req, res) => {
  const data = moduleService.getById(req.params.id, req.user.id);
  res.json({ success: true, data });
});

const create = asyncHandler(async (req, res) => {
  const data = moduleService.create(req.user.id, req.body);
  res.status(201).json({ success: true, data });
});

const update = asyncHandler(async (req, res) => {
  const data = moduleService.update(req.params.id, req.user.id, req.body);
  res.json({ success: true, data });
});

const remove = asyncHandler(async (req, res) => {
  moduleService.remove(req.params.id, req.user.id);
  res.status(204).send();
});

module.exports = { list, getById, create, update, remove };

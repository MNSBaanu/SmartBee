const AppError = require('../utils/AppError');
const { store, nextId } = require('../models/store');

const list = (userId, { moduleId, from, to } = {}) => {
  let records = store.attendance.filter((a) => a.userId === userId);
  if (moduleId) records = records.filter((a) => a.moduleId === moduleId);
  if (from) records = records.filter((a) => a.date >= from);
  if (to) records = records.filter((a) => a.date <= to);
  return records.map(({ userId: _, ...rest }) => rest);
};

const record = (userId, { moduleId, date, status }) => {
  const mod = store.modules.find((m) => m.id === moduleId && m.userId === userId);
  if (!mod) throw new AppError('Module not found', 404);

  const existing = store.attendance.find(
    (a) => a.userId === userId && a.moduleId === moduleId && a.date === date
  );
  if (existing) {
    existing.status = status;
    const { userId: _, ...rest } = existing;
    return rest;
  }

  const entry = { id: nextId('attendance'), userId, moduleId, date, status };
  store.attendance.push(entry);
  const { userId: _, ...rest } = entry;
  return rest;
};

const stats = (userId) => {
  const records = store.attendance.filter((a) => a.userId === userId);
  const total = records.length;
  const byStatus = records.reduce((acc, r) => {
    acc[r.status] = (acc[r.status] || 0) + 1;
    return acc;
  }, {});

  const moduleIds = [...new Set(records.map((r) => r.moduleId))];
  const byModule = moduleIds.map((moduleId) => {
    const modRecords = records.filter((r) => r.moduleId === moduleId);
    const present = modRecords.filter((r) => r.status === 'present').length;
    const mod = store.modules.find((m) => m.id === moduleId);
    return {
      moduleId,
      moduleCode: mod?.code,
      total: modRecords.length,
      present,
      rate: modRecords.length ? Math.round((present / modRecords.length) * 100) : 0,
    };
  });

  return { total, byStatus, byModule };
};

module.exports = { list, record, stats };

/** In-memory store for local development; replace with Supabase/PostgreSQL in production. */
const store = {
  users: [],
  sessions: new Set(),
  modules: [],
  tasks: [],
  attendance: [],
  chatMessages: [],
  dailyPlans: [],
  nextId: { user: 1, module: 1, task: 1, attendance: 1, chat: 1, plan: 1 },
};

const nextId = (key) => {
  const id = store.nextId[key];
  store.nextId[key] += 1;
  return id;
};

module.exports = { store, nextId };

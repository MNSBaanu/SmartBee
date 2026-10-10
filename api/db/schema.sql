CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS modules (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  code TEXT NOT NULL,
  name TEXT NOT NULL,
  credits TEXT NOT NULL,
  semester TEXT NOT NULL,
  instructor TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS modules_user_idx ON modules(user_id);

CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  due_date TEXT NOT NULL,
  priority TEXT NOT NULL,
  category TEXT NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT false
);
CREATE INDEX IF NOT EXISTS tasks_user_idx ON tasks(user_id);

CREATE TABLE IF NOT EXISTS attendance (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  module_id INT NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
  date TEXT NOT NULL,
  status TEXT NOT NULL,
  UNIQUE (user_id, module_id, date)
);

CREATE TABLE IF NOT EXISTS chat_messages (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS chat_user_idx ON chat_messages(user_id);

CREATE TABLE IF NOT EXISTS daily_plans (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date TEXT NOT NULL,
  items JSONB NOT NULL,
  generated BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, date)
);

CREATE TABLE IF NOT EXISTS schedule_entries (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  day TEXT NOT NULL,
  title TEXT NOT NULL,
  code TEXT NOT NULL DEFAULT '',
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  room TEXT NOT NULL DEFAULT '',
  type TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS schedule_user_idx ON schedule_entries(user_id);

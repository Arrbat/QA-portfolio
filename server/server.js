const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'db name',
};

let db;

async function initDB() {
  try {
    db = await mysql.createConnection(dbConfig);
    console.log('Connected to MySQL database.');
  } catch (err) {
    console.error('Database connection failed:', err);
    process.exit(1);
  }
}

// ==================== LOGIN/REGISTRATION ====================

app.post('/register', async (req, res) => {
  const { user_login, user_password } = req.body;
  if (!user_login || !user_password) return res.status(400).json({ error: 'Login and password required.' });

  try {
    const [users] = await db.execute('SELECT * FROM users WHERE user_login = ?', [user_login]);

    if (users.length > 0) {
      const user = users[0];
      if (user.user_password !== user_password) {
        return res.status(401).json({ error: 'Incorrect password.' });
      }
      return res.status(200).json({ message: 'Login successful.', user_id: user.id });
    }

    const [result] = await db.execute(
      'INSERT INTO users (user_login, user_password) VALUES (?, ?)',
      [user_login, user_password]
    );

    return res.status(201).json({ message: 'Registration successful.', user_id: result.insertId });
  } catch (err) {
    console.error('Error in registration/login:', err);
    return res.status(500).json({ error: 'Server error.' });
  }
});

app.post('/login', async (req, res) => {
  const { user_login, user_password } = req.body;
  if (!user_login || !user_password) return res.status(400).json({ error: 'Login and password required.' });

  try {
    const [users] = await db.execute('SELECT * FROM users WHERE user_login = ?', [user_login]);
    if (users.length === 0) return res.status(404).json({ error: 'User not found.' });

    const user = users[0];
    if (user.user_password !== user_password) return res.status(401).json({ error: 'Incorrect password.' });

    return res.status(200).json({ message: 'Login successful.', user_id: user.id });
  } catch (err) {
    console.error('Error in login:', err);
    return res.status(500).json({ error: 'Server error.' });
  }
});

// ==================== TASKS MANIPULATION ====================

app.post('/tasks', async (req, res) => {
  const { title, description, user_id } = req.body;
  if (!user_id || !title) return res.status(400).json({ error: 'User ID and title required.' });

  try {
    const [result] = await db.execute(
      'INSERT INTO tasks (title, description, user_id, completed) VALUES (?, ?, ?, false)',
      [title, description || '', user_id]
    );
    return res.status(201).json({ id: result.insertId, title, description: description || '', user_id, completed: false });
  } catch (err) {
    console.error('Error creating task:', err);
    return res.status(500).json({ error: 'Failed to create task.' });
  }
});

app.get('/tasks/:user_id', async (req, res) => {
  const { user_id } = req.params;
  try {
    const [tasks] = await db.execute('SELECT * FROM tasks WHERE user_id = ?', [user_id]);
    return res.status(200).json(tasks);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    return res.status(500).json({ error: 'Failed to fetch tasks.' });
  }
});

app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  try {
    const [existing] = await db.execute('SELECT * FROM tasks WHERE id = ?', [id]);
    if (existing.length === 0) return res.status(404).json({ error: 'Task not found.' });

    const task = existing[0];
    await db.execute(
      'UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?',
      [
        title !== undefined ? title : task.title,
        description !== undefined ? description : task.description,
        completed !== undefined ? completed : task.completed,
        id,
      ]
    );
    return res.status(200).json({ message: 'Task updated successfully.' });
  } catch (err) {
    console.error('Error updating task:', err);
    return res.status(500).json({ error: 'Failed to update task.' });
  }
});

app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.execute('DELETE FROM tasks WHERE id = ?', [id]);
    return res.status(200).json({ message: 'Task deleted successfully.' });
  } catch (err) {
    console.error('Error deleting task:', err);
    return res.status(500).json({ error: 'Failed to delete task.' });
  }
});

app.patch('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  if (completed === undefined) return res.status(400).json({ error: 'Completed status required.' });

  try {
    await db.execute('UPDATE tasks SET completed = ? WHERE id = ?', [completed, id]);
    return res.status(200).json({ message: 'Task status updated successfully.' });
  } catch (err) {
    console.error('Error marking task completed:', err);
    return res.status(500).json({ error: 'Failed to update task status.' });
  }
});


const PORT = 3001;
initDB().then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)));
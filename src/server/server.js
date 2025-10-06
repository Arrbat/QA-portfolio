const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Server connection endpoint. Server needs to be configured.
const db = mysql.createConnection({
  host: 'localhost',
  user: 'Type here user\'s name of your MySql server (typically root)',
  password: 'Type here server\'s password',
  database: 'Type here users database name (Check README.md in main dir for details)'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL database.');
});

// Registration Endpoint
// Register endpoint
app.post('/register', (req, res) => {
  const { user_login, user_password } = req.body;

  const checkUserQuery = 'SELECT * FROM users WHERE user_login = ? AND user_password = ?';
  db.query(checkUserQuery, [user_login, user_password], (err, results) => {
    if (err) {
      console.error('Error checking user:', err);
      return res.status(500).send('Error checking user.');
    }

    if (results.length > 0) {
      // User exists (login)
      const user = results[0];
      return res.status(200).json({ message: 'Login successful.', user_id: user.id });
    } else {
      // Create new user (registration)
      const insertUserQuery = 'INSERT INTO users (user_login, user_password) VALUES (?, ?)';
      db.query(insertUserQuery, [user_login, user_password], (err, result) => {
        if (err) {
          console.error('Error during registration:', err);
          return res.status(500).send('Registration failed.');
        }
        res.status(201).json({ message: 'Registration successful.', user_id: result.insertId });
      });
    }
  });
});


// Login endpoint
app.post('/login', (req, res) => {
  const { user_login, user_password } = req.body;

  const query = 'SELECT * FROM users WHERE user_login = ?';
  db.query(query, [user_login], (err, results) => {
    if (err) {
      console.error('Error checking login:', err);
      return res.status(500).send('Database error.');
    }
    if (results.length === 0) {
      return res.status(404).send('User not found.');
    }

    const user = results[0];
    if (user.user_password !== user_password) {
      return res.status(401).send('Incorrect password.');
    }

    res.status(200).send({ message: 'Login successful.', user_id: user.id });
  });
});


// Task Management Endpoints

// Create a new task
app.post('/tasks', (req, res) => {
  const { title, description, user_id } = req.body;
  const query = 'INSERT INTO tasks (title, description, user_id) VALUES (?, ?, ?)';

  db.query(query, [title, description, user_id], (err, results) => {
    if (err) {
      console.error('Error creating task:', err);
      return res.status(500).send('Failed to create task.');
    }
    res.status(201).send({ id: results.insertId, title, description, user_id });
  });
});


// Modify an existing task
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  // Fetch the existing task first
  const getQuery = 'SELECT * FROM tasks WHERE id = ?';
  db.query(getQuery, [id], (err, results) => {
    if (err) {
      console.error('Error reading task:', err);
      return res.status(500).send('Error reading task.');
    }
    if (results.length === 0) {
      return res.status(404).send('Task not found.');
    }

    const current = results[0];

    // Use new values if provided, otherwise keep existing
    const updatedTitle = title !== undefined ? title : current.title;
    const updatedDescription = description !== undefined ? description : current.description;
    const updatedCompleted = completed !== undefined ? completed : current.completed;

    const updateQuery = `
      UPDATE tasks
      SET title = ?, description = ?, completed = ?
      WHERE id = ?
    `;
    db.query(updateQuery, [updatedTitle, updatedDescription, updatedCompleted, id], (err) => {
      if (err) {
        console.error('Error updating task:', err);
        return res.status(500).send('Failed to update task.');
      }
      res.status(200).send('Task updated successfully.');
    });
  });
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM tasks WHERE id = ?';

  db.query(query, [id], (err) => {
    if (err) {
      console.error('Error deleting task:', err);
      res.status(500).send('Failed to delete task.');
    } else {
      res.status(200).send('Task deleted successfully.');
    }
  });
});

// Mark a task as completed
app.patch('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  const query = 'UPDATE tasks SET completed = ? WHERE id = ?';

  db.query(query, [completed, id], (err) => {
    if (err) {
      console.error('Error marking task as completed:', err);
      res.status(500).send('Failed to update task status.');
    } else {
      res.status(200).send('Task status updated successfully.');
    }
  });
});

// Get all tasks
app.get('/tasks', (req, res) => {
  const query = 'SELECT * FROM tasks';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching tasks:', err);
      res.status(500).send('Failed to fetch tasks.');
    } else {
      res.status(200).json(results);
    }
  });
});

app.get('/tasks/:user_id', (req, res) => {
  const { user_id } = req.params;
  const query = 'SELECT * FROM tasks WHERE user_id = ?';
  db.query(query, [user_id], (err, results) => {
    if (err) {
      console.error('Error fetching tasks:', err);
      return res.status(500).send('Failed to fetch tasks.');
    }
    res.status(200).json(results);
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
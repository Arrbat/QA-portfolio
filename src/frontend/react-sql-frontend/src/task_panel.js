import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './task_panel.css';

function TaskPanel() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

useEffect(() => {
  const user_id = localStorage.getItem('user_id');
  if (!user_id) {
    alert('No user ID found. Please login.');
    return;
  }

  axios.get(`http://localhost:3001/tasks/${user_id}`)
    .then(response => setTasks(response.data))
    .catch(error => console.error('Error fetching tasks:', error));
}, []);

const addTask = () => {
  const user_id = localStorage.getItem('user_id');
  axios.post('http://localhost:3001/tasks', { title: newTask, description: '', user_id })
    .then(response => setTasks([...tasks, response.data]))
    .catch(error => console.error('Error adding task:', error));
};

  const deleteTask = (id) => {
    axios.delete(`http://localhost:3001/tasks/${id}`)
      .then(() => setTasks(tasks.filter(task => task.id !== id)))
      .catch(error => console.error('Error deleting task:', error));
  };

  const updateTask = (id, updatedTask) => {
    axios.put(`http://localhost:3001/tasks/${id}`, updatedTask)
      .then(() => {
        setTasks(tasks.map(task => (task.id === id ? { ...task, ...updatedTask } : task)));
      })
      .catch(error => console.error('Error updating task:', error));
  };

  const markTaskCompleted = (id, completed) => {
    axios.patch(`http://localhost:3001/tasks/${id}`, { completed })
      .then(() => {
        setTasks(tasks.map(task => (task.id === id ? { ...task, completed } : task)));
      })
      .catch(error => console.error('Error marking task as completed:', error));
  };

  return (
    <div className="task-panel">
      <h1>Task Panel</h1>
      <div className="add-task-section">
        <input
          type="text"
          placeholder="Enter new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <ul>
        {tasks.map(task => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <input
              type="text"
              value={task.title}
              onChange={(e) => updateTask(task.id, { title: e.target.value })}
            />
            <textarea
              value={task.description || ''}
              onChange={(e) => updateTask(task.id, { description: e.target.value })}
            />
            <div className="task-buttons">
              <button onClick={() => deleteTask(task.id)}>Delete</button>
              <button onClick={() => markTaskCompleted(task.id, !task.completed)}>
                {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskPanel;

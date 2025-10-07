import React, { useState, useEffect } from "react";
import axios from "axios";
import "./task_panel.css";

function TaskPanel() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    if (!userId) {
      setErrorMessage("No user ID found. Please login.");
      return;
    }

    const fetchTasks = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3001/tasks/${userId}`,
        );
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setErrorMessage("Failed to fetch tasks.");
      }
    };

    fetchTasks();
  }, [userId]);

  const addTask = async () => {
    try {
      const { data } = await axios.post("http://localhost:3001/tasks", {
        title: newTask,
        description: "",
        user_id: userId,
      });
      setTasks([...tasks, data]);
      setNewTask("");
    } catch (error) {
      console.error("Error adding task:", error);
      setErrorMessage("Failed to add task.");
    }
  };

  const updateTask = async (id, updatedFields) => {
    try {
      await axios.put(`http://localhost:3001/tasks/${id}`, updatedFields);
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, ...updatedFields } : task,
        ),
      );
    } catch (error) {
      console.error("Error updating task:", error);
      setErrorMessage("Failed to update task.");
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
      setErrorMessage("Failed to delete task.");
    }
  };

  const markTaskCompleted = async (id, completed) => {
    try {
      await axios.patch(`http://localhost:3001/tasks/${id}`, { completed });
      setTasks(
        tasks.map((task) => (task.id === id ? { ...task, completed } : task)),
      );
    } catch (error) {
      console.error("Error marking task completed:", error);
      setErrorMessage("Failed to update task status.");
    }
  };

  return (
    <div className="task-panel">
      <h1>Task Panel</h1>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <div className="add-task-section">
        <input
          type="text"
          placeholder="Enter new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="button" onClick={addTask}>
          Add Task
        </button>
      </div>

      <ul>
        {tasks.map(({ id, title, description, completed }) => (
          <li key={id} className={completed ? "completed" : ""}>
            <input
              type="text"
              value={title}
              onChange={(e) => updateTask(id, { title: e.target.value })}
            />
            <textarea
              value={description || ""}
              onChange={(e) => updateTask(id, { description: e.target.value })}
            />
            <div className="task-buttons">
              <button type="button" onClick={() => deleteTask(id)}>
                Delete
              </button>
              <button
                type="button"
                onClick={() => markTaskCompleted(id, !completed)}
              >
                {completed ? "Mark Incomplete" : "Mark Complete"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskPanel;

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import "../components/css/TaskForm.css";

function TaskForm({ onSubmit }) {
  const location = useLocation();
  const task = location.state?.task || {}; // Get task from location state (for editing)

  const [title, setTitle] = useState(task.title || '');
  const [priority, setPriority] = useState(task.priority || 'low');
  const [status, setStatus] = useState(task.status || 'not started');
  const [startDate, setStartDate] = useState(task.startDate || '');
  const [endDate, setEndDate] = useState(task.endDate || '');

  const navigate = useNavigate();

  // Submit handler for adding or updating a task
  const handleSubmit = () => {
    if (!title || !startDate || !endDate) {
      alert('Please fill in all required fields.');
      return;
    }

    const newTask = {
      ...task, // Retain task ID if editing
      title,
      priority,
      status,
      startDate,
      endDate,
    };

    const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    if (task.id) {
      // Update existing task
      const updatedTasks = existingTasks.map((t) =>
        t.id === task.id ? newTask : t
      );
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      onSubmit(updatedTasks); // Pass updated tasks to parent component
    } else {
      // Add new task
      newTask.id = new Date().getTime(); // Generate a new ID for new tasks
      localStorage.setItem('tasks', JSON.stringify([...existingTasks, newTask]));
      onSubmit([...existingTasks, newTask]); // Pass new tasks to parent component
    }

    navigate('/dashboard'); // Navigate back to the dashboard
  };

  return (
    <div className="task-form-container">
      <h2>{task.id ? 'Edit Task' : 'New Task'}</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <label>
          Task Title:
          <input
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <label>
          Priority:
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>

        <label>
          Status:
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="not started">Not Started</option>
            <option value="in progress">In Progress</option>
            <option value="finished">Finished</option>
          </select>
        </label>

        <label>
          Start Date:
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </label>

        <label>
          End Date:
          <input
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </label>

        <button type="submit" className="save-task-button">
          Save Task
        </button>
      </form>
    </div>
  );
}

export default TaskForm;

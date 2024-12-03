import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskList from './TaskList';
import "../components/css/TaskForm.css";

function TaskForm({ task = {}, onSubmit }) {
  const [title, setTitle] = useState(task.title || '');
  const [priority, setPriority] = useState(task.priority || 'low');
  const [status, setStatus] = useState(task.status || 'not started');
  const [startDate, setStartDate] = useState(task.startDate || '');
  const [endDate, setEndDate] = useState(task.endDate || '');                          
  const navigate = useNavigate();

  const handleSubmit = () => {
    const newTask = { title, priority, status, startDate, endDate };

    // Retrieve tasks from localStorage
    const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    // Add the new or updated task
    if (task.id) {
      // Update existing task
      const updatedTasks = existingTasks.map((t) =>
        t.id === task.id ? { ...t, ...newTask } : t
      );
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    } else {
      // Add new task
      newTask.id = new Date().getTime(); // Generate unique ID
      localStorage.setItem('tasks', JSON.stringify([...existingTasks, newTask]));
    }

    onSubmit(newTask); // Pass new task to parent component (if needed)
    navigate('/dashboard');
  };

  return (
    <div className="task-form-container">
      <h2>{task.title ? 'Edit Task' : 'New Task'}</h2>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="not started">Not Started</option>
        <option value="in progress">In Progress</option>
        <option value="finished">Finished</option>
      </select>
      <input
        type="datetime-local"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        type="datetime-local"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <button onClick={handleSubmit}>Save Task</button>
    </div>
  );
}

export default TaskForm;

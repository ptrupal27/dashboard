import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TaskList from './TaskList';
import TaskFilter from './TaskFilter';
import "../components/css/Dashboard.css";
import Navbar from './Navbar';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [displayedTasks, setDisplayedTasks] = useState([]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
    setDisplayedTasks(savedTasks); // Initialize displayed tasks
  }, []);

  const handleFilter = (filteredTasks) => {
    setDisplayedTasks(filteredTasks); // Update the displayed tasks only
  };

  return (
    <div className="dashboard-container">
      <Navbar />
      <h2>Dashboard</h2>
      <Link to="/task-form" className="add-task-button">+ Add Task</Link>
      <TaskFilter tasks={tasks} onFilter={handleFilter} />
      <TaskList tasks={displayedTasks} setTasks={setTasks} />
    </div>
  );
}

export default Dashboard;

import React, { useState, useEffect } from 'react';
import "../components/css/TaskFilter.css";

function TaskFilter({ tasks, onFilter }) {
  const [priorityFilter, setPriorityFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    let filteredTasks = tasks;

    // Apply priority filter
    if (priorityFilter !== '') {
      filteredTasks = filteredTasks.filter((task) => task.priority === priorityFilter);
    }

    // Apply status filter
    if (statusFilter !== '') {
      filteredTasks = filteredTasks.filter((task) => task.status === statusFilter);
    }

    onFilter(filteredTasks); // Notify parent with the filtered list
  }, [tasks, priorityFilter, statusFilter, onFilter]);

  return (
    <div className="task-filter-container">
      <div className="filter-group">
        <label htmlFor="priority-filter">Filter by Priority:</label>
        <select
          id="priority-filter"
          onChange={(e) => setPriorityFilter(e.target.value)}
          value={priorityFilter}
        >
          <option value="">All</option>
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="status-filter">Filter by Status:</label>
        <select
          id="status-filter"
          onChange={(e) => setStatusFilter(e.target.value)}
          value={statusFilter}
        >
          <option value="">All</option>
          <option value="not started">Not Started</option>
          <option value="in progress">In Progress</option>
          <option value="finished">Finished</option>
        </select>
      </div>
    </div>
  );
}

export default TaskFilter;

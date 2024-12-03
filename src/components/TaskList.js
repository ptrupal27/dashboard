import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../components/css/TaskList.css";

function TaskList({ tasks, setTasks }) {
  const navigate = useNavigate();

  // Handle task deletion
  const handleDelete = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks); // Update parent state
    localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Update localStorage
  };

  // Handle task edit
  const handleEdit = (task) => {
    navigate('/task-form', { state: { task } }); // Navigate to TaskForm with task data
  };

  return (
    <div className="task-list-container">
      <h3>Task List</h3>
      {tasks.length === 0 ? (
        <p>No tasks available. Please add a task.</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className="task-item">
              <div className="task-details">
                <h4>{task.title}</h4>
                <p>
                  Priority: <span className={`priority-${task.priority}`}>{task.priority}</span>
                </p>
                <p>Status: {task.status}</p>
                <p>
                  Start: {new Date(task.startDate).toLocaleString()} | End: {new Date(task.endDate).toLocaleString()}
                </p>
              </div>
              <div className="task-actions">
                <button onClick={() => handleEdit(task)} className="edit-button">Edit</button>
                <button onClick={() => handleDelete(task.id)} className="delete-button">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;

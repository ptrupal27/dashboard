import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import TaskForm from './components/TaskForm';
import TaskHistory from './components/TaskHistory';
import ProtectedRoute from './components/ProtectedRoute';
import "../src/App.css"

function App() {
  const [tasks, setTasks] = useState([]); // Manage tasks at the App level

  const handleAddTask = (newTasks) => {
    setTasks(newTasks); // Update the tasks state with new tasks
    console.log('Task updated:', newTasks); // Debugging log
  };

  useEffect(() => {
    // Initialize tasks from localStorage when the app loads
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  return (
    <div>
      <Routes>
        {/* Public Route: Login */}
        <Route path="/" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard tasks={tasks} setTasks={setTasks} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/task-form"
          element={
            <ProtectedRoute>
              <TaskForm onSubmit={handleAddTask} /> {/* Pass handleAddTask */}
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <TaskHistory tasks={tasks} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

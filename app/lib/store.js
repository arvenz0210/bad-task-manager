'use client';

import { createContext, useContext, useState } from 'react';

// Bad practice: Global context without proper structure
// Bad practice: No proper error handling
// Bad practice: No proper loading states
const TaskContext = createContext();

// Bad practice: No proper error handling
// Bad practice: No proper loading states
export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Bad practice: No proper error handling
  // Bad practice: No proper loading states
  const fetchTasks = async () => {
    try {
      setLoading(true);
      // Bad practice: Hardcoded API URL
      const response = await fetch('http://localhost:3000/api/tasks');
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  // Bad practice: No proper error handling
  // Bad practice: No proper loading states
  const createTask = async (title) => {
    try {
      // Bad practice: Hardcoded API URL
      const response = await fetch('http://localhost:3000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        throw new Error('Failed to create task');
      }

      const newTask = await response.json();
      setTasks([...tasks, newTask]);
    } catch (err) {
      setError('Failed to create task');
    }
  };

  // Bad practice: No proper error handling
  // Bad practice: No proper loading states
  const updateTask = async (id, completed) => {
    try {
      // Bad practice: Hardcoded API URL
      const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed }),
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      const updatedTask = await response.json();
      setTasks(tasks.map(task => 
        task.id === id ? updatedTask : task
      ));
    } catch (err) {
      setError('Failed to update task');
    }
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      loading,
      error,
      fetchTasks,
      createTask,
      updateTask,
    }}>
      {children}
    </TaskContext.Provider>
  );
}

// Bad practice: No proper error handling
// Bad practice: No proper loading states
export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
} 
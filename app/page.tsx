'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import { TaskData, TaskFormData, Task } from './types';

export default function TaskManagementPage() {
  const [taskData, setTaskData] = useState<TaskData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [formData, setFormData] = useState<TaskFormData>({
    taskTitle: '',
    dueDate: '',
    priority: '',
    assignee: ''
  });

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/tasks/search');
      const data: TaskData = await response.json();
      setTaskData(data);
      setFormData({
        taskTitle: data.task.defaultTitle,
        dueDate: data.task.defaultDueDate,
        priority: data.task.defaultPriority,
        assignee: data.task.defaultAssignee
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Failed to load tasks. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        alert('Task created successfully!');
        fetchTasks();
      } else {
        alert('Task creation failed. Please try again.');
      }
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Task creation failed. Please try again.');
    }
  };

  if (loading) {
    return <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#333'
    }}>Loading...</div>;
  }

  if (!taskData) {
    return <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#333'
    }}>No data available</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Task Management</h1>
      
      <div className={styles.taskSummary}>
        <h2 style={{ color: '#111' }}>Current Tasks</h2>
        {taskData.tasks.items.map(task => (
          <div key={task.id} className={styles.taskItem}>
            <div className={styles.taskStatusContainer}>
              <div className={`${styles.statusIndicator} ${styles[task.status]}`} />
            </div>
            <div className={styles.taskDetails}>
              <h3>{task.title}</h3>
              <p className={styles.taskDescription}>{task.description}</p>
              <div className={styles.taskMeta}>
                <span className={styles.priority}>Priority: {task.priority}</span>
                <span className={styles.dueDate}>Due: {task.dueDate}</span>
              </div>
            </div>
          </div>
        ))}
        
        <div style={{
          marginTop: '2rem',
          padding: '1.5rem',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '0.5rem',
            padding: '0.5rem 0',
            borderBottom: '1px solid #ddd'
          }}>
            <span style={{ fontWeight: 'bold', color: '#000' }}>Total Tasks:</span>
            <span style={{ color: '#000' }}>{taskData.tasks.total}</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '0.5rem',
            padding: '0.5rem 0',
            borderBottom: '1px solid #ddd'
          }}>
            <span style={{ fontWeight: 'bold', color: '#000' }}>Completed:</span>
            <span style={{ color: '#000' }}>{taskData.tasks.completed}</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '0.5rem',
            padding: '0.5rem 0',
            borderBottom: '1px solid #ddd'
          }}>
            <span style={{ fontWeight: 'bold', color: '#000' }}>In Progress:</span>
            <span style={{ color: '#000' }}>{taskData.tasks.inProgress}</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0.5rem 0',
            color: '#d32f2f',
            fontWeight: 'bold'
          }}>
            <span style={{ color: '#d32f2f' }}>Overdue:</span>
            <span style={{ color: '#d32f2f' }}>{taskData.tasks.overdue}</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.section}>
          <h2>Create New Task</h2>
          <div className={styles.formGroup}>
            <label htmlFor="taskTitle">Task Title</label>
            <input
              type="text"
              id="taskTitle"
              name="taskTitle"
              value={formData.taskTitle}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="dueDate">Due Date</label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="assignee">Assignee</label>
            <input
              type="text"
              id="assignee"
              name="assignee"
              value={formData.assignee}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <button type="submit" style={{
          backgroundColor: '#4CAF50',
          color: 'white',
          padding: '12px 20px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'bold',
          marginTop: '20px',
          width: '100%',
          transition: 'background-color 0.3s ease'
        }}>
          Create Task
        </button>
      </form>
    </div>
  );
}

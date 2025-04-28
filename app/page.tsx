'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import { TaskData, TaskFormData } from './types';

export default function TaskManagementPage() {
  const [taskData, setTaskData] = useState<TaskData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [formData, setFormData] = useState<TaskFormData>({
    taskTitle: '',
    dueDate: '',
    priority: '',
    assignee: ''
  });

  useEffect(() => {
    fetch('/api/mockData')
      .then(res => res.json())
      .then((data: TaskData) => {
        setTaskData(data);
        setFormData({
          taskTitle: data.task.defaultTitle,
          dueDate: data.task.defaultDueDate,
          priority: data.task.defaultPriority,
          assignee: data.task.defaultAssignee
        });
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
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
      } else {
        alert('Task creation failed. Please try again.');
      }
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Task creation failed. Please try again.');
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (!taskData) {
    return <div className={styles.loading}>No data available</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Task Management</h1>
      
      <div className={styles.taskSummary}>
        <h2>Current Tasks</h2>
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
        
        <div className={styles.stats}>
          <div className={styles.statRow}>
            <span>Total Tasks:</span>
            <span>{taskData.tasks.total}</span>
          </div>
          <div className={styles.statRow}>
            <span>Completed:</span>
            <span>{taskData.tasks.completed}</span>
          </div>
          <div className={styles.statRow}>
            <span>In Progress:</span>
            <span>{taskData.tasks.inProgress}</span>
          </div>
          <div className={`${styles.statRow} ${styles.overdue}`}>
            <span>Overdue:</span>
            <span>{taskData.tasks.overdue}</span>
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

        <button type="submit" className={styles.submitButton}>
          Create Task
        </button>
      </form>
    </div>
  );
}

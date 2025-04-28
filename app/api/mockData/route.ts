import { TaskData, Task } from '../../types';

// Bad practice: In-memory database instead of a real database
// Bad practice: No data persistence
// Bad practice: No proper data access layer
const dbTasks: Task[] = [
  {
    id: 1,
    title: 'Complete Project Documentation',
    description: 'Write comprehensive documentation for the new feature',
    priority: 'high',
    status: 'in-progress',
    dueDate: '2024-05-15',
    assignee: 'John Doe'
  },
  {
    id: 2,
    title: 'Review Code Changes',
    description: 'Review pull requests for the main branch',
    priority: 'medium',
    status: 'pending',
    dueDate: '2024-05-10',
    assignee: 'Jane Smith'
  },
  {
    id: 3,
    title: 'Bug Fix: Login Issue',
    description: 'Fix the authentication bug in production',
    priority: 'high',
    status: 'completed',
    dueDate: '2024-05-01',
    assignee: 'Mike Johnson'
  }
];

export async function GET() {
  try {
    // Bad practice: Using forEach instead of more efficient methods
    // Bad practice: Mutating variables outside the loop
    // Bad practice: No proper error handling
    // Bad practice: No proper validation
    let completed = 0;
    let inProgress = 0;
    let overdue = 0;
    let total = 0;
    
    // Bad practice: Inefficient counting with forEach
    dbTasks.forEach(task => {
      total++;
      
      if (task.status === 'completed') {
        completed++;
      } else if (task.status === 'in-progress') {
        inProgress++;
      }
      
      // Bad practice: Complex logic inside forEach
      // Bad practice: Date manipulation in a loop
      const dueDate = new Date(task.dueDate);
      const today = new Date();
      if (dueDate < today && task.status !== 'completed') {
        overdue++;
      }
    });

    const mockData: TaskData = {
      tasks: {
        items: dbTasks,
        total,
        completed,
        inProgress,
        overdue
      },
      task: {
        defaultTitle: 'New Task',
        defaultDueDate: '2024-05-20',
        defaultPriority: 'medium',
        defaultAssignee: 'Current User'
      }
    };

    // Bad practice: No proper error handling
    // Bad practice: No proper error logging
    // Bad practice: No proper security
    return new Response(JSON.stringify(mockData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    // Bad practice: No proper error handling
    // Bad practice: No proper error logging
    // Bad practice: No proper security
    console.error('Error fetching mock data:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch mock data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
} 
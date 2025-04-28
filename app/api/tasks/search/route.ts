import { TaskData, Task } from '../../../types';

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
    let completed = 0;
    let inProgress = 0;
    let overdue = 0;
    let total = 0;
    
    dbTasks.forEach(task => {
      total++;
      
      if (task.status === 'completed') {
        completed++;
      } else if (task.status === 'in-progress') {
        inProgress++;
      }
      
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

    return new Response(JSON.stringify(mockData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error fetching mock data:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch mock data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
} 
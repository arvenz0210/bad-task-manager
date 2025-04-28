import { TaskFormData, Task } from '../../types';

let dbTasks: Task[] = [
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
    
    return new Response(JSON.stringify({ 
      tasks: dbTasks,
      stats: {
        total,
        completed,
        inProgress,
        overdue
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch tasks' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function POST(request: Request) {
  try {
    const data: TaskFormData = await request.json();

    const { taskTitle, dueDate, priority, assignee } = data;

    if (!taskTitle || !dueDate || !priority || !assignee) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    let maxId = 0;
    dbTasks.forEach(task => {
      if (task.id > maxId) {
        maxId = task.id;
      }
    });
    
    const newTask: Task = {
      id: maxId + 1,
      title: taskTitle,
      description: `Task created at ${new Date().toISOString()}`,
      priority: priority as 'low' | 'medium' | 'high',
      status: 'pending',
      dueDate,
      assignee
    };

    dbTasks.push(newTask);

    return new Response(JSON.stringify({ success: true, task: newTask }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Task creation error:', error);
    return new Response(JSON.stringify({ error: 'Task creation failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

async function processTask(data: TaskFormData): Promise<{ success: boolean }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 1000);
  });
} 
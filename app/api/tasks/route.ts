import { TaskFormData } from '../../types';

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

    const taskResult = await processTask(data);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
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
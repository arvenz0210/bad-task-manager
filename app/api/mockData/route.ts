import { TaskData } from '../../types';

export async function GET() {
  try {
    // Bad practice: Hardcoded data
    // Bad practice: No proper error handling
    // Bad practice: No proper validation
    const mockData: TaskData = {
      tasks: {
        items: [
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
        ],
        total: 3,
        completed: 1,
        inProgress: 1,
        overdue: 1
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
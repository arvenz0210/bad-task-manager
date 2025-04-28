// Task related types
export interface Task {
  id: number;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'completed' | 'in-progress' | 'pending';
  dueDate: string;
  assignee: string;
}

export interface TaskStats {
  total: number;
  completed: number;
  inProgress: number;
  overdue: number;
}

export interface TaskData {
  tasks: {
    items: Task[];
  } & TaskStats;
  task: {
    defaultTitle: string;
    defaultDueDate: string;
    defaultPriority: string;
    defaultAssignee: string;
  };
}

export interface TaskFormData {
  taskTitle: string;
  dueDate: string;
  priority: string;
  assignee: string;
} 
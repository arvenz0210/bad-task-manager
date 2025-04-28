export interface Task {
  id: number;
  title: string;
  description: string;
  priority: string;
  status: string;
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
    items: {
      id: number;
      title: string;
      description: string;
      priority: string;
      status: string;
      dueDate: string;
      assignee: string;
    }[];
    total: number;
    completed: number;
    inProgress: number;
    overdue: number;
  };
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

export interface TaskItem {
  id: number;
  title: string;
  description: string;
  priority: string;
  status: string;
  dueDate: string;
  assignee: string;
}

export interface TaskDetails {
  taskId: number;
  taskName: string;
  taskDescription: string;
  taskPriority: string;
  taskStatus: string;
  taskDueDate: string;
  taskAssignee: string;
} 
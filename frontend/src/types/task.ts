export interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

export interface CreateTaskPayload {
  title: string;
}

export interface UpdateTaskPayload {
  title?: string;
  completed?: boolean;
}

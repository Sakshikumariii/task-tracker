import type { CreateTaskPayload, Task, UpdateTaskPayload } from '../types/task';

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api';

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let message = 'Request failed';
    try {
      const body = (await response.json()) as { message?: string };
      if (body.message) message = body.message;
    } catch {
      /* ignore */
    }
    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export const tasksApi = {
  getAll: () => fetch(`${API_BASE}/tasks`).then((res) => handleResponse<Task[]>(res)),

  create: (payload: CreateTaskPayload) =>
    fetch(`${API_BASE}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).then((res) => handleResponse<Task>(res)),

  update: (id: string, payload: UpdateTaskPayload) =>
    fetch(`${API_BASE}/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).then((res) => handleResponse<Task>(res)),

  remove: (id: string) =>
    fetch(`${API_BASE}/tasks/${id}`, { method: 'DELETE' }).then((res) =>
      handleResponse<void>(res),
    ),
};

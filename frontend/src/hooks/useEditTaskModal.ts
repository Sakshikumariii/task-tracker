import { useCallback, useState } from 'react';
import type { Task } from '../types/task';

export function useEditTaskModal() {
  const [task, setTask] = useState<Task | null>(null);

  const open = useCallback((selected: Task) => {
    setTask(selected);
  }, []);

  const close = useCallback(() => {
    setTask(null);
  }, []);

  return { task, open, close };
}

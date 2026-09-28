import { useMemo } from 'react';
import { useAppSelector } from '../../app/hooks';
import './TaskStats.css';

export function TaskStats() {
  const tasks = useAppSelector((state) => state.tasks.items);

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const pending = total - completed;
    return { total, completed, pending };
  }, [tasks]);

  return (
    <p className="task-stats">
      <span>Total: {stats.total}</span>
      <span className="task-stats__sep">|</span>
      <span>Completed: {stats.completed}</span>
      <span className="task-stats__sep">|</span>
      <span>Pending: {stats.pending}</span>
    </p>
  );
}

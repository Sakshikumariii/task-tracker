import { useAppSelector } from '../../app/hooks';
import { TaskItem } from '../TaskItem/TaskItem';
import './TaskList.css';

export function TaskList() {
  const tasks = useAppSelector((state) => state.tasks.items);

  if (tasks.length === 0) {
    return (
      <p className="task-list__empty">No tasks yet. Add one above to get started.</p>
    );
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}

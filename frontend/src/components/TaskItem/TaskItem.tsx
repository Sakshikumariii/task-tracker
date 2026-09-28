import { useAppDispatch } from '../../app/hooks';
import { deleteTask, updateTask } from '../../features/tasks/taskSlice';
import type { Task } from '../../types/task';
import { useEditTaskModal } from '../../hooks/useEditTaskModal';
import { EditTaskModal } from '../EditTaskModal/EditTaskModal';
import './TaskItem.css';

interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task }: TaskItemProps) {
  const dispatch = useAppDispatch();
  const editModal = useEditTaskModal();

  const toggleCompleted = () => {
    void dispatch(updateTask({ id: task.id, payload: { completed: !task.completed } }));
  };

  const handleDelete = () => {
    void dispatch(deleteTask(task.id));
  };

  const handleSaveEdit = (title: string) => {
    void dispatch(updateTask({ id: task.id, payload: { title } }));
    editModal.close();
  };

  return (
    <>
      <li className={`task-item ${task.completed ? 'task-item--done' : ''}`}>
        <label className="task-item__check">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={toggleCompleted}
            aria-label={`Mark "${task.title}" as ${task.completed ? 'pending' : 'completed'}`}
          />
          <span className="task-item__title">{task.title}</span>
        </label>
        <div className="task-item__actions">
          <button type="button" className="task-item__link" onClick={() => editModal.open(task)}>
            Edit
          </button>
          <button type="button" className="task-item__link task-item__link--danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </li>

      {editModal.task?.id === task.id && (
        <EditTaskModal
          initialTitle={editModal.task.title}
          onClose={editModal.close}
          onSave={handleSaveEdit}
        />
      )}
    </>
  );
}

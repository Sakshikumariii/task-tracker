import { useState, type FormEvent } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { addTask } from '../../features/tasks/taskSlice';
import './TaskInput.css';

export function TaskInput() {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;

    void dispatch(addTask({ title: trimmed }));
    setTitle('');
  };

  return (
    <form className="task-input" onSubmit={handleSubmit}>
      <input
        className="task-input__field"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Enter a task…"
        aria-label="Task title"
      />
      <button className="task-input__button" type="submit">
        Add Task
      </button>
    </form>
  );
}

import { useEffect, useState, type FormEvent } from 'react';
import './EditTaskModal.css';

interface EditTaskModalProps {
  initialTitle: string;
  onClose: () => void;
  onSave: (title: string) => void;
}

export function EditTaskModal({ initialTitle, onClose, onSave }: EditTaskModalProps) {
  const [title, setTitle] = useState(initialTitle);

  useEffect(() => {
    setTitle(initialTitle);
  }, [initialTitle]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    onSave(trimmed);
  };

  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="modal card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-task-title"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="edit-task-title" className="modal__heading">
          Edit task
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            className="modal__input"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            autoFocus
          />
          <div className="modal__actions">
            <button type="button" className="modal__btn modal__btn--ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="modal__btn modal__btn--primary">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

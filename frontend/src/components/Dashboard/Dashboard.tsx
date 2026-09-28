import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchTasks } from '../../features/tasks/taskSlice';
import { TaskInput } from '../TaskInput/TaskInput';
import { TaskList } from '../TaskList/TaskList';
import { TaskStats } from '../TaskStats/TaskStats';
import './Dashboard.css';

export function Dashboard() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.tasks);

  useEffect(() => {
    void dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <main className="dashboard">
      <section className="dashboard__card card">
        <h1 className="dashboard__title">My Daily Tasks</h1>

        {error && (
          <p className="dashboard__error" role="alert">
            {error}
          </p>
        )}

        <TaskInput />

        {loading ? (
          <p className="dashboard__loading">Loading tasks…</p>
        ) : (
          <>
            <TaskList />
            <TaskStats />
          </>
        )}
      </section>
    </main>
  );
}

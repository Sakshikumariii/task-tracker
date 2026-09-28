import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { tasksApi } from '../../api/tasksApi';
import type { CreateTaskPayload, Task, UpdateTaskPayload } from '../../types/task';

export interface TasksState {
  items: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk('tasks/fetchAll', () => tasksApi.getAll());

export const addTask = createAsyncThunk('tasks/add', (payload: CreateTaskPayload) =>
  tasksApi.create(payload),
);

export const updateTask = createAsyncThunk(
  'tasks/update',
  ({ id, payload }: { id: string; payload: UpdateTaskPayload }) =>
    tasksApi.update(id, payload),
);

export const deleteTask = createAsyncThunk('tasks/delete', (id: string) =>
  tasksApi.remove(id).then(() => id),
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    clearTaskError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to load tasks';
      })
      .addCase(addTask.pending, (state) => {
        state.error = null;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.error = action.error.message ?? 'Failed to add task';
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.items.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.error = action.error.message ?? 'Failed to update task';
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t.id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.error = action.error.message ?? 'Failed to delete task';
      });
  },
});

export const { clearTaskError } = taskSlice.actions;
export default taskSlice.reducer;

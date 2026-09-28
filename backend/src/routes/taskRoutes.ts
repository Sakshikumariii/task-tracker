import { Router } from 'express';
import { Task } from '../models/Task.js';

export const taskRoutes = Router();

/** GET /api/tasks */
taskRoutes.get('/', async (_req, res, next) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
});

/** POST /api/tasks */
taskRoutes.post('/', async (req, res, next) => {
  try {
    const title = typeof req.body?.title === 'string' ? req.body.title.trim() : '';
    if (!title) {
      res.status(400).json({ message: 'Title is required' });
      return;
    }
    const task = await Task.create({ title, completed: false });
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
});

/** PUT /api/tasks/:id */
taskRoutes.put('/:id', async (req, res, next) => {
  try {
    const updates: { title?: string; completed?: boolean } = {};
    if (typeof req.body?.title === 'string') {
      const title = req.body.title.trim();
      if (!title) {
        res.status(400).json({ message: 'Title cannot be empty' });
        return;
      }
      updates.title = title;
    }
    if (typeof req.body?.completed === 'boolean') {
      updates.completed = req.body.completed;
    }

    const task = await Task.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    res.json(task);
  } catch (error) {
    next(error);
  }
});

/** DELETE /api/tasks/:id */
taskRoutes.delete('/:id', async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

import type { ErrorRequestHandler } from 'express';
import mongoose from 'mongoose';

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err);

  if (err instanceof mongoose.Error.CastError) {
    res.status(400).json({ message: 'Invalid task id' });
    return;
  }

  res.status(500).json({ message: 'Internal server error' });
};

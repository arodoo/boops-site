
import { Request, Response, NextFunction } from 'express';

export const handleAsyncErrors = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// For functions related to handle errors 
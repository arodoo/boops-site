import { Request, Response, NextFunction } from 'express'
import { registerUser, loginUser } from '../services/userService'
import { validateEmailAndPassword } from '../middlewares/validationMiddleware';
import { handleAsyncErrors } from '../middlewares/errorHandlersMiddleware';

export const registerUserController = handleAsyncErrors(async (req: Request, res: Response): Promise<void> => {
  if (!validateEmailAndPassword(req, res)) return;
  const {email, password } = req.body;
  const userCredential = await registerUser(email, password);
  res.status(201).send(userCredential.user);
})

export const loginUserController = handleAsyncErrors(async (req: Request, res: Response): Promise<void> => {
  if (!validateEmailAndPassword(req, res)) return;
  const {email, password } = req.body;
  const userCredential = await loginUser(email, password);
  res.status(200).send(userCredential.user);
})
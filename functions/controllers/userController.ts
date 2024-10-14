import { Request, Response } from 'express'
import { registerUser, loginUser } from '../services/userService'

const validRequest = (req: Request, res: Response): boolean => {
  const {email, password} = req.body
}

/* export const registerUserController = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400).send('Email and password are required');
    return;
  }

  try {
    const userCredential = await registerUser(email, password)
    res.status(201).send(userCredential.user)
  } catch (error: any) {
    res.status(400).send(`Error Registering User: ${error.message}`);
  }
}

export const loginUserController = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400).send('Email and password are required');
    return;
  }

  try {
    const userCredential = await loginUser(email, password)
    res.status(200).send(userCredential.user)
  } catch (error: any) {
    res.status(400).send(`Error Logging In User: ${error.message}`);
  }
} */

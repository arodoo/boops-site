import { Request, Response } from 'express'
import { registerUser, loginUser } from '../services/userService'

export const registerUserController = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body

  try {
    const userCredential = await registerUser(email, password)
    res.status(201).send(userCredential.user)
  } catch (error: any) {
    res.status(400).send(error.message)
  }
}

export const loginUserController = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body

  try {
    const userCredential = await loginUser(email, password)
    res.status(200).send(userCredential.user)
  } catch (error: any) {
    res.status(400).send(error.message)
  }
}

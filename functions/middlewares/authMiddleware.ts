import { getAuth } from 'firebase/auth'
import { Request, Response, NextFunction } from 'express'
import app from '../config/firebaseConfig'

const auth = getAuth(app)

export const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.headers.authorization?.split(' ')[1]

  if (token == null) {
    res.status(401).send('Unauthorized')
    return
  }

  try {
    const decodedToken = await auth.currentUser?.getIdTokenResult()
    if (decodedToken?.token !== token) {
      res.status(401).send('Unauthorized')
    }
    (req as any).user = decodedToken
    next()
  } catch (error) {
    res.status(401).send('Unauthorized')
  }
}

export const checkAdminRole = (req: Request, res: Response, next: NextFunction): void => {
  const user = req as any
  if (user.claims.admin) {
    next()
  } else {
    res.status(403).send('Forbidden')
  }
}

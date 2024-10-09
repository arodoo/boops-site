import { getAuth } from 'firebase/auth'
import { Request, Response, NextFunction } from 'express'
import app from '../config/firebaseConfig'

const auth = getAuth(app)

const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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

export default verifyToken

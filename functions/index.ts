import express from 'express'
import * as dotenv from 'dotenv'
import userRoutes from './routes/userRoutes'
import { verifyToken } from './middlewares/authMiddleware'

dotenv.config()

const app = express()
app.use(express.json()) // midleware wich transform the body of the request in json

app.get('/ping', (_req, res) => {
  console.log('Someone pinged me')
  res.send('pong')
})

app.use('/api/users', userRoutes)

app.get('/api/protected', verifyToken, (req, res) => {
  res.send('This is a protected route')
})

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})

export default app

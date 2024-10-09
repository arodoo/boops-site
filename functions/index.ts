import express from 'express'
import * as dotenv from 'dotenv'

const app = express()
app.use(express.json()) // midleware wich transform the body of the request in json

const PORT = 3000

dotenv.config()

app.get('/ping', (_req, res) => {
  console.log('Someone pinged me')
  res.send('pong')
})

app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`)
})

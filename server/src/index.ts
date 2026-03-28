import './env'
import 'express-async-errors'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import jobsRouter from './routes/jobs'

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(helmet())
app.use(morgan('dev'))
app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.use('/api/jobs', jobsRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export default app

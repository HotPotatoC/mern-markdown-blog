import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'

import './database'
import router from './routes'

dotenv.config()

const app = express()
const port = process.env.PORT

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', router)

app.get('/', (req, res) => {
  res.send('Welcome')
})

app.get('/_status', (req, res) => {
  res.status(200).json({
    uptime: process.uptime(),
  })
})

app.listen(port, () =>
  console.log('\u26A1 Server started -> http://localhost:' + port)
)

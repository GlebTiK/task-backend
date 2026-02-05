const express = require('express')
const cors = require('cors')
require('dotenv').config()

const routes = require('./routes')

const app = express()

app.use(cors({ origin: process.env.CORS_ORIGIN || true, credentials: false }))
app.use(express.json())

app.use('/api', routes)

app.use((err, req, res, next) => {
  res.status(500).json({ error: 'server_error' })
})

module.exports = app

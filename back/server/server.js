const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const authRoutes = require('./routes/auth')
const requestRoutes = require('./routes/request')
const app = express()
const ports = process.env.PORT || 3000
app.use(bodyParser.json())
app.use(cors())
app.use('/auth', authRoutes)
app.use('/request', requestRoutes)


app.get('/', (req, res) => {
  res.send('Hello, i`am work')
})

app.listen(ports, () => console.log(`Connection to port ${ports}`))

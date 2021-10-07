const mysql = require('mysql2')

const config = require('../config/config.json')

module.exports = conn = mysql.createConnection({
  host: config.host,
  user: config.user,
  database: config.database,
  password: config.password
})

conn.connect(err => {
  if (err) {
    console.log(err)
  } else {
    console.log('Database connect')
  }
})

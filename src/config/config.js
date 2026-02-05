require('dotenv').config()

const production = {
  dialect: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  logging: false
}

const development = Object.assign({}, production, { logging: true })

const test = {
  dialect: 'mysql',
  host: process.env.DB_HOST_TEST || process.env.DB_HOST,
  port: Number(process.env.DB_PORT_TEST || process.env.DB_PORT || 3306),
  database: process.env.DB_NAME_TEST || process.env.DB_NAME,
  username: process.env.DB_USER_TEST || process.env.DB_USER,
  password: process.env.DB_PASSWORD_TEST || process.env.DB_PASSWORD,
  logging: true
}

module.exports = {
  development,
  test,
  production
}

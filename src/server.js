require('dotenv').config({
  path: 
    process.env.NODE_ENV === 'test' ? '.env.test' : 
    process.env.NODE_ENV === 'production' ? '.env' : 
    '.env.dev'
})
const app = require('./app')
const { sequelize } = require('./models')

const port = Number(process.env.PORT || 4000)

sequelize.authenticate().then(() => {
  app.listen(port)
}).catch((e) => {
  console.log(e)
  process.exit(1)
})

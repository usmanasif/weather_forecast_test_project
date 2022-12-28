const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const MainRoutes = require('./src/routes')
const viewPath = require('./src/middleware/viewPath')

// Using env variables
dotenv.config()

const PORT = process.env.PORT || 8080

// Start Express App in node server
const app = express()
app.use(express.json())

// Static folder
app.use('/static', express.static(path.join(__dirname, '/src/public')))

// Setting view templating engine
app.set('view engine', 'ejs')

// Setting default view folder
app.set('views', path.join(__dirname, '/src/views'))

// Using MainRouter
app.use('/', viewPath, MainRoutes)

app.listen(PORT, () => {
  console.log(PORT)
  console.log(`started listening to port ${PORT}`)
})

// Error function handler
app.use((err, req, res, next) => {
  res.locals.message = err.message
  const status = err.statusCode || err.status || 500
  res.locals.status = status
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(status).json({
    error: {
      statusCode: status,
      messages: err.message,
    },
  })
})

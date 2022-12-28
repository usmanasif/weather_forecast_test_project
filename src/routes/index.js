const express = require('express')
const HomeRoutes = require('./HomeRoutes')
const WeeklyRoutes = require('./WeeklyRoutes')

class MainRouter {
  constructor() {
    this.router = express.Router()
    this.routes()
  }

  routes() {
    const router = this.router
    router.get('/', HomeRoutes)
    router.use('/weekly', WeeklyRoutes)
  }
}

module.exports = new MainRouter().router

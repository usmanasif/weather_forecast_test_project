const express = require('express')
const WeatherController = require('../controller/WeatherController')

class WeeklyRouter {
  constructor() {
    this.router = express.Router()
    this.routes()
  }
  routes() {
    const router = this.router

    router.get('/', async (req, res, next) => {
      try {
        let data = (
          await new WeatherController().weeklyData(req.query.location)
        ).data
        res.json(data)
      } catch (e) {
        next(e)
      }
    })
  }
}

module.exports = new WeeklyRouter().router

const { Country } = require('country-state-city')
const express = require('express')
const WeatherController = require('../controller/WeatherController')

class HomeRouter {
  constructor() {
    this.router = express.Router()
    this.routes()
  }
  routes() {
    const router = this.router

    router.get('/', async (req, res, next) => {
      res.render('application', {
        viewPath: './index',
        data: { countries: Country.getAllCountries() },
      })
    })
  }
}

module.exports = new HomeRouter().router

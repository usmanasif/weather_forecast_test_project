const ForecaService = require('../services/ForecaServices')

module.exports = class WeatherController {
  async weeklyData(location) {
    return new ForecaService().fetchWeeklyData(location)
  }
}

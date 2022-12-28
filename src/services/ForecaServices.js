const { Axios } = require('axios')
const CustomError = require('../utils/CustomError')
module.exports = class ForecaService extends Axios {
  constructor() {
    super({})
    this.token = process.env.FORECA_TOKEN
    this.url = 'https://fnw-us.foreca.com/'
  }
  async fetchWeeklyData(location) {
    let res = await this.get(
      `${this.url}/api/v1/forecast/daily/${location}?windnit=KMH&dataset=full&token=${this.token}`,
    )
    if (res.status >= 400 && res.status < 500) {
      throw new CustomError(
        res.status,
        'Cannot find weather for selected option',
      )
    }
    return res
  }
}

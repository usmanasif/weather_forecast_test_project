module.exports = class CustomError extends Error {
  constructor(status, message) {
    super()
    this.message = message
    this.statusCode = status
  }
}

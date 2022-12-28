module.exports = (req, res, next) => {
  let path = req._parsedUrl.path.split('/')[1] || ''
  req.viewPath = (file) => {
    return `./${path}/${file}`
  }
  next()
}

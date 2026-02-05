const { Session } = require('../models')

module.exports = async (req, res, next) => {
  try {
    const header = req.headers.authorization || ''
    const [type, token] = header.split(' ')
    if (type !== 'Bearer' || !token) {
      return res.status(401).json({ error: 'missing_token' })
    }
    const session = await Session.findOne({ where: { token } })
    if (!session) {
      return res.status(401).json({ error: 'invalid_token' })
    }
    req.session = session
    next()
  } catch (err) {
    next(err)
  }
}

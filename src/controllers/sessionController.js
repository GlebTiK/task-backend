const crypto = require('crypto')
const { Session } = require('../models')

module.exports = {
  getToken: async (req, res, next) => {
    try {
      const token = crypto.randomBytes(32).toString('hex')
      const session = await Session.create({ token })
      res.json({ token, sessionId: session.id })
    } catch (err) {
      next(err)
    }
  },

  getSession: async (req, res, next) => {
    try {
      res.json({ token: req.session.token, sessionId: req.session.id })
    } catch (err) {
      next(err)
    }
  }
}

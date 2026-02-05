const crypto = require('crypto')
const { Session } = require('../models')

module.exports = {
  getToken: async (req, res) => {
    const token = crypto.randomBytes(32).toString('hex')
    const session = await Session.create({ token })
    res.json({ token, sessionId: session.id })
  },

  getSession: async (req, res) => {
    res.json({ token: req.session.token, sessionId: req.session.id })
  }
}

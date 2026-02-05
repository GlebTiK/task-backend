const request = require('supertest')
const app = require('../app')
const { resetDb, closeDb } = require('./db')

describe('session endpoints', () => {
  beforeEach(async () => {
    await resetDb()
  })

  afterAll(async () => {
    await closeDb()
  })

  test('GET /api/session-token returns token and sessionId', async () => {
    const r = await request(app).get('/api/session-token')
    expect(r.status).toBe(200)
    expect(typeof r.body.token).toBe('string')
    expect(r.body.token.length).toBeGreaterThanOrEqual(64)
    expect(typeof r.body.sessionId).toBe('number')
  })

  test('GET /api/session without token returns 401 missing_token', async () => {
    const r = await request(app).get('/api/session')
    expect(r.status).toBe(401)
    expect(r.body).toEqual({ error: 'missing_token' })
  })

  test('GET /api/session with token returns session info', async () => {
    const t = await request(app).get('/api/session-token')
    const token = t.body.token

    const r = await request(app)
      .get('/api/session')
      .set('Authorization', `Bearer ${token}`)

    expect(r.status).toBe(200)
    expect(r.body.token).toBe(token)
    expect(typeof r.body.sessionId).toBe('number')
  })
})

const request = require('supertest')
const { resetDb, seedWorksheet, closeDb } = require('./db')
const app = require('../app')

describe('worksheet endpoints', () => {
  beforeEach(async () => {
    await resetDb()
    await seedWorksheet()
  })

  afterAll(async () => {
    await closeDb()
  })

  test('GET /api/worksheet/tasks returns tasks with options', async () => {
    const r = await request(app).get('/api/worksheet/tasks')
    expect(r.status).toBe(200)
    expect(Array.isArray(r.body)).toBe(true)
    expect(r.body.length).toBeGreaterThan(0)
    expect(r.body[0]).toHaveProperty('options')
    expect(Array.isArray(r.body[0].options)).toBe(true)
  })

  test('answer flow: submit + read back', async () => {
    const tok = await request(app).get('/api/session-token')
    const token = tok.body.token

    const tasks = await request(app).get('/api/worksheet/tasks')
    const taskId = tasks.body[0].id
    const correctOptionId = tasks.body[0].options[1].id

    const a = await request(app)
      .post(`/api/worksheet/tasks/${taskId}/answer`)
      .set('Authorization', `Bearer ${token}`)
      .send({ optionId: correctOptionId })

    expect(a.status).toBe(200)
    expect(a.body).toEqual({ correct: true })

    const ans = await request(app)
      .get('/api/worksheet/answers')
      .set('Authorization', `Bearer ${token}`)

    expect(ans.status).toBe(200)
    expect(ans.body[0]).toMatchObject({ taskId, optionId: correctOptionId, correct: true })
  })
})

const express = require('express')
const sessionController = require('../controllers/sessionController')
const worksheetController = require('../controllers/worksheetController')
const auth = require('../middleware/auth')

const router = express.Router()

router.get('/session-token', sessionController.getToken)
router.get('/session', auth, sessionController.getSession)
router.get('/worksheet/tasks', worksheetController.getTasks)
router.get('/worksheet/answers', auth, worksheetController.getAnswers)
router.post('/worksheet/tasks/:taskId/answer', auth, worksheetController.answerTask)

module.exports = router

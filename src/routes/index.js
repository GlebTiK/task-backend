const express = require('express')
const sessionController = require('../controllers/sessionController')
const worksheetController = require('../controllers/worksheetController')
const auth = require('../middleware/auth')
const admin = require('../controllers/taskAdminController')


const router = express.Router()

router.get('/session-token', sessionController.getToken)
router.get('/session', auth, sessionController.getSession)
router.get('/worksheet/tasks', worksheetController.getTasks)
router.get('/worksheet/answers', auth, worksheetController.getAnswers)
router.post('/worksheet/tasks/:taskId/answer', auth, worksheetController.answerTask)

router.get('/admin/tasks', admin.getTasks)
router.post('/admin/tasks', admin.postTasks)
router.put('/admin/tasks/:taskId', admin.putTasks)
router.delete('/admin/tasks/:taskId', admin.deleteTasks)


module.exports = router

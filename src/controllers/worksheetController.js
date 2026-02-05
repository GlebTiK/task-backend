const { WorksheetTask, TaskOption, TaskAnswer } = require('../models')

module.exports = {
  getTasks: async (req, res, next) => {
    try {
      const tasks = await WorksheetTask.findAll({
      include: [
        { model: TaskOption, as: 'options', attributes: ['id', 'text'] }
      ],
      order: [
        ['id', 'ASC'],
        [{ model: TaskOption, as: 'options' }, 'id', 'ASC']
      ]
      })
      res.json(tasks)
    } catch (err) {
      next(err)
    }
  },

  getAnswers: async (req, res, next) => {
    try {
    const sessionId = req.session.id
    const answers = await TaskAnswer.findAll({
      where: { session_id: sessionId },
      include: [
        { model: TaskOption, attributes: ['id', 'is_correct'] }
      ],
      order: [['task_id', 'ASC']]
    })

      res.json(answers.map(a => ({
      taskId: a.task_id,
      optionId: a.option_id,
      correct: Boolean(a.TaskOption && a.TaskOption.is_correct)
      })))
    } catch (err) {
      next(err)
    }
  },

  answerTask: async (req, res, next) => {
    try {
    const taskId = Number(req.params.taskId)
    const optionId = Number(req.body.optionId)
    if (!Number.isFinite(taskId) || !Number.isFinite(optionId)) {
      return res.status(400).json({ error: 'invalid_payload' })
    }

    const option = await TaskOption.findOne({ where: { id: optionId, task_id: taskId }, attributes: ['id', 'is_correct'] })
    if (!option) {
      return res.status(404).json({ error: 'option_not_found' })
    }

    const sessionId = req.session.id
    const existing = await TaskAnswer.findOne({ where: { session_id: sessionId, task_id: taskId } })
    if (existing) {
      existing.option_id = optionId
      await existing.save()
    } else {
      await TaskAnswer.create({ session_id: sessionId, task_id: taskId, option_id: optionId })
    }

      res.json({ correct: Boolean(option.is_correct) })
    } catch (err) {
      next(err)
    }
  }
}

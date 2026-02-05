const { sequelize, WorksheetTask, TaskOption } = require('../models')

let closed = false

async function resetDb() {
  await sequelize.sync({ force: true })
}

async function seedWorksheet() {
  const task = await WorksheetTask.create({ instruction: 'Pick the correct option' })
  const options = await TaskOption.bulkCreate([
    { task_id: task.id, text: 'Option A', is_correct: false },
    { task_id: task.id, text: 'Option B', is_correct: true }
  ])
  return { task, options }
}

module.exports = { resetDb, seedWorksheet, sequelize }

module.exports.closeDb = async function closeDb() {
  if (closed) return
  closed = true
  await sequelize.close()
}

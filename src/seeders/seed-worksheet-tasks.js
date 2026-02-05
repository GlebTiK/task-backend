'use strict'

module.exports = {
  up: async (queryInterface) => {
    const now = new Date()

    await queryInterface.bulkInsert('worksheet_tasks', [
      { id: 1, instruction: 'Which color is the sky on a clear day?', created_at: now, updated_at: now },
      { id: 2, instruction: 'What is 2 + 2?', created_at: now, updated_at: now },
      { id: 3, instruction: 'Which animal is a mammal?', created_at: now, updated_at: now }
    ])

    await queryInterface.bulkInsert('task_options', [
      { id: 1, task_id: 1, text: 'Green', is_correct: false, created_at: now, updated_at: now },
      { id: 2, task_id: 1, text: 'Blue', is_correct: true, created_at: now, updated_at: now },
      { id: 3, task_id: 1, text: 'Red', is_correct: false, created_at: now, updated_at: now },
      { id: 4, task_id: 1, text: 'Yellow', is_correct: false, created_at: now, updated_at: now },

      { id: 5, task_id: 2, text: '3', is_correct: false, created_at: now, updated_at: now },
      { id: 6, task_id: 2, text: '4', is_correct: true, created_at: now, updated_at: now },
      { id: 7, task_id: 2, text: '5', is_correct: false, created_at: now, updated_at: now },
      { id: 8, task_id: 2, text: '22', is_correct: false, created_at: now, updated_at: now },

      { id: 9, task_id: 3, text: 'Shark', is_correct: false, created_at: now, updated_at: now },
      { id: 10, task_id: 3, text: 'Whale', is_correct: true, created_at: now, updated_at: now },
      { id: 11, task_id: 3, text: 'Eagle', is_correct: false, created_at: now, updated_at: now },
      { id: 12, task_id: 3, text: 'Lizard', is_correct: false, created_at: now, updated_at: now }
    ])
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('task_answers', null, {})
    await queryInterface.bulkDelete('task_options', null, {})
    await queryInterface.bulkDelete('worksheet_tasks', null, {})
  }
}

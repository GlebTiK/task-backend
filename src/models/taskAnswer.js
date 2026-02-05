'use strict'

module.exports = (sequelize, DataTypes) => {
  const TaskAnswer = sequelize.define('TaskAnswer', {
    task_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    option_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    session_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    }
  }, {
    tableName: 'task_answers',
    underscored: true,
    indexes: [
      { unique: true, fields: ['session_id', 'task_id'] }
    ]
  })

  TaskAnswer.associate = models => {
    TaskAnswer.belongsTo(models.Session, { foreignKey: 'session_id' })
    TaskAnswer.belongsTo(models.WorksheetTask, { foreignKey: 'task_id' })
    TaskAnswer.belongsTo(models.TaskOption, { foreignKey: 'option_id' })
  }

  return TaskAnswer
}

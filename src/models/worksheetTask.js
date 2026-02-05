'use strict'

module.exports = (sequelize, DataTypes) => {
  const WorksheetTask = sequelize.define('WorksheetTask', {
    instruction: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'worksheet_tasks',
    underscored: true
  })

  WorksheetTask.associate = models => {
    WorksheetTask.hasMany(models.TaskOption, { foreignKey: 'task_id', as: 'options' })
    WorksheetTask.hasMany(models.TaskAnswer, { foreignKey: 'task_id' })
  }

  return WorksheetTask
}

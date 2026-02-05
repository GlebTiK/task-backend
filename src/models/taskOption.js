'use strict'

module.exports = (sequelize, DataTypes) => {
  const TaskOption = sequelize.define('TaskOption', {
    text: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    is_correct: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    tableName: 'task_options',
    underscored: true
  })

  TaskOption.associate = models => {
    TaskOption.belongsTo(models.WorksheetTask, { foreignKey: 'task_id', as: 'task' })
    TaskOption.hasMany(models.TaskAnswer, { foreignKey: 'option_id' })
  }

  return TaskOption
}

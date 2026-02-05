'use strict'

module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define('Session', {
    token: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'sessions',
    underscored: true
  })

  Session.associate = models => {
    Session.hasMany(models.TaskAnswer, { foreignKey: 'session_id' })
  }

  return Session
}

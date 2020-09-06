'use strict';
const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  const ActionGroups = sequelize.define(
    'ActionGroups',
    {
      name: DataTypes.STRING(50),
      description: DataTypes.STRING(100),
    },
    {
      // tableName: 'action_groups'
    }
  );

  ActionGroups.associate = models => {
    ActionGroups.hasMany(models.Actions);
  };

  return ActionGroups;
};

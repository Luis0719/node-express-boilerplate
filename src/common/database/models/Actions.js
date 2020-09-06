'use strict';
const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  const Actions = sequelize.define(
    'Actions',
    {
      uri: DataTypes.STRING,
      method: DataTypes.STRING,
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      group_id: DataTypes.INTEGER,
    },
    {
      tableName: 'actions',
    }
  );

  Actions.associate = models => {
    Actions.belongsTo(models.ActionGroups);
    Actions.hasMany(models.RoleActions);
  };

  return Actions;
};

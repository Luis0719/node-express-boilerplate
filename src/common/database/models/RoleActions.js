'use strict';
const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  const RoleActions = sequelize.define(
    'RoleActions',
    {
      role: DataTypes.STRING,
      action_id: DataTypes.INTEGER,
    },
    {
      tableName: 'role_actions',
    }
  );

  RoleActions.associate = models => {
    RoleActions.belongsTo(models.Roles, {
      foreignKey: 'role',
      foreignKeyConstraint: true,
    });
    RoleActions.belongsTo(models.Actions, { foreignKeyConstraint: true });
  };

  return RoleActions;
};

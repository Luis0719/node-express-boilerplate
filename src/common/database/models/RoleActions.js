"use strict";
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const RoleActions = sequelize.define(
    "RoleActions",
    {
      role_id: DataTypes.STRING,
      action_id: DataTypes.INTEGER,
    },
    {
      tableName: "role_actions",
    }
  );

  RoleActions.associate = (models) => {
    RoleActions.belongsTo(models.Roles);
    RoleActions.belongsTo(models.Actions);
  };

  return RoleActions;
};

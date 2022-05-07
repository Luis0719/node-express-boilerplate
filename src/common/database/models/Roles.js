"use strict";
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Roles = sequelize.define(
    "Roles",
    {
      name: DataTypes.STRING,
      is_admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: "roles",
      paranoid: false,
    }
  );

  Roles.associate = (models) => {
    Roles.hasMany(models.RoleActions, { onDelete: "CASCADE" });
  };

  return Roles;
};

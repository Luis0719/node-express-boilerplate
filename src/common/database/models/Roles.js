'use strict';
const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  const Roles = sequelize.define(
    'Roles',
    {
      name: DataTypes.STRING,
    },
    {
      // tableName: 'roles',
    }
  );

  Roles.associate = models => {
    Roles.hasMany(models.RoleActions, { foreignKey: 'role' });
  };

  return Roles;
};

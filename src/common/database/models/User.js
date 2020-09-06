'use strict';
const { DataTypes } = require('sequelize');
const { bcrypt } = require('../../utils');

module.exports = sequelize => {
  const Users = sequelize.define(
    'Users',
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      image: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      roles: DataTypes.ARRAY(DataTypes.STRING),
    },
    {
      tableName: 'users',
    }
  );

  Users.associate = models => {};

  Users.prototype.setPassword = async password => {
    this.password = await bcrypt.hash(password); // TODO encrypt
  };

  Users.prototype.getFullName = () => {
    return `${this.firstName} ${this.lastName}`;
  };

  return Users;
};

/* eslint-disable new-cap */
"use strict";
const { DataTypes } = require("sequelize");
const crypto = require("../../crypto");

const ADMIN_ID = 0;

module.exports = (sequelize) => {
  const Users = sequelize.define(
    "Users",
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      image: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      roles: DataTypes.ARRAY(DataTypes.STRING),

      // Virtuals
      full_name: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.first_name} ${this.last_name}`;
        },
        set(value) {
          throw new Error("Do not try to set the `fullName` value!");
        },
      },
    },
    {
      tableName: "users",
    }
  );

  Users.associate = (models) => {};

  Users.prototype.setPassword = async function (password) {
    this.password = await crypto.hash(password);
  };

  Users.prototype.passwordMatch = function (password) {
    return crypto.compare(password, this.password);
  };

  Users.prototype.isAdmin = function () {
    return this.roles.includes(ADMIN_ID);
  };

  Users.isAdmin = function (user) {
    return user.roles.includes(ADMIN_ID);
  };

  Users.beforeCreate(async (user, options) => {
    await user.setPassword(user.password);
  });

  return Users;
};

const { Roles } = require("../../../../src/common/database").models;

const defaultAttrs = {
  name: "test",
  isAdmin: false,
  actions: [],
};

module.exports = {
  Model: Roles,
  defaultAttrs,
};

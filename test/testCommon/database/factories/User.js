const { Users } = require("../../../../src/common/database").models;

const defaultAttrs = {
  first_name: "firstname",
  last_name: "lastname",
  username: "test",
  password: "testpass",
  roles: [],
};

module.exports = {
  Model: Users,
  defaultAttrs,
};

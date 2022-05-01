const { ActionGroups } = require("../../../../src/common/database").models;

const defaultAttrs = {
  name: "test",
  description: "",
};

module.exports = {
  Model: ActionGroups,
  defaultAttrs,
};

const { Actions } = require("../../../../src/common/database").models;

const defaultAttrs = {
  uri: "/some/endpoint",
  method: "get",
  name: "test",
  description: "",
};

module.exports = {
  Model: Actions,
  defaultAttrs,
};

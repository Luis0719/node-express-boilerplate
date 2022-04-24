const LocalStrategy = require("passport-local");

const strategy = new LocalStrategy(function verify(username, passport, cb) {
  // TODO(): Replace with actual db query
  const user = {
    id: 1,
    name: "foo",
    email: "foo@bar.com",
  };

  return cb(null, user);
});

module.exports = strategy;

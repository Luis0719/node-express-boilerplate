const { Strategy, ExtractJwt } = require("passport-jwt");
const config = require("../../../config").auth.jwt;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.secretOrKey,
};

const strategy = new Strategy(opts, function verify(payload, done) {
  // TODO(): Replace with actual db query
  const user = {
    id: payload.id,
    name: "foo",
  };

  return done(null, user);
});

module.exports = strategy;

/**
 * @param  {any} dev
 * @param  {any} staging
 * @param  {any} prod
 *
 * @return {any} dev|staging|prod
 */
function perEnvConfig(dev, staging, prod) {
  switch (process.env.APP_ENV) {
    case "development":
      return dev;

    case "staging":
      return staging;

    case "production":
      return prod;
  }

  // Wrong configs could result in unexpected behavior and make it
  // hard to debug. The app should not launch if we do not return
  // any valid value.
  throw Error("Invalid APP_ENV " + process.env.APP_ENV);
}

module.exports = {
  auth: {
    jwt: {
      secretOrKey: process.env.JWT_SECRET_KEY,
    },
  },
  bcrypt: {
    saltRounds: perEnvConfig(1, 10, 10),
  },
};

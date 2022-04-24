function PerEnvConfig(dev, staging, prod) {
  switch (process.env.APP_ENV) {
    case 'development':
      return dev;

    case 'staging':
      return staging;

    case 'production':
      return prod;
  }

  // Wrong configs could result in unexpected behavior and make it
  // hard to debug. The app should not launch if we do not return
  // any valid value.
  throw Error("Invalid APP_ENV " + process.env.APP_ENV);
}

module.exports = {
  bcrypt: {
    salt: PerEnvConfig(1, 10, 10),
  }
}
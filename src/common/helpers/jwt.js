const jwt = require("jsonwebtoken");
const config = require("../../../config").auth.jwt;
/**
 * @param  {any} data
 * @param  {Object} options={}
 * @return {jwt.Token} jwt token
 */
function sign(data, options = {}) {
  if (!data) {
    throw Error("Cannot sign undefined data");
  }

  const tokenPromise = new Promise((resolve, reject) => {
    jwt.sign(
      {
        data,
      },
      config.secretOrKey,
      {
        expiresIn: options.expiration || config.expiration,
        algorithm: options.algorithm || config.algorithm,
      },
      (err, token) => {
        if (err) reject(err);

        resolve(token);
      }
    );
  });

  return tokenPromise;
}
/**
 * @param  {String} token
 * @param  {Object} options={}
 * @return {Any} decoded token
 */
function verify(token, options = {}) {
  if (!token) {
    throw Error("Cannot verify undefined token");
  }

  const decodePromise = new Promise((resolve, reject) => {
    jwt.verify(
      token,
      config.secretOrKey,
      {
        ignoreExpiration: options.ignoreExpiration || false,
        algorithm: options.algorithm || config.algorithm,
      },
      (err, decoded) => {
        if (err) reject(err);

        resolve(decoded);
      }
    );
  });

  return decodePromise;
}

module.exports = {
  sign,
  verify,
};

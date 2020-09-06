const bcrypt = require('bcrypt');
const { bcrypt: config } = require('config');

const hash = async plainText => bcrypt.hash(plainText, config.saltRounds);
const compare = async (plainText, hash) => bcrypt.compare(plainText, hash);

module.exports = {
  compare,
  hash,
};

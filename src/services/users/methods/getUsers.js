const { db } = require('common');
const { Users } = db.models;

module.exports = options => Users.findAll(options);

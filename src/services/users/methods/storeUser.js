const { db } = require('common');
const { User } = db.models;

module.exports = payload => User.create(payload);

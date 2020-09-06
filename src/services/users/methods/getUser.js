const { db } = require('common');
const { Users } = db.models;

module.exports = id => Users.findByPk(id);

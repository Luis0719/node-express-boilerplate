const { db } = require('common');
const { Users } = db.models;

module.exports = async data => {
  const user = Users.build(data);
  await user.setPassword(data.password);

  return user.save();
};

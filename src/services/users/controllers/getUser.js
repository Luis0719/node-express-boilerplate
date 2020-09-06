const { getUser } = require('../methods');

module.exports = async (req, res) => {
  const user = await getUser(req.params.id);
  res.send(user);
};

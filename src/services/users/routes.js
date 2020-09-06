const controllers = require('./controllers');

module.exports = router => {
  router.get('/users', controllers.getUsers);
  router.get('/users/:id', controllers.getUser);
};

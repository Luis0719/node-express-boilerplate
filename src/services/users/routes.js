const controllers = require('./controllers');

module.exports = router => {
  router.get('/users', controllers.getUsers);
  router.post('/users', controllers.storeUser);
  router.get('/users/:id', controllers.getUser);
};

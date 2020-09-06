const services = ['auth', 'users'];

module.exports = router => {
  // Load default routes
  require('./routes')(router);

  // Load routes for all the registered services
  services.forEach(service => {
    require(`./${service}/routes`)(router);
  });
};

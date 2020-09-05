const services = [
    'auth',
    'users',
]

module.exports = (router) => {
    services.forEach((service) => {
        require(`./${service}/routes`)(router);
    });

    router.get('/', (req, res, next) => {
        res.send('Hello world');
    });
}
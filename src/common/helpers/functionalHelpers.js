const to = (promise, enhanceError) => {
  return promise
    .then(data => [null, data])
    .catch(e => {
      Object.assign(e, enhanceError);

      return [e, null];
    });
};

module.exports = {
  to,
};

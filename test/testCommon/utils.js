/**
 * @param  {Object} options={}
 * @return {Object} mock request
 */
function mockRequest(options = {}) {
  return {
    logger: {
      info: () => {},
      warn: () => {},
      error: () => {},
    },
    ...options,
  };
}

module.exports = {
  mockRequest,
};

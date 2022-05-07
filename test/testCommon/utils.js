const _ = require("lodash");

/**
 * Add query params to url
 * @param  {String} url
 * @param  {Object} params key-value pairs of query params
 * @return {String} result
 */
function urlWithQueryParams(url, params) {
  if (Object.keys(params).length === 0) {
    return url;
  }

  let result = url + "?";

  params = Object.entries(params).map((param) => param.join("="));
  result += params.join("&");

  return result;
}

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
  urlWithQueryParams,
};

const jwt = require("../../src/common/helpers/jwt");

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
 * @param  {SuperTest.Request} request
 * @param  {int} id
 * @return {SuperTest.Request} request with authorized headers
 */
async function authorizeJwt(request, id) {
  const jwtToken = await jwt.sign({ id });
  return request.set("authorization", "Bearer " + jwtToken);
}

module.exports = {
  authorizeJwt,
  urlWithQueryParams,
};

/**
 * Returns 200 http code with empty response
 * @param  {Express.Response} res
 * @return {Express.Response}
 */
function ok(res) {
  return res.status(200).end();
}

/**
 * Returns 200 http code with json content
 * @param  {Express.Response} res
 * @param  {any} data data to return
 * @return {Express.Response}
 */
function content(res, data) {
  return res.status(200).json(data);
}
/**
 * Returns 204 http code
 * @param  {Express.Response} res
 * @return {Express.Response}
 */
function noContent(res) {
  return res.status(204).end();
}

module.exports = {
  content,
  noContent,
  ok,
};

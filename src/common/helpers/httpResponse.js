function ok(res) {
  return res.send();
}

function noContent(res) {
  return res.send().status(204);
}

module.exports = {
  noContent,
  ok,
}
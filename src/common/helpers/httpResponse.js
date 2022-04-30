function ok(res) {
  return res.end();
}

function content(res, data) {
  return res.json(data);
}

function noContent(res) {
  return res.send().status(204);
}

module.exports = {
  content,
  noContent,
  ok,
}
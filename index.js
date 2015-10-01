// Simply remove the trailing slash
module.exports = function(req, res, next) {
  if(req.url.length > 1 && req.url.substr(-1) == '/') {
    return res.redirect(301, req.url.slice(0, -1));
  }
  next();
};

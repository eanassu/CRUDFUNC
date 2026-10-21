function requireLogin(req, res, next) {
  if (!req.session || !req.session.login) {
    return res.redirect('/login');
  }
  next();
}

module.exports = { requireLogin };


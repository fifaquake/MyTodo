exports.logout = function (req, res) {
  req.session.user = null;

  return res.redirect('/');
};
module.exports = {
  asyncErrorHandler: (fn) =>
    (req, res, next) => {
      Promise.resolve(fn(req, res, next))
        .catch(next);
    },
  isLoggedIn: async (req, res, next) => {
    if (req.isAuthenticated()) return next();
    req.session.error = 'You need to be logged in to do that!';
    req.session.redirectTo = req.originalUrl;
    res.redirect('/login');
  }
}

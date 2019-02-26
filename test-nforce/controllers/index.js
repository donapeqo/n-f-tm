var User = require('../models/user');
var org = require('../lib/connection');
var nforce = require('nforce');

module.exports = {

  // GET /index Home
  async indexPage(req, res, next) {
    res.render('index', { title: 'TMUSA Index' });
  },
  // GET /register
  getRegister(req, res, next) {
    res.render('register', {title: 'Register', username: '', company: '', email: '' })
  },
  // POST /register
  async postRegister(req, res, next) {
    try {
      // eval(require('locus'));
      const user = await User.register(new User(req.body), req.body.password);
      req.login(user, function(err) {
        if (err) return next(err);
        req.session.success = `Welcome to TM's Website, ${user.username}!`;
        res.redirect('/index');
      });
    } catch (err) {
      const { username, email } = req.body;
      let error = err.message;
      if (error.includes('duplicate') && error.includes('index: email_1 dup key')) {
        error = 'A user with the given email is already registered';
      }
      res.render('register', { title: 'Register', username, email, error });
    }
  },
  // GET /login
  getLogin(req, res, next) {
    if(req.isAuthenticated()) return res.redirect('/');
    if (req.query.returnTo) req.session.redirectTo = req.headers.referer;
    res.render('login', {title: 'Login'})
  },
  // POST /login
  async postLogin(req, res, next) {
    const { username, password } = req.body;
    const { user, error } = await User.authenticate()(username, password);
    if (!user && error) return next(error);
    req.login(user, function(err) {
      if (err) return next(err);
      req.session.success = `Welcome back, ${username}!`;
      const redirectUrl = req.session.redirectTo || '/';
      delete req.session.redirectTo;
      res.redirect(redirectUrl);
    });
  },

  // GET /logout
  getLogout(req, res, next) {
    req.logout();
    res.redirect('/');
  }
}

/*For future log references*/
// console.log("====results records below =============== ");
// console.log(results.records[0]);
// console.log("====results records.fields below =============== ");
// console.log(JSON.stringify(results.records[0]._fields));
// var results = JSON.stringify(results.records);

// console.log("==== Results in JSON Stringify below =============== ");
// console.log(results.records);
// console.log("==== Results in records after initialized =============== ");
// console.log(records[0]._fields.account__r.Name);
// console.log("==== Results Of For Loop =============== ");
// for (var i = 0; i < records.length; i++) {
  //   console.log(records[i]._fields.account__r.Name);
  // }
  // for (var i = 0; i < 10; i++) {
    //   console.log(records[i]);
    // }

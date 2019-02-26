var express = require('express');
var router = express.Router();
var nforce = require('nforce');
var org = require('../lib/connection');
var { asyncErrorHandler, isLoggedIn } = require('../middleware');
var {
  landingPage,
  indexPage,
  getRegister,
  postRegister,
  getLogin,
  postLogin,
  getLogout
} = require('../controllers');


/* GET home page. */
router.get('/', asyncErrorHandler(indexPage));

/* GET /register */
router.get('/register', getRegister);

/* POST /register */
router.post('/register', asyncErrorHandler(postRegister));

/* GET /login */
router.get('/login', getLogin);

/* POST /login */
router.post('/login', asyncErrorHandler(postLogin));

/* GET /logout */
router.get('/logout', getLogout);

module.exports = router;

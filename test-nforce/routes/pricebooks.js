var express = require('express');
var router = express.Router();
var nforce = require('nforce');
var org = require('../lib/connection');
var { asyncErrorHandler, isLoggedIn } = require('../middleware');
var {
  getPricebook,
  getAccounts,
  getContacts,
  getCreateAcc,
  getCreateCont,
  postCreateAcc,
  postCreateCont,
  postDestroyAcc,
  postDestroyCont
} = require('../controllers/pricebooks')

router.get('/', isLoggedIn, asyncErrorHandler(getPricebook));

router.get('/accounts', isLoggedIn, asyncErrorHandler(getAccounts));

router.get('/contacts', isLoggedIn, asyncErrorHandler(getContacts));

router.get('/create-account', getCreateAcc);

router.get('/create-contact', getCreateCont);

router.post('/create-account', isLoggedIn, asyncErrorHandler(postCreateAcc));

router.post('/create-contact', isLoggedIn, asyncErrorHandler(postCreateCont));

router.post('/delete-account/:id', isLoggedIn, asyncErrorHandler(postDestroyAcc));

router.post('/delete-contact/:id', isLoggedIn, asyncErrorHandler(postDestroyCont));

router.get('/account/:id', function(req, res) {
  res.send("Account Created : " + req.params.id);
});

router.get('/test/query', function(req, res) {
  var query = 'SELECT Id, Name, CreatedDate FROM Account ORDER BY CreatedDate DESC LIMIT 5';
  org.query({query: query, oauth: req.session.oauth}, function(err, resp) {
    if(!err) {
      res.render('query', {
        title: 'query results',
        records: resp.records
      });
    } else {
      res.send(err.message);
    }
  });
});

module.exports = router;

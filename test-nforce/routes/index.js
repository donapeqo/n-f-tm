var express = require('express');
var router = express.Router();
var nforce = require('nforce');
var org = require('../lib/connection');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Force.com Sample' });
});

router.get('/create-account', function(req, res, next) {
  res.render('create-account', { title: 'Create Account'});
});

router.get('/create-contact', function(req, res, next) {
  res.render('create-contact', { title: 'Create Contact'});
});

router.get('/accounts', function(req, res, next) {

  org.query({ query: "Select Id, Name, Type, Industry, Rating From Account Order By LastModifiedDate DESC" })
    .then(function(results){
      res.render('index-accounts', { records: results.records });
    });

});

router.get('/contacts', function(req, res, next) {

  org.query({ query: "Select Id, Name, Email, Phone From Contact Order By Name" })
    .then(function(results){
      console.log('contacts: %s', String(results.records));
      res.render('index-contacts', { records: results.records });
    });

});

router.post('/create-account', function(req, res, next) {
  var acc = nforce.createSObject('Account');
  acc.set('Name', req.body.name);
  acc.set('Industry', req.body.industry);
  acc.set('Type', req.body.type);


  org.insert({ sobject: acc })
    .then(function(account){
      res.render('message', {title: 'Account Created: ' + String(account.id) });
    })
});

router.post('/create-contact', function(req, res, next) {
  var cont = nforce.createSObject('Contact');
  cont.set('FirstName', req.body.firstname);
  cont.set('LastName', req.body.lastname);
  cont.set('Phone', req.body.phone); 
  cont.set('Email', req.body.email);
 


  org.insert({ sobject: cont })
    .then(function(contact){
      res.render('message', {title: 'Contact Created: ' + String(contact.id) });
    })
});

router.post('/delete-account', function(req, res, next) {

  var acc = nforce.createSObject('Account');
  acc.set('Id', req.body.id);
  console.log('id: %s', req.body.id);
  org.delete({ sobject: acc })
    .then(function(account){
      res.render('message', {title: 'Account Deleted: ' +  String(req.body.id) });
    });
});

router.post('/delete-contact', function(req, res, next) {

  var acc = nforce.createSObject('Contact');
  acc.set('Id', req.body.id);
  console.log('id: %s', req.body.id);
  org.delete({ sobject: acc })
    .then(function(account){
      res.render('message', {title: 'Contact Deleted: ' +  String(req.body.id) });
    });
});

router.get('/account/:id', function(req, res) {
  res.send("Account Created : " + req.params.id);
});


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Force.com Sample' });
});

router.get('/priceBook', function(req, res, next) {
 org.query({ 
  query: 
  "SELECT Name, Account__r.Name, Account__r.OwnerId, Account__r.CreatedById,  Cable_Route__r.Name, Date__c, MRC__c, OTC__c FROM Price_Book__c Order BY LastModifiedDate DESC" 
})
  .then(function(results){
    console.log("====results records below =============== ");
    console.log(results.records[0]);
    console.log("====results records.fields below =============== ");
    console.log(results.records[0]._fields);
    res.render('index-priceBook', { records: results.records });
  });
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

var org = require('../lib/connection');
var nforce = require('nforce');

module.exports = {
  async getPricebook(req, res, next) {
    await org.query({
      query:
      "SELECT Name, Country_A__r.Name, Account__r.Name, Account__r.OwnerId, Account__r.CreatedById, Cable_Route__r.Name, Date__c, MRC__c, OTC__c FROM Price_Book__c Order BY LastModifiedDate DESC"
    })
    .then(function(results){
      var records = results.records;
      if (!req.user.isAdmin) {
        for (var i = (records.length - 1); i >= 0; i--) {
          if(results.records[i]._fields.account__r.Name !== req.user.company) {
            records.splice(i, 1);
          }
        }
      }
      // for (var i = 0; i < records.length; i++) {
      //   console.log(records[i]._fields.account__r.Name);
      // }
      // console.log(req.user.company);
      res.render('price-book', { title: 'Price Book', records, user: req.user });
    });
  },

  async getAccounts(req, res, next) {
    await org.query({ query: "Select Id, Name, Type, Industry, Rating From Account Order By LastModifiedDate DESC" })
    .then(function(results){
      // console.log(results.records[0]._fields.id);
      res.render('index-accounts', { title: 'Account\'s Page', records: results.records });
    });
  },

  async getContacts(req, res, next) {
    await org.query({ query: "Select Id, Name, Email, Phone From Contact Order By Name" })
    .then(function(results){
      // console.log(results.records[0]);
      res.render('index-contacts', { title: 'Contact\'s Page', records: results.records });
    });
  },

  getCreateAcc(req, res, next) {
    res.render('create-account', { title: 'Create Account'});
  },

  getCreateCont(req, res, next) {
    res.render('create-contact', { title: 'Create Contact'});
  },

  async postCreateAcc(req, res, next) {
    var acc = await nforce.createSObject('Account');
    acc.set('Name', req.body.name);
    acc.set('Industry', req.body.industry);
    acc.set('Type', req.body.type);
    org.insert({ sobject: acc })
    .then(function(account){
      req.session.success = 'Account Created successfully! \nID: ' + String(account.id);
      res.redirect('accounts');
    })
  },

  async postCreateCont(req, res, next) {
    var cont = await nforce.createSObject('Contact');
    cont.set('FirstName', req.body.firstname);
    cont.set('LastName', req.body.lastname);
    cont.set('Phone', req.body.phone);
    cont.set('Email', req.body.email);
    org.insert({ sobject: cont })
    .then(function(contact){
      req.session.success = 'Contact Created successfully! \nID: ' + String(contact.id);
      res.redirect('contacts');
    })
  },

  async postDestroyAcc(req, res, next) {
    var acc = await nforce.createSObject('Account');
    acc.set('Id', req.params.id);
    console.log('id: %s', req.params.id);
    org.delete({ sobject: acc })
    .then(function(account){
      req.session.success = 'Account removed successfully! ID:' +  String(req.params.id);
      res.redirect('/pricebooks/accounts');
    });
  },

  async postDestroyCont(req, res, next) {
    var acc = await nforce.createSObject('Contact');
    acc.set('Id', req.params.id);
    console.log('id: %s', req.params.id);
    org.delete({ sobject: acc })
    .then(function(account){
      req.session.success = 'Contact removed successfully! ID:' +  String(req.params.id);
      res.redirect('/pricebooks/contacts');
    });
  }
}

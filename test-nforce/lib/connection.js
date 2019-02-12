'use strict'

var nforce = require('nforce');

var org = nforce.createConnection({
  clientId: '3MVG9i1HRpGLXp.rrmi2PlrYJH3o_MDzfNudx77p.l9rp2hJrmU9RLMapX9flrKPg9O_NNPU4fobIR3IgAnd7',
  clientSecret: 'AAB58C645B06F5E06A1721549B67FA543EA13B6F25115F848DEB0AF4AFC3DAA7',
  redirectUri: 'localhost/3000',
  apiVersion: 'v34.0',  // optional, defaults to current salesforce API version
  environment: 'production',  // optional, salesforce 'sandbox' or 'production', production default
  mode: 'single', // optional, 'single' or 'multi' user mode, multi default
  autoRefresh: true
});

org.authenticate({ username: "donapeqo@usa-tm.com", password: "Jonsnow123b8TFxzeL50kuFWjyr9FJTCGU" }, function(err, resp){
  if(!err) console.log('Successfully connected to Salesforce. Cached token: ' + org.oauth.access_token);
  if(err) console.log('Cannot connect to Salesforce: ' + err);
});

module.exports = org;

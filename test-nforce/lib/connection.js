'use strict'

var nforce = require('nforce');

var org = nforce.createConnection({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: 'localhost/5050',
  apiVersion: 'v34.0',  // optional, defaults to current salesforce API version
  environment: 'production',  // optional, salesforce 'sandbox' or 'production', production default
  mode: 'single', // optional, 'single' or 'multi' user mode, multi default
  autoRefresh: true
});

org.authenticate({ username: process.env.EMAIL, password: process.env.PWD_EMAIL }, function(err, resp){
  if(!err) console.log('Successfully connected to Salesforce. \nCached token: ' + org.oauth.access_token);
  if(err) console.log('Cannot connect to Salesforce: ' + err);
});

module.exports = org;

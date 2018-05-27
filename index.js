var nforce = require('nforce');
var AWS = require('aws-sdk');
var util = require('util');
const querystring = require('querystring');


var org = nforce.createConnection({
  clientId: 'id',
  clientSecret: 'id',
  redirectUri: 'http://localhost:3000/oauth/_callback',
  environment: 'production',  // optional, salesforce 'sandbox' or 'production', production default
  mode: 'single' // optional, 'single' or 'multi' user mode, multi default
});



exports.handler = function(event, context, callback) {
    
    console.log("event ", JSON.stringify(event));
    var eventbody = event.body;
    var obj = JSON.parse(eventbody);
  
    console.log("event32 ", event.body);
    console.log("event333 ", obj.name);
    console.log("event777 ", obj.phone)
    console.log("event4 ", event);
    //const params = querystring.parse(event.body);
    
const response = {
  statusCode: 200,
  headers: {
    "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
  },
  body: JSON.stringify(event)
};

org.authenticate({ username: 'sfusername', password: 'sfpw'}, function(err, resp){
    
    var sps3 = nforce.createSObject('customobj__c');
    sps3.set('Field1__c', obj.name);
	  sps3.set('Field2__c', obj.phone);

	org.insert({ sobject: sps3 }, function(err, resp){
		if(err) console.log('Error: ' + err.message);
	  if(!err) console.log('It worked!');
	});
    
});


callback(null, response);
};

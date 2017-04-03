var config = require('../../config/config');

var express = require('express');
var lti = require('ims-lti');
var _ = require('lodash');
var path = require('path');

var lti_key = process.env.LTI_KEY || config.lti_key;
var lti_secret = process.env.LTI_SECRET || config.lti_secret;
var oauth_key = process.env.OAUTH_KEY || config.oauth_key;
var oauth_secret = process.env.OAUTH_SECRET || config.oauth_secret;

var router = express.Router();

var course_uuid = "";
var user_uuid = "";
var system_guid = "";
var user_role = "";
var return_url = "";

var valid_session = false;

/* key and secret sanity checks - logged on startup */
if (lti_key == config.lti_key) {
  console.log('Using lti_key: ');
} else {
  console.log('Using lti_key: ')
}
console.log(lti_key);

if (lti_secret == config.lti_secret) {
  console.log('Using lti_secret: ');
} else {
  console.log('Using lti_secret from process.env: ');
}
console.log(lti_secret);

if (oauth_key == config.oauth_key) {
  console.log('Using oauth_key: ');
} else {
  console.log('Using oauth_key from process.env: ')
}
console.log(oauth_key);

if (oauth_secret == config.oauth_secret) {
  console.log('Using oauth_secret: ');
} else {
  console.log('Using oauth_secret from process.env: ');
}
console.log(oauth_secret);

router.use(function(err, req, res, next) {
  
});

/* Return home page from LTI Launch. */
router.post('/lti', function(req, res, next) {
  console.log('Validating LTI call');
  var provider = new lti.Provider(config.lti_key, config.lti_secret);
  req.body = _.omit(req.body, '__proto__');
  console.log("Request headers: ", req.headers);
  console.log("Request body: ",req.body);
  provider.valid_request(req, function(providerErr, isValid) {
    if(providerErr){
      console.log("Provider Error: ", providerErr);
      err = { message: 'Provider failure', status : 403, title: 'Provider error', stack: providerErr}
      next(err);
    }
    if(!isValid){
      err = { message: 'LTI validation failed', status : 422, title: 'Invalid LTI launch.', stack: "No stack available"}
      next(err);
    } else {
      res.render('index', {}); 
    }
  });
});

router.use(function(err, req, res, next) {
  if (err) {
    console.log('Index:Router:', err );
    res.render('error', err); 
    return null;
  } else {
    next();
  }
});

module.exports = router;

'use strict';
var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());

const contentful = require('contentful');
//var showdown  = require('showdown');
//var converter = new showdown.Converter();

const pug = require('pug');

// Compile the source code

var SPACE_ID = process.env.CONTENTFULSPACE;
var ACCESS_TOKEN = process.env.CONTENTFULTOKEN;

const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: SPACE_ID,
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: ACCESS_TOKEN
});

/* GET roster page. */
router.get('/rosters', function (req, res) {   
	  return client.getEntries({
      content_type: "rosterCu"  
    })
	  .then(function(response){
	  	console.log(response.items);
	  		if(response.items){
	  			res.render('rosters', { title: "ACUL - Rosters", content: response.items});
	  			} else {
	  				res.end();
	  			}
	  })
	  .catch((error) => {
	  	console.log('\nError occurred while fetching Entries')
	  	console.error(error)
	  	res.end();
	  	
	  });
	  			
});

module.exports = router;

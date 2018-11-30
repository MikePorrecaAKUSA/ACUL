const express = require('express');
const router = express.Router();

var home = require('./home');
var rosters = require('./rosters');
var events = require('./events');
var awards = require('./awards');
var photos = require('./photos');
var resources = require('./resources');

router.get('/', home);
router.get('/rosters', rosters);
router.get('/events', events);
router.get('/awards', awards);
router.get('/photos', photos);
router.get('/resources', resources);

module.exports = router
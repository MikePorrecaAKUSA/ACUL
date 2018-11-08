'use strict';
var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());

/* GET home page. */
router.get('/', function (req, res) {    
    res.render('index', { title: 'Welcome to BotBank!', session:req.session });
});

module.exports = router;
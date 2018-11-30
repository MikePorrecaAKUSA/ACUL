
// Set up Express and the view engine
var express = require('express');
var http = require('http');
var https = require('https');
var favicon = require('serve-favicon');
var app = express();
app.use(favicon(__dirname + '/favicon.ico'));
var path = require('path');
var fs = require("fs");

require('dotenv').load();

const { catchErrors } = require('./handlers/errorHandlers')
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.engine('pug', require('pug').__express)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//routing setup
const routes = require('./routes/index');

app.use(express.static('static'));

// Initialize the route handling
// Check ./routes/index.js to get a list of all implemented routes
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

var port = process.env.PORT;
if(!port){
    port = 80;
}

var server = app.listen(port, function () {	
	console.log("App running on port " + port);
});
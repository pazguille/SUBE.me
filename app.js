/**
 * Module dependencies.
 */
var express = require('express'),
	app = module.exports = express(),
	gzippo = require('gzippo');

/**
 * App Configuration
 */
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.favicon());
app.use(app.router);
app.use('/static', gzippo.staticGzip(__dirname + '/public'));
app.use('/vendor', gzippo.staticGzip(__dirname + '/vendor'));

/**
 * Environments
 */
app.configure("development", function () {
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure("production", function () {
	app.use(express.errorHandler());
});

/**
 * Render Views
 */
app.engine('jade', require('jade').__express);
app.set('view options', {'layout': false});
app.set('views', __dirname + '/views');

/**
 * Routes
 */
require('./routes');

/**
 * Listen
 */
app.listen(8080);
console.log('Express app started on port 8080');
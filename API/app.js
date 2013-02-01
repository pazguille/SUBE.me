/**
 * Module dependencies.
 */
var express = require('express'),
	app = module.exports = express(),
	mongoose = require('mongoose'),
	Schema = mongoose.Schema,

	/**
	 * Database
	 */
	subeSchema = new Schema({
		"id": Number,
		"latitude": Number,
		"longitude": Number,
		"address": String,
		"state": String
	}),

	// Sube Model
	Sube = mongoose.model("locations", subeSchema);

mongoose.connect('mongodb://localhost/sube');

/**
 * App Configuration
 */
app.configure(function () {
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.favicon());
	// Cors configuration
	app.use(function (req, res, next) {
		res.set({
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET',
			'Access-Control-Allow-Headers': 'Content-Type'
		});

		next();
	});
	app.use(app.router);
});

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
 * Routes
 */
app.get('/', function (req, res, next) {
	res.redirect('/places');
});

app.get('/places', function (req, res, next) {
	Sube.find(function (err, data) {
		res.json(data);
	});
});

app.get('/places/:state', function (req, res, next) {
	var state = req.params.state.split('_').join(' '),
		exp = new RegExp(state);

	Sube.find({'state': exp}, function (err, data) {
		res.json(data);
	});
});

/**
 * Listen
 */
app.listen(3030);
console.log('Express app started on port 3030');
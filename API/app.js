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

function capitalize(req, res, next) {
	var state = decodeURIComponent(req.query.query).split(' ');

	state.forEach(function (e, i) {
		state[i] = e[0].toUpperCase() + e.substr(1);
	});

	req.query.query = state.join(' ');

	next();
}

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
app.get('/api/places', function (req, res, next) {
	Sube.find(function (err, data) {
		res.json(data);
	});
});

// http://dev.virtualearth.net/REST/v1/Locations/47.64054,-122.12934?key=BingMapsKey
// http://maps.googleapis.com/maps/api/geocode/json?latlng=-34.70253,-58.39193&sensor=true
app.get('/api/places/search', capitalize, function (req, res, next) {
	Sube.find({'state': req.query.query}, function (err, data) {
		res.json(data);
	});
});

/**
 * Listen
 */
app.listen(3030);
console.log('Express app started on port 3030');
/*
 * Module dependencies
 */

var app = module.parent.exports;

/*
 * Middlewares
 */

/*
 * Views
 */

/*
 * Index
 */
app.get('/', function (req, res, next) {
	res.send("SUBE.me :)");
});
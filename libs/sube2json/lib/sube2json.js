// Correr desde la carpeta de mongo
	// correr mongo: bin/mongod --dbpath /data/db/
	// Para abrir la consola: bin/mongo
	// Importar desde un json: bin/mongoimport -d sube -c locations -vvvv -file ~/developer/SUBE.me/db/sube.json
var spawn = require('child_process').spawn,
	http = require("http"),
	data = '',
	map = '',
	fs = require('fs'),
	URL = 'http://www.mininterior.gov.ar/mapasubecarga/recarga',
	options = {
		host: 'www.mininterior.gov.ar',
		path: '/mapasubecarga/recarga',
		method: 'GET'
	},
	req = http.request(options, function (response) {
		response.setEncoding('utf8');
		response.on('data', function (chunk) {
			data += chunk;
		});
		response.on('end', function () {
			// WRONG!! yes i know...
			eval(data).forEach(function (e, i) {
				map += JSON.stringify({
					"id": parseInt(e[0]),
					"latitude": e[1],
					"longitude": e[2],
					"address": e[4].split(' - ')[0],
					"state": e[4].split(' - ')[1]
				}) + '\n';
			});

			// Creates a json file with data to import to mongo.
			fs.writeFileSync(__dirname + '/../../../db/sube.json', map, encoding = 'utf8');
		});
		response.on('error', function (e) {
			console.log(e);
		});
	}).end();

exports.SUBE = map;
// This is for syncing the database table. It will make all tables needed in the database.
// Run this file via node in cmd --> [node database.js]

var configuration = require('./configuration');

// connection
var Sequelize = require('sequelize');
var connection = new Sequelize('', 'root', '', {
	host: '127.0.0.1',	
	dialect: 'mysql',
	pool: {
		max: 1,
	   	min: 0,
	   	idle: 10000
	}
});

// all model
var Forex = connection.import(__dirname + '/models/forex');
var Log = connection.import(__dirname + '/models/log');

connection.query("CREATE DATABASE " + configuration.db.forex.name + ";").then(function(data) {
	connection.query("USE " + configuration.db.forex.name + ";").then(function(data) {
		// sync process
		Forex.sync().then(function(result) {    // Forex first, because Log depends on it
		    Log.sync();
		});
	})
});

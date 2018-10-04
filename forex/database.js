// This is for syncing the database table. It will make all tables needed in the database.
// Run this file via node in cmd --> [node database.js]

// connection
var connection = require('./connection');

// all model
var Forex = connection.import(__dirname + '/models/forex');
var Log = connection.import(__dirname + '/models/log');

// sync process
Forex.sync().then(function(result) {    // Forex first, because Log depends on it
    Log.sync();
});
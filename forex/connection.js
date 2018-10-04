// import configuration
var configuration = require('./configuration');

// import all packages
var Sequelize = require('sequelize');

// connect to database
var sequelize = new Sequelize(configuration.db.forex.name, configuration.db.forex.user, configuration.db.forex.password, configuration.db.forex.options);

module.exports = sequelize;
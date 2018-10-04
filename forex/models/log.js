var connection = require('./../connection');

var Forex = connection.import(__dirname + '/forex');

var Log = function(connection, DataTypes) {
	return connection.define('log', {
		date: {
			type: DataTypes.DATEONLY,
			validate: {
				isDate: true
			}
		},
		rate: {
			type: DataTypes.FLOAT,
			validate: {
				isFloat: true,
				notEmpty: true
			}
		},
		forex_id: {
			type: DataTypes.INTEGER,
			references: {
				model: Forex,
				key: 'id'
			},
			validate: {
				isInt: true,
				notEmpty: true
			}
		}
	});
}
module.exports = Log;
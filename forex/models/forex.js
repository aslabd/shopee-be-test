var connection = require('./../connection')

var Forex = function(connection, DataTypes) {
	return connection.define('forex', {
		from: {
			type: DataTypes.STRING(3),		// datatype STRING with length of 3
			validate: {
				isAlpha: true,
				isUppercase: true,
				notEmpty: true
			}
		},
		to: {
			type: DataTypes.STRING(3),
			validate: {
				isAlpha: true,
				isUppercase: true,
				notEmpty: true
			}
		}
	})
}

module.exports = Forex;
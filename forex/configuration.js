module.exports = {
	db: {
		forex: {
			name: 'forex',			// database name
			user: 'root',			// database user
			password: '',			// database password 
			options: {
				host: 'abdurrohim.id',	
				dialect: 'mysql',
				pool: {
					max: 5,
			    	min: 0,
			    	idle: 10000
				}
			}
		}
	}
}

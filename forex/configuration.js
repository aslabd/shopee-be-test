module.exports = {
	db: {
		forex: {
			name: 'forex',			// database name
			user: 'root',			// database user
			password: '',			// database password 
			options: {
				host: '127.0.0.1',	
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

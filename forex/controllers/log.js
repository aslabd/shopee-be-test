// package yang dibutuhkan
var Sequelize = require('sequelize');
var Op = Sequelize.Op;

// koneksi ke database
var connection = require('./../connection');

// model yang digunakan untuk controller ini
var Forex = connection.import(__dirname + './../models/forex');
var Log = connection.import(__dirname + './../models/log');

// relasi
// Forex memiliki banyak Log dengan foreign key forex_id
Forex.hasMany(Log, {
	foreignKey: {
		name: 'forex_id'
	}
});

// Log adalah kepunyaan dari Forex dengan foreign key forex_id
Log.belongsTo(Forex, {
	foreignKey: {
		name: 'forex_id'
	}
});

function LogControllers() {
	this.getByForexDate = function(req, res) {
		let forex_id = req.params.forex_id;
		let day = Number(req.params.day);
		let month = Number(req.params.month);
		let year = Number(req.params.year);

		Log
			.findAll({
				where: {
					date: new Date(year, month - 1, day)	// month - 1 karena bulan mulai dari 0
				},
				include: [{
					model: Forex,
					where: {
						id: forex_id
					}
				}]
			})
			.then(function(log) {
				if (log == null || log == 0) {
					res.json({status: {code: 204, success: false}, message: 'Gagal ambil log forex berdasarkan tanggal. Tidak ada data.'});
				} else {
					res.json({status: {code: 200, success: true}, message: 'Berhasil ambil log forex berdasarkan tanggal.', data: log});
				}
			})
			.catch(function(err) {
				res.json({status: {code: 500, success: false}, message: 'Gagal ambil log forex berdasarkan tanggal. Kesalahan pada kueri.', err: err});
			});
	}

	this.get7DayAverageByForexDate = function(req, res) {
		let forex_id = req.params.forex_id;
		let day = Number(req.params.day);
		let month = Number(req.params.month);
		let year = Number(req.params.year);

		if (forex_id == null || day == null || month ==  null || year == null) {
			res.json({status: {code: 400, success: false}, message: 'Gagal ambil log forex. Kesalahan input.'});
		} else {
			// cek data mencukupi 7 hari
			Log
				.findAll({
					where: {
						date: {
							[Op.lte]: new Date(year, month - 1, day),
							[Op.gt]: new Date(year, month - 1, day) - (7 * 24 * 60 * 60 * 1000)
						}
					},
					include: [{
						model: Forex,
						where: {
							id: forex_id
						}
					}]
				})
				.then(function(log) {
					if (log == null || log == 0 || log.length < 7) {
						res.json({status: {code: 204, success: false}, message: 'Gagal ambil rerata log 7 hari berdasarkan tanggal. Tidak ada data atau data kurang.'});
					} else {
						Log
							.sum('rate', {
								where: {
									date: {
										[Op.lte]: new Date(year, month - 1, day),
										[Op.gt]: new Date(year, month - 1, day) - (7 * 24 * 60 * 60 * 1000)
									}
								},
								include: [{
									model: Forex,
									where: {
										id: forex_id
									}
								}]
							})
							.then(function(log) {
								res.json({status: {code: 200, success: true}, message: 'Berhasil ambil rerata log 7 hari berdasarkan tanggal.', data: Number(log)/7});
							})
							.catch(function(err) {
								res.json({status: {code: 500, success: false}, message: 'Gagal ambil rerata log 7 hari berdasarkan tanggal. Kesalahan pada kueri "sum".', err: err});
							});
					}
				})
				.catch(function(err) {
					res.json({status: {code: 500, success: false}, message: 'Gagal ambil rerata log 7 hari berdasarkan tanggal. Kesalahan pada kueri "cari semua".', err: err});
				})
		}
	}

	this.get7DayVarianceByForexDate = function(req, res) {
		let forex_id = req.params.forex_id;
		let day = Number(req.params.day);
		let month = Number(req.params.month);
		let year = Number(req.params.year);

		if (forex_id == null || day == null || month ==  null || year == null) {
			res.json({status: {code: 400, success: false}, message: 'Gagal ambil log forex. Kesalahan input.'});
		} else {
			// cek data mencukupi 7 hari
			Log
				.findAll({
					where: {
						date: {
							[Op.lte]: new Date(year, month - 1, day),
							[Op.gt]: new Date(year, month - 1, day) - (7 * 24 * 60 * 60 * 1000)
						}
					},
					include: [{
						model: Forex,
						where: {
							id: forex_id
						}
					}]
				})
				.then(function(log) {
					if (log == null || log == 0 || log.length < 7) {
						res.json({status: {code: 204, success: false}, message: 'Gagal ambil ragam log 7 hari berdasarkan tanggal. Tidak ada data.'});
					} else {
						Log
							.max('rate', {
								where: {
									date: {
										[Op.lte]: new Date(year, month - 1, day),
										[Op.gt]: new Date(year, month - 1, day) - (7 * 24 * 60 * 60 * 1000)
									}
								},
								include: [{
									model: Forex,
									where: {
										id: forex_id
									}
								}]
							})
							.then(function(max) {
								Log
									.min('rate', {
										where: {
											date: {
												[Op.lte]: new Date(year, month - 1, day),
												[Op.gt]: new Date(year, month - 1, day) - (7 * 24 * 60 * 60 * 1000)
											}
										},
										include: [{
											model: Forex,
											where: {
												id: forex_id
											}
										}]
									})
									.then(function(min) {
										res.json({status: {code: 200, success: true}, message: 'Berhasil ambil ragam log 7 hari berdasarkan tanggal.', data: max - min});
									})
									.catch(function(err) {
										res.json({status: {code: 500, success: false}, message: 'Gagal ambil ragam log 7 hari berdasarkan tanggal. Kesalahan pada kueri "min".', err: err});
									});
							})
							.catch(function(err) {
								res.json({status: {code: 500, success: false}, message: 'Gagal ambil ragam log 7 hari berdasarkan tanggal. Kesalahan pada kueri "max".', err: err});
							});
					}
				})
				.catch(function(err) {
					res.json({status: {code: 500, success: false}, message: 'Gagal ambil rerata log 7 hari berdasarkan tanggal. Kesalahan pada kueri "cari semua".', err: err});
				})
		}
	}

	this.create = function(req, res) {
		let forex_id = req.body.forex_id;
		let rate = req.body.rate;
		let day = Number(req.body.day);
		let month = Number(req.body.month);
		let year = Number(req.body.year);

		// cek agar from dan to tidak null
		if (forex_id == null || rate == null || day == null || month == null || year == null) {
			res.json({status: {code: 400, success: false}, message: 'Gagal tambah log forex. Kesalahan input.'});
		} else {
			// cek apakah sudah ada log untuk forex tersebut di tanggal tersebut
			Log
				.findOne({
					where: {
						date: new Date(year, month - 1, day)
					},
					include: [{
						model: Forex,
						where: {
							id: forex_id
						}
					}]
				})
				.then(function(forex) {
					if (forex != null) {
						res.json({status: {code: 400, success: false}, message: 'Gagal tambah log forex. Data sudah ada.'});
					} else {
						Log
							.create({
								date: new Date(year, month - 1, day),
								rate: rate,
								forex_id: forex_id
							})
							.then(function(forex) {
								res.json({status: {code: 200, success: true}, message: 'Berhasil tambah daftar forex.', data: forex});	
							})
							.catch(function(err) {
								res.json({status: {code: 500, success: false}, message: 'Gagal tambah log forex. Kesalahan kueri "buat".', err: err});
							})
					}
				})
				.catch(function(err) {
					res.json({status: {code: 500, success: false}, message: 'Gagal tambah log forex. Kesalahan kueri "cari satu".', err: err});
				})
		}
	}

	this.updateByForexDate = function(req, res) {
		// untuk kueri
		let forex_id = req.params.id;
		let day = Number(req.params.day);
		let month = Number(req.params.month);
		let year = Number(req.params.year);

		// untuk diubah
		let rate = req.body.rate;

		if (forex_id == null || day == null || month == null || year == null || rate == null) {
			res.json({status: {code: 400, success: false}, message: 'Gagal ubah dari daftar forex. Kesalahan input.'});
		} else {
			Log
				.findOne({
					where: {
						date: new Date(year, month - 1, day)
					},
					include: [{
						model: Forex,
						where: {
							id: forex_id
						}
					}]
				})
				.then(function(log) {
					if (log == null || log == 0) {
						res.json({status: {code: 204, success: false}, message: 'Gagal ubah dari daftar forex. Tidak ada data.'});
					} else {
							Forex
								.update({
									from: from,
									to: to
								}, {
									where: {
										id: id
									}
								})
								.then(function(forex) {
									res.json({status: {code: 200, success: true}, message: 'Berhasil mengubah data', data: berat});
								})
								.catch(function(err) {
									res.json({status: {code: 500, success: false}, message: 'Gagal ubah dari daftar forex. Kesalahan pada kueri "ubah".', err: err});
								});
					}
				})
				.catch(function(err) {
					res.json({status: {code: 500, success: false}, message: 'Gagal ubah dari daftar forex. Kesalahan pada kueri "cari dengan id".', err: err});
				});
		}
	}
}

module.exports = new LogControllers();

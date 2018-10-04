// package yang dibutuhkan
var configuration = require('./../configuration');

// koneksi ke database
var connection = require('./../connection');

// model yang digunakan untuk controller ini
var Forex = connection.import(__dirname + './../models/forex');

function ForexControllers() {
	this.getAll = function(req, res) {
		Forex
			.findAll()
			.then(function(forex) {
				if (forex == null || forex == 0) {
					res.json({status: {code: 204, success: false}, message: 'Tidak ada data.'});
				} else {
					res.json({status: {code: 200, success: true}, message: 'Berhasil ambil daftar forex.', data: forex});
				}
			})
			.catch(function(err) {
				res.json({status: {code: 500, success: false}, message: 'Gagal ambil daftar forex. Kesalahan pada kueri.', err: err});
			});
	}

	this.get = function(req, res) {
		let id = req.params.id;

		if (id == null) {
			res.json({status: {code: 400, success: false}, message: 'Gagal ambil dari daftar forex. Kesalahan input.'});
		} else {
			Forex
				.findById(id)
				.then(function(forex) {
					if (forex == null || forex == 0) {
						res.json({status: {code: 204, success: false}, message: 'Gagal ambil dari daftar forex. Tidak ada data.'});
					} else {
						res.json({status: {code: 200, success: true}, message: 'Berhasil ambil dari daftar forex.', data: forex});
					}
				})
				.catch(function(err) {
					res.json({status: {code: 500, success: false}, message: 'Gagal ambil dari daftar forex. Kesalahan kueri.', err: err});
				});
		}
	}

	this.create = function(req, res) {
		let from = req.body.from;
		let to = req.body.to;

		// cek agar from dan to tidak null
		if (from == null || to == null) {
			res.json({status: {code: 400, success: false}, message: 'Gagal tambah daftar forex. Kesalahan input.'});
		} else {
			Forex
				.findOne({
					where: {
						from: from,
						to: to
					}
				})
				.then(function(forex) {
					if (forex != null) {
						res.json({status: {code: 400, success: false}, message: 'Gagal tambah daftar forex. Data sudah ada.'});
					} else {
						Forex
							.create({
								from: from,
								to: to
							})
							.then(function(forex) {
								res.json({status: {code: 200, success: true}, message: 'Berhasil tambah daftar forex.', data: forex});
							})
							.catch(function(err) {
								res.json({status: {code: 500, success: false}, message: 'Gagal tambah daftar forex. Kesalahan kueri "buat".', err: err});
							});
					}
				})
				.catch(function(err) {
					res.json({status: {code: 500, success: false}, message: 'Gagal tambah daftar forex. Kesalahan kueri "cari satu".', err: err});
				});
		}
	}

	this.update = function(req, res) {
		// untuk kueri
		let id = req.params.id;

		// untuk diubah
		let from = req.body.from;
		let to = req.body.to;

		if (id == null || from == null || to == null) {
			res.json({status: {code: 400, success: false}, message: 'Gagal ubah dari daftar forex. Kesalahan input.'});
		} else {
			// cek apakah ada forex dengan id tersebut
			Forex
				.findById(id)
				.then(function(forex) {
					if (forex == null || forex == 0) {
						res.json({status: {code: 204, success: false}, message: 'Gagal ubah dari daftar forex. Tidak ada data.'});
					} else {
						// cek apakah sudah ada forex dengan from dan to yang sama
						Forex
							.findOne({
								where: {
									from: from,
									to: to
								}
							})
							.then(function(forex) {
								if (forex != null) {
									res.json({status: {code: 400, success: false}, message: 'Gagal ubah dari daftar forex. Data sudah ada.'})
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
											res.json({status: {code: 200, success: true}, message: 'Berhasil mengubah data', data: forex});
										})
										.catch(function(err) {
											console.log(err)
											res.json({status: {code: 500, success: false}, message: 'Gagal ubah dari daftar forex. Kesalahan pada kueri "ubah".', err: err});
										});
								}
							})
							.catch(function(err) {
								res.json({status: {code: 500, success: false}, message: 'Gagal ubah dari daftar forex. Kesalahan pada kueri "cari satu.', err: err});
							});
					}
				})
				.catch(function(err) {
					res.json({status: {code: 500, success: false}, message: 'Gagal ubah dari daftar forex. Kesalahan pada kueri "cari dengan id".', err: err});
				});
		}
	}

	this.delete = function(req, res) {
		let id = req.params.id;

		if (id == null) {
			res.json({status: {code: 400, success: false}, message: 'Gagal hapus dari daftar forex. Kesalahan input.'});
		} else {
			Forex
				.findById(id)
				.then(function(forex) {
					if (forex == null || forex == 0) {
						res.json({status: {code: 204, success: false}, message: 'Gagal hapus dari daftar forex. Tidak ada data.'});
					} else {
						Forex
							.destroy({
								where: {
									id: id
								}
							})
							.then(function(forex) {
								res.json({status: {code: 200, success: true}, message: 'Berhasil hapus dari daftar forex.', data: forex});
							})
							.catch(function(err) {
								res.json({status: {code: 500, success: false}, message: 'Gagal hapus dari daftar forex. Kesalahan pada kueri "hapus"', err: err});
							});
					}
				})
				.catch(function(err) {
					res.json({status: {code: 500, success: false}, message: 'Gagal hapus dari daftar forex. Kesalahan pada kueri "cari dengan id"', err: err});
				});
		}
	}
}

module.exports = new ForexControllers();

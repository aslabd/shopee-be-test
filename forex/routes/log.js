var express = require('express');
var router = express.Router();

var log = require('./../controllers/log');

// Mulai: Router API
router.get('/rate/forex/:forex_id/date/:year/:month/:day', function(req, res, next) {
	log.getByForexDate(req, res);
});

router.get('/average/forex/:forex_id/date/:year/:month/:day', function(req, res, next) {
	log.get7DayAverageByForexDate(req, res);
});

router.get('/variance/forex/:forex_id/date/:year/:month/:day', function(req, res, next) {
	log.get7DayVarianceByForexDate(req, res);
});

router.get('/:id', function(req, res, next) {
	log.get(req, res);
});

router.post('/create', function(req, res, next) {
	log.create(req, res);
});

router.patch('/update/:id', function(req, res, next) {
	log.create(req, res);
});

router.delete('/delete/:id', function(req, res, next) {
	log.create(req, res);
});
// Akhir: Router API

module.exports = router;
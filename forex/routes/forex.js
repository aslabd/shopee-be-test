var express = require('express');
var router = express.Router();

var forex = require('./../controllers/forex');

// Mulai: Router API
router.get('/all', function(req, res, next) {
	forex.getAll(req, res);
});

router.get('/:id', function(req, res, next) {
	forex.get(req, res);
});

router.post('/create', function(req, res, next) {
	forex.create(req, res);
});

router.patch('/update/:id', function(req, res, next) {
	forex.update(req, res);
});

router.delete('/delete/:id', function(req, res, next) {
	forex.delete(req, res);
});
// Akhir: Router API

module.exports = router;
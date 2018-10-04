var express = require('express');
var router = express.Router();

// Mulai: Router Views
router.get('/', function(req, res, next) {
	res.render('index');
});

router.get('/detail/:id', function(req, res, next) {
	res.render('detail');
});

router.get('/create', function(req, res, next) {
	res.render('create');
});

router.get('/edit/:id', function(req, res, next) {
	res.render('edit');
});
// Akhir: Router Views

module.exports = router;
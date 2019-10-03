var express = require('express');
var router = express.Router();

//contact route
router.get('/', function(req, res){
	res.render('contact');
});

module.exports = router;
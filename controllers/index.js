var express = require('express');
var router = express.Router();

//GETS INDEX ROUTE
router.get('/', function (req, res){
	res.render('index');
});

module.exports = router;
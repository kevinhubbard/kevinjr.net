var express = require('express');
var router = express.Router();


//GETS OUR DEFAULT ROUTE FOR PORTFOLIO
router.get('/', function (req, res){
	res.render('index');
});


module.exports = router;
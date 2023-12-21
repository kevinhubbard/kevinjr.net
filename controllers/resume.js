var express = require('express');
var fs = require('fs');
var router = express.Router();

//GETS RESUME ROUTE
router.get('/', function (req, res) {
	var resume = './assets/resume/KevinHubbardPortfolioEdit.pdf';
	fs.readFile(resume, function(err,data) {
		res.setHeader('Content-type', 'application/pdf');
		res.send(data);
	})
});

module.exports = router;
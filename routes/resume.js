var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next){
	var resumeFile = './public/resume/KevinHubbard.pdf';

	fs.readFile(resumeFile,  function(err,data){
		res.setHeader('Content-Type', 'application/pdf');
		res.send(data);
		res.end();
	});
	
});


module.exports = router;

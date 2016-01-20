var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    res.render('index', { title: 'Express' });
});

router.post('/carInfo', writeCarInfo);

function writeCarInfo(req, res){
    console.log('getting car info.');
    console.log(req.body);

	console.log("get school successful");
	res.contentType('json');
	res.send(JSON.stringify({ rtn: 0, message:"ok" }));
	res.end();
}

module.exports = router;

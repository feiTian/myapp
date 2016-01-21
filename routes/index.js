var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var connection = mysql.createConnection({
//	connectionLimit : 10,
//	host     : 'localhost',
    host: 'localhost',
    user: 'root',
    password: 'heroafei',
    database: 'test'
});

connection.connect();

/* GET home page. */
router.get('/', function(req, res, next) {

    res.render('index', { title: 'Express' });
});

router.post('/', writeCarInfo);

function writeCarInfo(req, res){
    console.log('getting car info.');
    //console.log(req.body);

	try{
		var query;
		var nid = req.body.image_id.substring(0, req.body.image_id.length - 1);
		if(req.body.image_id.endsWith('f')){
			query = connection.query("update carplate set carnumber_forepart='" + req.body.result[0].hphm 
				+ "', result_json='" + JSON.stringify(req.body) + "' where nid='" + nid +"'");
		}else if(req.body.image_id.endsWith('b')){
			query = connection.query("update carplate set carnumber_backpart='" + req.body.result[0].hphm
				+ "', result_json='" + JSON.stringify(req.body) + "' where nid='" + nid +"'");
		}
		console.log(query.sql);
    	query
        .on('error', function (err) {
            console.log(err);
        })
        .on('result', function (r) {
            if (!r.nid) {
                return;
            }
            console.log(r.carnumber_forepart);
        })
        .on('end', function () {
            //connection.release();
        });
	}catch(err){
    	console.log(err);
	}

	console.log("update car plate " + req.body.image_id + " successful");
	res.contentType('json');
	res.send(JSON.stringify({ rtn: 0, message:"ok" }));
	res.end();
}

String.prototype.endsWith = function (s) {
  return this.length >= s.length && this.substr(this.length - s.length) == s;
}

module.exports = router;

/*MODULES*/
var http = require('http');
var mysql = require('mysql');
var url = require('url');

var connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "sesi@0952",
	database: "primeiroBD",
});


http.createServer(function (req, res) {
	var aux = url.parse(req.url, true);
	var action = aux.pathname.toLowerCase().substring(0,2);
	var table = aux.pathname.toLowerCase().substring(2);
	var dataValues = Object.values(aux.query);
	var dataKeys = Object.keys(aux.query);
	var dataEntries = Object.entries(aux.query);
	console.log(action + table);
	console.log(dataEntries);
	console.log(aux.host);

	function returnObject(obj){
		var ret = typeof obj !== 'object' ? {"objectType":false} : obj;
		console.log(ret);
		res.writeHead(200, {'Content-type': 'application/json'});
		res.end(JSON.stringify(ret));
	}
	function tryResult(query) {
		connection.query(query, dataValues, function(err, result, fields){
			var flag = false;
			if (err){
				console.log(err);
				res.writeHead(200, {'Content-Type': "application/json"});
				res.end("[]");
			}
			else if(result){
				console.log(result);
				res.writeHead(200, {'Content-Type': "application/json"});
				res.end(JSON.stringify(result));
			}
			else{
				console.log(result);
				res.writeHead(200, {'Content-Type': "application/json"});
				res.end("[]");
			}
		});
	}

	if (action === "/g") {
		var query = "SELECT * ";
		query+="FROM " + table;
		if (dataValues.length) {
			query+=" WHERE ";
		}
		for (var i = 0; i < dataKeys.length; i++) {
			query += dataKeys[i] + " = ? ";
			if(i<dataKeys.length-1){
				query+="AND ";
			}
		}
		query+=";";
		tryResult(query);
	}

	// curl.checkURL(con, action, function (exists) {
	// 	if(pathnameURL === '/favicon.ico');
	// 	else if (exists) {
	// 		returnObject(exists);
	// 	}
	// 	else
	// 		returnObject(exists);
	// });

}).listen(8005);

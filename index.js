/*MODULES*/									/**/			/*MY MODULES.*/				/**/
var http = require('http');					/**/	/**/
var fs = require('fs');						/**/
var url = require('url');					/**/

var pastaDeHTMLs = './www/';

var restful = {
	host: 'localhost',
	port: '8005',
	path: ''
};

http.createServer(function (req, res) {
	var aux = url.parse(req.url, true);
	var hostURL = aux.host;
	var pathnameURL = aux.pathname.toLowerCase();
	var datahURL = aux.query;
	console.log(fs.existsSync(pastaDeHTMLs+pathnameURL) + " request for path: " + req.url);

	function errou404(){
			res.end();
	}
	//ignorados
	if(pathnameURL === '/favicon.ico') {
		//everything here is ignored
	}
	//acesso ao jogo
	else if (pathnameURL === '/tacerto' || pathnameURL === "/") {
	console.log(fs.existsSync(pastaDeHTMLs+pathnameURL) + " request for path: " + req.url);
		fs.readFile(pastaDeHTMLs+'index.html', function(err, data) {
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(data);
			res.end();
		});
	}

	//LOGIN
	else if (req.method === 'POST'){
		var body = "";
		if (pathnameURL === '/loginform') {
			req.on("data", function(chunk){
				body = JSON.parse(chunk);
				var idJogador;
				var email = body.email;
				var senha = hsp.hashPassword(body.senha);
				restful.path = "/gusuario?email=" + email + "&senha=" + senha;
				http.request(restful,
					function (response){
						var body = [];
						response.on('data', function (chunk) {
							body = JSON.parse(chunk);
						});

						response.on('end', function () {
							if (body.length) {
								console.log(body[0].idUsuario);
								res.writeHead(200, {'Content-Type': 'application/json'});
								res.end(body[0].idUsuario.toString());
							}
							else
								res.end();
							
						});
					}
				).end();
			});
		}
		else if (pathnameURL === '/loadDesafio') {
			req.on("data", function(chunk){
				body = JSON.parse(chunk);
				var idJogador;
				var query = "SELECT * FROM TaCerto_DesafioDeFasePalavra DB LEFT JOIN TaCerto_DesafioDeFaseLacuna DL ON DB.idDesafioDeFasePalavra = DL.idDesafioDeFasePalavra WHERE DB.nivelFase = (SELECT * FROM Sessao S JOIN TaCerto_JogadorInventario JI ON S.idUsuario = JI.idUsuario WHERE JI.xp )";
				restful.path = "/p?query=" + query;
				http.request(restful,
					function (response){
						var body = [];
						response.on('data', function (chunk) {
							body = JSON.parse(chunk);
						});

						response.on('end', function () {
							if (body.length) {
								console.log(body[0].idUsuario);
								res.writeHead(200, {'Content-Type': 'application/json'});
								res.end(body[0].idUsuario.toString());
							}
							else
								res.end();
							
						});
					}
				).end();
			});
		}
		else{
			errou404();
		}
	}
	//acessos liberados
	else if(fs.existsSync(pastaDeHTMLs+pathnameURL) && (
			~pathnameURL.indexOf('.js') ||
			~pathnameURL.indexOf('.css') ||
			~pathnameURL.indexOf('.html') ||
			~pathnameURL.indexOf('.gif') ||
			~pathnameURL.indexOf('.png') ||
			~pathnameURL.indexOf('.jpg') ||
			~pathnameURL.indexOf('.otf') ||
			~pathnameURL.indexOf('.mp3'))) {
		fs.readFile(pastaDeHTMLs + pathnameURL, function(err, data) {
			var contType = pathnameURL.indexOf('.js') >= 0 ? "text/javascript" :
						  (pathnameURL.indexOf('.css') >= 0 ? "text/css" :
						  (pathnameURL.indexOf('.html') >= 0 ? "text/html" :
						  (pathnameURL.indexOf('.otf') >= 0 ? "fonte" :
						  (pathnameURL.indexOf('.mp3') >= 0 ? "audio" : "img"))));
			res.writeHead(200, {'Content-Type': contType});
			res.write(data);
			res.end();
		});
	}
	//teste de selec/requisicoes estranhas que n foram organizadas
	else{
		errou404();
	}
	
}).listen(8005);







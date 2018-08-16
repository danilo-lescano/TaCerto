//misturar - array de palavras
Array.prototype.shuffle = function() {
	var i = this.length, j, temp;
	if ( i == 0 ) return this;
	while ( --i ) {
		j = Math.floor( Math.random() * ( i + 1 ) );
		temp = this[i];
		this[i] = this[j];
		this[j] = temp;
	}
	return this;
}

var TaCerto = {
	idUsuario: false,
	Login: {
		email: '',
		senha: '',
		postAcess: function() {
			this.email = document.getElementsByName("email")[0].value;
			this.senha = document.getElementsByName("senha")[0].value;
			var http = new XMLHttpRequest();
			var params = {"email":this.email, "senha":this.senha};
	        http.open('POST', '/loginform');
	        http.setRequestHeader('Content-type', 'application/json');
	        http.send(JSON.stringify(params)); // Make sure to stringify
	        http.onload = function() {
	            console.log(http.responseText);
	            if (http.responseText) {
	            	TaCerto.idUsuario = http.responseText;
	            	if(confirm("Você está conectado!"))
	            		TaCerto.Carregar("menuInicial");
	            }
	            else{
	            	alert("Por favor digite login e senha validos!");
	            }
	        }
		}
	},
	Cadastro: {
		pNome: '',
		uNome: '',
		email: '',
		senha: '',
		postRegister: function(){
	            		TaCerto.Carregar("errou");
			// this.pNome = document.getElementsByName("pNome")[0].value;
			// this.uNome = document.getElementsByName("uNome")[0].value;
			// this.email = document.getElementsByName("email")[0].value;
			// this.senha = document.getElementsByName("senha")[0].value;
			// var http = new XMLHttpRequest();
			// var params = {"pNome": this.pNome, "uNome": this.uNome, "email":this.email, "senha":this.senha};
	  //       http.open('POST', '/cadastroform');
	  //       http.setRequestHeader('Content-type', 'application/json');
	  //       http.send(JSON.stringify(params)); // Make sure to stringify
	  //       http.onload = function() {
	  //           console.log(http.responseText);
	  //           if (http.responseText === this.email) {
	  //           	alert("Olhe o link no seu email: " + this.email + ".\nPode ser que ele tenha ido pra caixa de spam ;)");
	  //           	sessao = http.responseText;
	  //           	TaCerto.Carregar("login");
	  //           }
	  //           else if(http.responseText === "email ja existe") alert("email ja existe");
	  //           else{
	  //           	alert("Algum campo nao foi preenchido corretamento!");
	  //           }
	  //       }
		}
	},
	MenuInicial: {
		jogar: function(){
			TaCerto.Carregar("modosDeJogo");
		},
		missao: function(){},
		colecao: function(){}
	},
	ModosDeJogo: {

	},
	PreJogoTimer: {},
	Missao: {},
	Conquista: {},
	Jogo: {},
	FinalPartida: {},
	Loja: {},
	Carregar: function(pagina) {
		if (pagina) {			
			var requestCorpo = new XMLHttpRequest();			
			pagina+='.html';
			requestCorpo.open('GET', pagina);			
			requestCorpo.onload = function (){
				var conteudo = requestCorpo.responseText;
				document.getElementsByClassName('corpo')[0].innerHTML = conteudo;
				if(pagina === "gif.html"){
					var img = new Image();
					img.src = "resources/media/image/entrada.gif";
					img.id = "entradaGif";
					img.alt = "gif de abertura";
					var sesiGif = document.getElementById("sesiGif");
					img.onload = function () {
						sesiGif.appendChild(img);
						window.setTimeout(function(){
							TaCerto.Carregar("login");
						},3000);
					}
				}

				if(pagina === "resultados.html"){
					var h1 = document.querySelector("h1");
					h1.innerHTML = "Fim de jogo. <br> Você acertou " + TaCerto.Jogo.positivo + " palavras em " + TaCerto.Jogo.tempo + " segundos!";				
					var home = document.querySelector(".home");
					home.onclick = function() {
						TaCerto.Carregar("menuInicial");
					}
				}
			};
			requestCorpo.send();
		}
	}
} 
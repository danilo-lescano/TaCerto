var TaCerto = TaCerto || {};
TaCerto.Controladora = TaCerto.Controladora || {};
TaCerto.Controladora.Jogo = TaCerto.Controladora.Jogo || {};
TaCerto.Controladora.Jogo.Aleatorio = {
	DESAFIO: [],
	tipoDeJogo: [
		"Normal",
		"Lacuna",
		//"Explorador",
		//"Aurelio",
	],
	indexTipoDeJogo: 0,
	respostasTotais: 0,
	
	clockFlashFlag: true, //ligar/delisgar efeito de flash do relogio

	called: function () {
		TaCerto.Controladora.CarregarPagina.htmlCorpo("jogo");
	},
	loadDesafio: function () {
		TaCerto.Controladora.Jogo.Geral.gameModel.desafioNum = 15;//ORIGINAL: 15
		TaCerto.Controladora.Jogo.Aleatorio.next();
	},
	next: function(){
		var modos = TaCerto.Controladora.Jogo.Aleatorio.tipoDeJogo;
		var oldIdex = TaCerto.Controladora.Jogo.Aleatorio.indexTipoDeJogo;
		var index = TaCerto.Controladora.Jogo.Aleatorio.indexTipoDeJogo = Math.floor(Math.random() * modos.length);

		setTimeout(function(){
			TaCerto.Controladora.Jogo[modos[index]].called();
			TaCerto.Controladora.Jogo[modos[index]].loadDesafio();

			document.getElementById('acertos').innerHTML = TaCerto.Controladora.Jogo.Geral.gameModel.acerto;
			document.getElementById('economia').innerHTML = TaCerto.Controladora.Jogo.Geral.gameModel.moeda;
			document.getElementById('erros').innerHTML = TaCerto.Controladora.Jogo.Geral.gameModel.erro;
			TaCerto.Controladora.Jogo.Geral.plusBarra(modos[oldIdex] === "Lacuna" ? true : false);
			TaCerto.Controladora.Jogo.Aleatorio.ajustesDaFase();

			if(++TaCerto.Controladora.Jogo.Aleatorio.respostasTotais > 15){
				TaCerto.Controladora.Jogo.Aleatorio.zerarVars();
				TaCerto.Controladora.Jogo.Geral.fimDeJogo();
			}

			if(modos[index] !== "Normal")
				document.getElementsByClassName("JogoBg7")[0].style.backgroundImage = document.getElementsByClassName("JogoBg6")[0].style.backgroundImage = 'url("resources/media/image/fundo.png")';

		}, modos[oldIdex] === "Lacuna" ? 1000 : 0);
	},
	pular: function(){
		var modos = TaCerto.Controladora.Jogo.Aleatorio.tipoDeJogo;
		var oldIdex = TaCerto.Controladora.Jogo.Aleatorio.indexTipoDeJogo;
		var index = TaCerto.Controladora.Jogo.Aleatorio.indexTipoDeJogo = Math.floor(Math.random() * modos.length);

		TaCerto.Controladora.Jogo[modos[index]].called();
		TaCerto.Controladora.Jogo[modos[index]].loadDesafio();

		document.getElementById('acertos').innerHTML = TaCerto.Controladora.Jogo.Geral.gameModel.acerto;
		document.getElementById('economia').innerHTML = TaCerto.Controladora.Jogo.Geral.gameModel.moeda;
		document.getElementById('erros').innerHTML = TaCerto.Controladora.Jogo.Geral.gameModel.erro;
		TaCerto.Controladora.Jogo.Geral.plusBarra(true);
		TaCerto.Controladora.Jogo.Aleatorio.ajustesDaFase();
		
		TaCerto.Controladora.Jogo[modos[index]].pular();


		//mimica do efeito de flip para resolver o problema de trocar de tela no modo aleatorio
		document.getElementById('cartaVermelha').innerHTML += '<div class="imgCard bgcartaVermelha"' + 'onclick="TaCerto.Controladora.Jogo.Geral.clickCarta(' + "'cartaVermelha'" + ');"></div>';
		var cartaClicada = document.getElementById('cartaVermelha').childNodes;
		var numCartas = document.getElementById('cartaVermelha').childNodes.length;
		cartaClicada[numCartas-1].classList.add("animated", "bounceUpOut", "flipCardcartaVermelha");
		setTimeout(function(){
			if (numCartas === document.getElementById('cartaVermelha').childNodes.length)
				document.getElementById('cartaVermelha').removeChild(document.getElementById('cartaVermelha').childNodes[document.getElementById('cartaVermelha').childNodes.length - 1]);
		}, 1000);
	},
	eliminarErrado: function(){
		var modos = TaCerto.Controladora.Jogo.Aleatorio.tipoDeJogo;
		var index = TaCerto.Controladora.Jogo.Aleatorio.indexTipoDeJogo;
		TaCerto.Controladora.Jogo[modos[index]].eliminarErrado();
	},
	ajustesDaFase: function(){
		var cartaUsada = TaCerto.Controladora.Jogo.Geral.gameModel.cartaUsada;
		var cardDiv = ["cartaVermelha", "cartaAzul", "cartaAmarela", "cartaVerde"];
		if (document.getElementById("flagCardExists")){
			for (var i = 0; i < cardDiv.length; i++) {
				document.getElementById(cardDiv[i]).innerHTML = "";
				for (var j = 0; j < TaCerto.Estrutura.Jogador[cardDiv[i]] && j+cartaUsada[cardDiv[i]] < 2; j++) {

					let img = new Image();
					let src = "resources/media/image/" + cardDiv[i] + ".png";
					img.src = src;
					document.getElementById(cardDiv[i]).innerHTML += '<div class="imgCard bg' + cardDiv[i] + '"' + 'onclick="TaCerto.Controladora.Jogo.Geral.clickCarta(' + "'" + cardDiv[i] + "'" + ');"></div>';
				}
			}
		}

		if(!TaCerto.Controladora.Jogo.Aleatorio.clockFlashFlag){
			var sec = TaCerto.Controladora.Jogo.Geral.gameModel.tempo;
			document.getElementById("tempo").innerHTML = sec;
			document.getElementsByClassName("JogoClockDivWrapper")[0].classList.remove("flash");
			document.getElementsByClassName("second")[0].style.transform = "rotate(" + (sec%60)*6 + "deg)";
		}
		TaCerto.Controladora.Jogo.Aleatorio.clockFlashFlag = false;
		
		var barra = document.getElementsByClassName("barraCartaBG")[0];
		barra.style.transition = "left 0s";
		barra.style.WebkitTransition = "left 0s";
		barra.style.left = TaCerto.Controladora.Jogo.Geral.gameModel.flagCardMenu ? "0px" : "-58%";
		setTimeout(function(){
			if(document.getElementsByClassName("barraCartaBG")[0])
				barra.style.transition = barra.style.WebkitTransition = "left 1s";
		}, 10);
	},
	zerarVars: function(){
		var modos = TaCerto.Controladora.Jogo.Aleatorio.tipoDeJogo;
		var index = TaCerto.Controladora.Jogo.Aleatorio.indexTipoDeJogo = Math.floor(Math.random() * modos.length);
		TaCerto.Controladora.Jogo.Aleatorio.indexTipoDeJogo = 0;
		TaCerto.Controladora.Jogo.Aleatorio.respostasTotais = 0;
		for (var i = 0; i < modos.length; i++){
			TaCerto.Controladora.Jogo[modos[i]].DESAFIO = [];
		}
	}
};
var TaCerto = TaCerto || {};
TaCerto.Controladora = TaCerto.Controladora || {};
TaCerto.Controladora.Jogo = TaCerto.Controladora.Jogo || {};
TaCerto.Controladora.Jogo.Aleatorio = {
	DESAFIO: [],
	tipoDeJogo: [
		"Normal",
		"Lacuna",
		"Explorador",
		//"Aurelio",
	],
	indexTipoDeJogo: -1,
	respostasTotais: 0,
	
	clockFlashFlag: true, //ligar/delisgar efeito de flash do relogio

	called: function () {
		TaCerto.Controladora.CarregarPagina.htmlCorpo("jogo");
		var aleatorio = [];
		for (let i = 0; i < this.tipoDeJogo.length; i++) {
			let wrapper = document.createElement("div");
			wrapper.classList.add("aleWrapper");
			wrapper.id = this.tipoDeJogo[i]+"AleWrapper";
			wrapper.style.transform = "rotateX(90deg)";
			wrapper.innerHTML = ((htmlName)=>{
				for (let j = 0; j < TaCerto.HTML.length; j++) {
					if(TaCerto.HTML[j].name !== htmlName.toLowerCase()) continue;
					return TaCerto.HTML[j].conteudo;
				}
			})(this.tipoDeJogo[i]);
			document.getElementById("JogoTipo").appendChild(wrapper);
			TaCerto.Controladora.Jogo[this.tipoDeJogo[i]].loadDesafio();
		}
	},
	loadDesafio: function () {
		TaCerto.Controladora.Jogo.Geral.gameModel.desafioNum = 15;//ORIGINAL: 15
		this.next();
	},
	next: function(){
		this.respostasTotais++;
		if(this.respostasTotais > TaCerto.Controladora.Jogo.Geral.gameModel.desafioNum){
			setTimeout(function(){
				TaCerto.Controladora.Jogo.Aleatorio.zerarVars();
				TaCerto.Controladora.Jogo.Geral.fimDeJogo();
			},1010);
			return;
		}

		var oldIndex = this.indexTipoDeJogo;
		var newIndex = this.indexTipoDeJogo = Math.floor(Math.random() * this.tipoDeJogo.length);

		var oldIdFase = this.tipoDeJogo[oldIndex]+"AleWrapper";
		var newIdFase = this.tipoDeJogo[newIndex]+"AleWrapper";

		var waitingTime = (()=>{
			if(oldIndex === 0){//Normal
				return 450;
			}
			else if(oldIndex === 1){//Lacuna
				return 950;
			}
			else if(oldIndex === 2){//Explorador
				return 850;
			}
			else if(oldIndex === 3){//Aurelio
				return 500;
			}
			else{
				return 0;
			}
		})();
		setTimeout(function(){
			var oldF = document.getElementById(oldIdFase);
			if(oldF) oldF.style.transform = "rotateX(90deg)";
			var newF = document.getElementById(newIdFase);
			if(newF) newF.style.transform = "rotateX(0deg)";
		}, waitingTime);
	},
	pular: function(){
		var modos = this.tipoDeJogo;
		var oldIdex = this.indexTipoDeJogo;
		var index = this.indexTipoDeJogo = Math.floor(Math.random() * modos.length);

		TaCerto.Controladora.Jogo[modos[index]].called();
		TaCerto.Controladora.Jogo[modos[index]].loadDesafio();

		document.getElementById('acertos').innerHTML = TaCerto.Controladora.Jogo.Geral.gameModel.acerto;
		document.getElementById('erros').innerHTML = TaCerto.Controladora.Jogo.Geral.gameModel.erro;
		TaCerto.Controladora.Jogo.Geral.plusBarra(true);
		this.ajustesDaFase();
		
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
		var modoTipo = this.tipoDeJogo[this.indexTipoDeJogo];
		TaCerto.Controladora.Jogo[modoTipo].eliminarErrado();
	},
	zerarVars: function(){
		this.indexTipoDeJogo = -1;
		this.respostasTotais = 0;
		for (var i = 0; i < this.tipoDeJogo.length; i++){
			var modoTipo = this.tipoDeJogo[i];
			TaCerto.Controladora.Jogo[modoTipo].zerarVars();
		}
	}
};
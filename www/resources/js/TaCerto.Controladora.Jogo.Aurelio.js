var TaCerto = TaCerto || {};
TaCerto.Controladora = TaCerto.Controladora || {};
TaCerto.Controladora.Jogo = TaCerto.Controladora.Jogo || {};
TaCerto.Controladora.Jogo.Aurelio = {
	DESAFIO: [],
	called: function () {
		TaCerto.Controladora.CarregarPagina.htmlCorpo("jogo", ["aurelio"], ["JogoTipo"]);
	},
	loadDesafio: function () {
		var desafioNum = TaCerto.Controladora.Jogo.Geral.gameModel.desafioNum = 15;//ORIGINAL: 15
		var shuffledDesafio = this.shuffleDesafio();

		for (var i = 0; i < desafioNum; i++)
			this.DESAFIO[i] = shuffledDesafio[i];

		this.DESAFIO[this.DESAFIO.length] = "primeira interação tem um pop().";
		this.proximaPergunta();
	},
	proximaPergunta: function(){
		//deleta ultima pergunta respondida e chama fim de jogo se não tiver mais nenhum
		this.DESAFIO.pop();
		if(this.DESAFIO.length === 0){
			this.zerarVars();
			TaCerto.Controladora.Jogo.Geral.fimDeJogo();
			return; document.getElementById
		}
















		var aux = document.getElementsByClassName("aurWord");
		var aurWords = [];
		var aurWordsNovaOrdem = [];
		for (let i = 0; i < aux.length; i++)
			aurWords[i] = aux[i];
		var minWidth = document.getElementById("aurBotWordWrap").getBoundingClientRect().width/15;

		for (let i = 0; i < aurWords.length; i++) {
			let widthSize = aurWords[i].getBoundingClientRect().width;
			aurWords[i].style.width = minWidth * Math.ceil(widthSize/minWidth) + "px";
			aurWords[i].calcWidth = Math.ceil(widthSize/minWidth);
		}
		aurWords.sort().reverse();
		//aurWords.shuffle();
		while(aurWords.length > 0){
			let linha = [];
			linha.calcWidth = function(){
				var total = 0;
				for (let i = 0; i < this.length; i++)
					total += this[i].calcWidth;
				return total;
			};
			for (let i = 0; i < aurWords.length; i++) {
				if(linha.calcWidth() + aurWords[i].calcWidth < 15){
					linha[linha.length] = aurWords[i];
					aurWords.remove(i--);
					if(linha.calcWidth() === 14) break;
				}
			}
			aurWordsNovaOrdem[aurWordsNovaOrdem.length] = linha;
		}
		console.log("size " + aurWordsNovaOrdem.length);
		for (let i = 0; i < aurWordsNovaOrdem.length; i++) {
			console.log(aurWordsNovaOrdem[i].calcWidth());
			console.log(aurWordsNovaOrdem[i]);
		}
		
		var aurBotWordWrap = document.getElementById("aurBotWordWrap");
		aurBotWordWrap.innerHTML = "";
		for (let i = 0; i < aurWordsNovaOrdem.length; i++) {
			for (let j = 0; j < aurWordsNovaOrdem[i].length; j++) {
				aurBotWordWrap.appendChild(aurWordsNovaOrdem[i][j]);
			}
		}
		
	},
	__rearrengeFontSize: function(aurWord, maxWidth){
		let widthSize = aurWord.getBoundingClientRect().width;
		let fontSize = 2;
		while(widthSize >= maxWidth){
			fontSize += 0.1;
			aurWord.style.fontSize = "calc(12px + " + fontSize + "vw)";
			widthSize = aurWord.getBoundingClientRect().width;
		}
	},
	btnResposta: function(el){
		//TaCerto.Controladora.Jogo.Geral.atualizarResposta(true);
		//this.proximaPergunta();
	},
	pular: function(){
		this.DESAFIO[this.DESAFIO.length] = this.shuffleDesafio()[0];
		this.DESAFIO[this.DESAFIO.length] = "primeira interação tem um pop().";
		this.proximaPergunta();
	},
	eliminarErrado: function(){

	},
	shuffleDesafio: function(){
		var x = TaCerto.Estrutura.DesafioDeFase.aurelio;
		var arr = [];
		var auxNvl = TaCerto.Controladora.Jogo.Missao.parametros.missao ? TaCerto.Controladora.Jogo.Missao.parametros.missao : 0;
		for (var i = auxNvl; i < TaCerto.Controladora.Jogo.Geral.calculaLvl(TaCerto.Estrutura.Jogador.xp); i++)
			arr[i] = i;
		x.shuffle();
		x.pickFase(arr);
		return x;
	},
	zerarVars: function(){
		this.DESAFIO = [];
	}
};
var TaCerto = TaCerto || {};
TaCerto.Controladora = TaCerto.Controladora || {};
TaCerto.Controladora.Jogo = TaCerto.Controladora.Jogo || {};
TaCerto.Controladora.Jogo.Normal = {
	DESAFIO: [],
	containerPalavra: 0,
	pulou: false,
	missaoChave: null,
	called: function () {
		TaCerto.Controladora.CarregarPagina.htmlCorpo("jogo", ["normal"], ["JogoTipo"]);
	},
	loadDesafio: function (missaoId, tamanho) {
		var desafioNum = tamanho;
		this.missaoChave = missaoId && isNaN(missaoId) ? missaoId : null;
		var shuffledDesafio = this.shuffleDesafio(this.missaoChave);

		for (var i = 0; i < desafioNum; i++)
			this.DESAFIO[i] = shuffledDesafio[i];

		this.containerPalavra = document.getElementsByClassName('JogoPalavraDiv')[0];
		document.getElementById('moneyDaQuestao').innerHTML = TaCerto.Controladora.Jogo.Geral.gameModel.comboBonus;
		document.getElementById('nivelDaQuestao').innerHTML = "Nível " +this.DESAFIO[this.DESAFIO.length - 1].nivel;
		document.getElementById('palavra').innerHTML = this.DESAFIO[this.DESAFIO.length - 1].palavra;
		this.rearrengeFontSize(document.getElementById('palavra'));
		document.getElementById('significado').innerHTML = this.DESAFIO[this.DESAFIO.length - 1].significado;
	},
	efeitoResposta: function(flag){
		document.getElementsByClassName("JogoBg7")[0].style.backgroundImage = flag ? 'url("resources/media/image/fundo-certo.png")' : 'url("resources/media/image/fundo-errado.png")';
		document.getElementsByClassName("JogoBg6")[0].style.backgroundImage = flag ? 'url("resources/media/image/fundo-certo.png")' : 'url("resources/media/image/fundo-errado.png")';
		setTimeout(function () {
			document.getElementsByClassName("JogoBg7")[0].style.backgroundImage = 'url("resources/media/image/fundo.png")';
			document.getElementsByClassName("JogoBg6")[0].style.backgroundImage = 'url("resources/media/image/fundo.png")';
		}, 500);
	},
	btnResposta: function(resp){
		var botao, flagResp;
		
		this.animaCard();
		
		if (resp) botao = document.getElementById('botao2');
		else botao = document.getElementById('botao1');
		botao.classList.add("animated"); botao.classList.add("bounceIn"); 
		setTimeout(function () {botao.classList.remove("animated", "bounceIn");}, 500);
		
		if (this.DESAFIO.length){
			flagResp = this.DESAFIO[this.DESAFIO.length - 1].flag === resp;
			
			// Checa se errou e chama função para adicionar na lista de dicas
			if(!flagResp)
				TaCerto.Controladora.Dica.colocaDica(this.DESAFIO[this.DESAFIO.length - 1].id, this.DESAFIO[this.DESAFIO.length - 1].dica);
			
			TaCerto.Controladora.Jogo.Geral.atualizarResposta(flagResp);
			this.efeitoResposta(flagResp);
			
			this.DESAFIO.pop();
		}
				
		if(this.DESAFIO.length){
			setTimeout(() => {
				try {
					document.getElementById('moneyDaQuestao').innerHTML = TaCerto.Controladora.Jogo.Geral.gameModel.comboBonus;
					document.getElementById('nivelDaQuestao').innerHTML = "Nível " +this.DESAFIO[this.DESAFIO.length - 1].nivel;
					document.querySelector('#cardBG>#palavra').innerHTML = this.DESAFIO[this.DESAFIO.length - 1].palavra;
					this.rearrengeFontSize(document.querySelector('#cardBG>#palavra'));
					document.querySelector('#cardBG>#significado').innerHTML = this.DESAFIO[this.DESAFIO.length - 1].significado;	
				} catch (error) {}

			}, TaCerto.Controladora.Jogo.Geral.gameModel.tipoDeJogo === "Aleatorio" ? 500 : 0);

			if(this.DESAFIO.length === 3){
				this.containerPalavra.removeChild(document.getElementById('imgCarta3'));
			}else if(this.DESAFIO.length === 2){
				this.containerPalavra.removeChild(document.getElementById('imgCarta2'));
			}else if(this.DESAFIO.length === 1){
				this.containerPalavra.removeChild(document.getElementById('imgCarta1'));
			}
		}
		else{
			TaCerto.Controladora.Jogo.Geral.fimDeJogo();
		}
	},
	rearrengeFontSize: function(aurWord){
		let maxWidth = window.innerWidth * 0.81;
		let widthSize = aurWord.getBoundingClientRect().width;
		let fontSize = 2;
		while(widthSize > maxWidth){
			fontSize -= 0.1;
			aurWord.style.fontSize = "calc(12px + " + fontSize + "vw)";
			widthSize = aurWord.getBoundingClientRect().width;
		}
	},
	pular: function(){
		this.pulou = true;
		var flag = document.getElementById('palavra').classList.length;
		//document.getElementById('palavra').classList.remove("animated", "bounce");
		var shuffledDesafio = this.shuffleDesafio(this.missaoChave);
		this.animaCard();
		this.DESAFIO[this.DESAFIO.length - 1] = shuffledDesafio[0];
		//document.getElementById('palavra').classList.add("animated", "bounce");
		document.querySelector('#cardBG>#palavra').innerHTML = this.DESAFIO[this.DESAFIO.length - 1].palavra;
		this.rearrengeFontSize(document.querySelector('#cardBG>#palavra'));		
		document.querySelector('#cardBG>#significado').innerHTML = this.DESAFIO[this.DESAFIO.length - 1].significado;

		//setTimeout(function(){
		//	if (!flag && document.getElementById('palavra'))
		//		document.getElementById('palavra').classList.remove("animated", "bounce");
		//}, 1000);
	},
	eliminarErrado: function(){
		var botao;
		var desafio = this.DESAFIO;
		if (desafio[desafio.length - 1].flag)
			botao = document.getElementById('botao2');
		else
			botao = document.getElementById('botao1');
		botao.classList.add("animated", "bounceIn");
		setTimeout(function (){
			if (document.getElementById('botao2'))
				botao.classList.remove("animated", "bounceIn");
		}, 500);
	},
	shuffleDesafio: function(missaoChave){
		var x = TaCerto.Estrutura.DesafioDeFase.normal.slice().shuffle();
		if(missaoChave || !isNaN(missaoChave))
			x.pickFase([missaoChave]);
		return x;
	},
	loadingMessage: function(){
		return "Tente acertar o máximo de palavras possíveis.";
	},
	zerarVars: function(){
		this.DESAFIO = [];
	},
	animaCard: async function(){
		var filho = document.getElementById('cardBG');
		var oClone;
		try {
			oClone = filho.cloneNode(true);
		} catch (error) {return;}
		filho.id = "";
		filho.classList.add("rollOut");

		if(!(this.DESAFIO.length-1 === 0) || this.pulou)
			this.containerPalavra.insertBefore(oClone,this.containerPalavra.firstChild);

		this.pulou = false;

		await promiseRequestAnimationFrame();
		await promiseRequestAnimationFrame();
		setTimeout(()=>{
			this.containerPalavra.removeChild(filho);
		},1000);//250
	}
};
var TaCerto = TaCerto || {};
TaCerto.Controladora = TaCerto.Controladora || {};
TaCerto.Controladora.Jogo = TaCerto.Controladora.Jogo || {};
TaCerto.Controladora.Jogo.HardCore = {
	DESAFIO: [],
	gameModel: {
		alturaAtual: 0,	
		speed: 1,
	},
	containerPalavra: 0,
	called: function () {
		this.zerarVars();

		TaCerto.Controladora.CarregarPagina.htmlCorpo("jogo", ["hardcore"], ["JogoTipo"]);
		
		var alturaDaParede = document.getElementById("parede");
		var intervaloParede = setInterval(
			function(){
				
				if(!document.getElementById("parede"))
					clearInterval(intervaloParede);
				else if(TaCerto.Controladora.Jogo.HardCore.gameModel.alturaAtual >= 72.5){
					clearInterval(intervaloParede);
					TaCerto.Controladora.Jogo.Geral.fimDeJogo();
				}else if (!TaCerto.Controladora.Jogo.Geral.gameModel.paused && !TaCerto.Controladora.Jogo.Geral.gameModel.frozen){
					TaCerto.Controladora.Jogo.HardCore.gameModel.alturaAtual += TaCerto.Controladora.Jogo.HardCore.gameModel.speed;
					if(TaCerto.Controladora.Jogo.HardCore.gameModel.alturaAtual > 72.5)
						TaCerto.Controladora.Jogo.HardCore.gameModel.alturaAtual = 72.5;
					alturaDaParede.style.height = TaCerto.Controladora.Jogo.HardCore.gameModel.alturaAtual + "vh";
				}
			}, 1000);
	},
	loadDesafio: function () {
		var desafioNum = TaCerto.Controladora.Jogo.Geral.gameModel.desafioNum = 300;//ORIGINAL: 15
		var shuffledDesafio = this.shuffleDesafio();

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
		window.setTimeout(function () {
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

			this.velocidadeParede(flagResp);
			
			TaCerto.Controladora.Jogo.Geral.atualizarResposta(flagResp);
			this.efeitoResposta(flagResp);
			
			this.DESAFIO.pop();
		}

		if(TaCerto.Controladora.Jogo.Geral.gameModel.tipoDeJogo === "HardCore"){
			if(this.DESAFIO.length){
				document.getElementById('moneyDaQuestao').innerHTML = TaCerto.Controladora.Jogo.Geral.gameModel.comboBonus;
				document.getElementById('nivelDaQuestao').innerHTML = "Nível " +this.DESAFIO[this.DESAFIO.length - 1].nivel;
				document.querySelector('#cardBG>#palavra').innerHTML = this.DESAFIO[this.DESAFIO.length - 1].palavra;
				this.rearrengeFontSize(document.querySelector('#cardBG>#palavra'));
				document.querySelector('#cardBG>#significado').innerHTML = this.DESAFIO[this.DESAFIO.length - 1].significado;
			}else
				TaCerto.Controladora.Jogo.Geral.fimDeJogo();
		}
	},
	velocidadeParede: function(flag){
		if(flag){
			if(this.gameModel.alturaAtual === 72.5){
				this.gameModel.alturaAtual = 65;
				document.getElementById("parede").style.height = this.gameModel.alturaAtual  + "vh";
			}
			
			if(this.gameModel.speed > 0.15)
				this.gameModel.speed  -= 0.1;
		}else{
			if(this.gameModel.speed < 5)
				this.gameModel.speed  += 0.4;
		}
	},
	rearrengeFontSize: function(aurWord){
		let maxWidth = window.innerWidth * 0.81;
		let widthSize = aurWord.getBoundingClientRect().width;
		let fontSize = 2;
		while(widthSize >= maxWidth){
			fontSize -= 0.1;
			aurWord.style.fontSize = "calc(12px + " + fontSize + "vw)";
			widthSize = aurWord.getBoundingClientRect().width;
		}
	},
	pular: function(){
		var flag = document.getElementById('palavra').classList.length;
		//document.getElementById('palavra').classList.remove("animated", "bounce");
		var shuffledDesafio = TaCerto.Controladora.Jogo.Normal.shuffleDesafio();
		this.animaCard();
		TaCerto.Controladora.Jogo.Normal.DESAFIO[TaCerto.Controladora.Jogo.Normal.DESAFIO.length - 1] = shuffledDesafio[0];
		//document.getElementById('palavra').classList.add("animated", "bounce");
		document.querySelector('#cardBG>#palavra').innerHTML = TaCerto.Controladora.Jogo.Normal.DESAFIO[TaCerto.Controladora.Jogo.Normal.DESAFIO.length - 1].palavra;
		this.rearrengeFontSize(document.querySelector('#cardBG>#palavra'));
		document.querySelector('#cardBG>#significado').innerHTML = TaCerto.Controladora.Jogo.Normal.DESAFIO[TaCerto.Controladora.Jogo.Normal.DESAFIO.length - 1].significado;

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
	shuffleDesafio: function(){
		var x = TaCerto.Estrutura.DesafioDeFase.normal.slice().shuffle();
		return x;
	},
	loadingMessage: function(){
		return "Acerte as palavras muito rápido!";
	},
	zerarVars: function(){
		this.gameModel.alturaAtual = 0;
		this.gameModel.speed = 1;
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
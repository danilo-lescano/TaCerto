var TaCerto = TaCerto || {};
TaCerto.Controladora = TaCerto.Controladora || {};
TaCerto.Controladora.Jogo = TaCerto.Controladora.Jogo || {};
TaCerto.Controladora.Jogo.HardCore = {
	DESAFIO: [],
	called: function () {
		TaCerto.Controladora.CarregarPagina.htmlCorpo("jogo", ["hardcore"], ["JogoTipo"]);
		document.getElementsByClassName("second")[0].style.animation = "timeRev 60s infinite linear";
	},
	loadDesafio: function () {
		var desafioNum = TaCerto.Controladora.Jogo.Geral.gameModel.desafioNum = 57;//ORIGINAL: 15
		var shuffledDesafio = this.shuffleDesafio();

		for (var i = 0; i < desafioNum; i++)
			TaCerto.Controladora.Jogo.HardCore.DESAFIO[i] = shuffledDesafio[i];
		document.getElementById('palavra').innerHTML = TaCerto.Controladora.Jogo.HardCore.DESAFIO[TaCerto.Controladora.Jogo.HardCore.DESAFIO.length - 1].palavra;
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
		if (resp) botao = document.getElementById('botao2');
		else botao = document.getElementById('botao1');
		botao.classList.add("animated"); botao.classList.add("bounceIn"); 
		setTimeout(function () {botao.classList.remove("animated", "bounceIn");}, 500);
		
		if (TaCerto.Controladora.Jogo.HardCore.DESAFIO.length){
			flagResp = TaCerto.Controladora.Jogo.HardCore.DESAFIO[TaCerto.Controladora.Jogo.HardCore.DESAFIO.length - 1].flag === resp;
			TaCerto.Controladora.Jogo.Geral.atualizarResposta(flagResp);
			TaCerto.Controladora.Jogo.HardCore.efeitoResposta(flagResp);
			
			TaCerto.Controladora.Jogo.HardCore.DESAFIO.pop();
		}

		if(TaCerto.Controladora.Jogo.Geral.gameModel.tipoDeJogo === "HardCore"){
			if(TaCerto.Controladora.Jogo.HardCore.DESAFIO.length)
				document.getElementById('palavra').innerHTML = TaCerto.Controladora.Jogo.HardCore.DESAFIO[TaCerto.Controladora.Jogo.HardCore.DESAFIO.length - 1].palavra;
			/*else
				TaCerto.Controladora.Jogo.Geral.fimDeJogo();*/
		}
	},
	pular: function(){
		var flag = document.getElementById('palavra').classList.length;
		document.getElementById('palavra').classList.remove("animated", "bounce");
		var shuffledDesafio = TaCerto.Controladora.Jogo.HardCore.shuffleDesafio();

		TaCerto.Controladora.Jogo.HardCore.DESAFIO[TaCerto.Controladora.Jogo.HardCore.DESAFIO.length - 1] = shuffledDesafio[0];
		document.getElementById('palavra').classList.add("animated", "bounce");
		document.getElementById('palavra').innerHTML = TaCerto.Controladora.Jogo.HardCore.DESAFIO[TaCerto.Controladora.Jogo.HardCore.DESAFIO.length - 1].palavra;
		setTimeout(function(){
			if (!flag && document.getElementById('palavra'))
				document.getElementById('palavra').classList.remove("animated", "bounce");
		}, 1000);
	},
	eliminarErrado: function(){
		var botao;
		var desafio = TaCerto.Controladora.Jogo.HardCore.DESAFIO;
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
		var x = TaCerto.Estrutura.DesafioDeFase.normal;
		var arr = [];
		var auxNvl = TaCerto.Controladora.Jogo.Missao.parametros.missao ? TaCerto.Controladora.Jogo.Missao.parametros.missao : 0;
		for (var i = auxNvl; i < TaCerto.Controladora.Jogo.Geral.calculaLvl(TaCerto.Estrutura.Jogador.xp); i++)
			arr[i] = i;
		x.shuffle();
		x.pickFase(arr);
		return x;
	},
	zerarVars: function(){
		
	}
};
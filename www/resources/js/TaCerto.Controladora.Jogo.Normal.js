var TaCerto = TaCerto || {};
TaCerto.Controladora = TaCerto.Controladora || {};
TaCerto.Controladora.Jogo = TaCerto.Controladora.Jogo || {};
TaCerto.Controladora.Jogo.Normal = {
	DESAFIO: [],
	called: function () {
		TaCerto.Controladora.CarregarPagina.htmlCorpo("jogo", ["normal"], ["JogoTipo"]);
	},
	loadDesafio: function () {
		var desafioNum = TaCerto.Controladora.Jogo.Geral.gameModel.desafioNum = 15;//ORIGINAL: 15
		var shuffledDesafio = TaCerto.Controladora.Jogo.Normal.shuffleDesafio();

		for (var i = 0; i < desafioNum; i++)
			TaCerto.Controladora.Jogo.Normal.DESAFIO[i] = shuffledDesafio[i];

		document.getElementById('moneyDaQuestao').innerHTML = TaCerto.Controladora.Jogo.Geral.gameModel.comboBonus;
		document.getElementById('nivelDaQuestao').innerHTML = "Nível " +TaCerto.Controladora.Jogo.Normal.DESAFIO[TaCerto.Controladora.Jogo.Normal.DESAFIO.length - 1].nivel;
		document.getElementById('palavra').innerHTML = TaCerto.Controladora.Jogo.Normal.DESAFIO[TaCerto.Controladora.Jogo.Normal.DESAFIO.length - 1].palavra;
		document.getElementById('significado').innerHTML = TaCerto.Controladora.Jogo.Normal.DESAFIO[TaCerto.Controladora.Jogo.Normal.DESAFIO.length - 1].significado;
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
		if (resp) botao = document.getElementById('botao2');
		else botao = document.getElementById('botao1');
		botao.classList.add("animated"); botao.classList.add("bounceIn"); 
		setTimeout(function () {botao.classList.remove("animated", "bounceIn");}, 500);
		
		if (TaCerto.Controladora.Jogo.Normal.DESAFIO.length){
			flagResp = TaCerto.Controladora.Jogo.Normal.DESAFIO[TaCerto.Controladora.Jogo.Normal.DESAFIO.length - 1].flag === resp;
			
			// Checa se errou e chama função para adicionar na lista de dicas
			if(!flagResp)
				TaCerto.Controladora.Dica.colocaDica(TaCerto.Controladora.Jogo.Normal.DESAFIO[TaCerto.Controladora.Jogo.Normal.DESAFIO.length - 1].id, TaCerto.Controladora.Jogo.Normal.DESAFIO[TaCerto.Controladora.Jogo.Normal.DESAFIO.length - 1].dica);
			
			TaCerto.Controladora.Jogo.Geral.atualizarResposta(flagResp);
			TaCerto.Controladora.Jogo.Normal.efeitoResposta(flagResp);
			
			TaCerto.Controladora.Jogo.Normal.DESAFIO.pop();
		}
				
		if(TaCerto.Controladora.Jogo.Normal.DESAFIO.length){
			setTimeout(function(){
				document.getElementById('moneyDaQuestao').innerHTML = TaCerto.Controladora.Jogo.Geral.gameModel.comboBonus;
				document.getElementById('nivelDaQuestao').innerHTML = "Nível " +TaCerto.Controladora.Jogo.Normal.DESAFIO[TaCerto.Controladora.Jogo.Normal.DESAFIO.length - 1].nivel;
				document.getElementById('palavra').innerHTML = TaCerto.Controladora.Jogo.Normal.DESAFIO[TaCerto.Controladora.Jogo.Normal.DESAFIO.length - 1].palavra;
				document.getElementById('significado').innerHTML = TaCerto.Controladora.Jogo.Normal.DESAFIO[TaCerto.Controladora.Jogo.Normal.DESAFIO.length - 1].significado;
			}, TaCerto.Controladora.Jogo.Geral.gameModel.tipoDeJogo === "Aleatorio" ? 500 : 0);
		}
		else{
			TaCerto.Controladora.Jogo.Geral.fimDeJogo();
		}
	},
	pular: function(){
		var flag = document.getElementById('palavra').classList.length;
		document.getElementById('palavra').classList.remove("animated", "bounce");
		var shuffledDesafio = TaCerto.Controladora.Jogo.Normal.shuffleDesafio();

		TaCerto.Controladora.Jogo.Normal.DESAFIO[TaCerto.Controladora.Jogo.Normal.DESAFIO.length - 1] = shuffledDesafio[0];
		document.getElementById('palavra').classList.add("animated", "bounce");
		document.getElementById('palavra').innerHTML = TaCerto.Controladora.Jogo.Normal.DESAFIO[TaCerto.Controladora.Jogo.Normal.DESAFIO.length - 1].palavra;
		document.getElementById('significado').innerHTML = TaCerto.Controladora.Jogo.Normal.DESAFIO[TaCerto.Controladora.Jogo.Normal.DESAFIO.length - 1].significado;

		setTimeout(function(){
			if (!flag && document.getElementById('palavra'))
				document.getElementById('palavra').classList.remove("animated", "bounce");
		}, 1000);
	},
	eliminarErrado: function(){
		var botao;
		var desafio = TaCerto.Controladora.Jogo.Normal.DESAFIO;
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
		TaCerto.Controladora.Jogo.Normal.DESAFIO = [];
	}
};
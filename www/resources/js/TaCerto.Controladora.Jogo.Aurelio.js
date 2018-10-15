var TaCerto = TaCerto || {};
TaCerto.Controladora = TaCerto.Controladora || {};
TaCerto.Controladora.Jogo = TaCerto.Controladora.Jogo || {};
TaCerto.Controladora.Jogo.Aurelio = {
	DESAFIO: [],
	called: function () {
		TaCerto.Controladora.CarregarPagina.htmlCorpo("jogo", ["aurelio"], ["JogoTipo"]);
		console.log(1);
	},
	loadDesafio: function () {
		var auxDesafio = this.shuffleDesafio();
		for(var i = 0; i < 15; i++)
			this.DESAFIO[i] = auxDesafio[i];
		this.DESAFIO[this.DESAFIO.length] = "deletar ultima parada";
		console.log(2);
		this.proximoDesafio();
	},
	proximoDesafio: function(){
		this.DESAFIO.pop();
		if(this.DESAFIO.length){
			this.btnResposta();
			return;
		}

		this.zerarVars();
		TaCerto.Controladora.Jogo.Geral.fimDeJogo();
	},
	btnResposta: function(){
		//this.proximoDesafio();
		//TaCerto.Controladora.Jogo.Geral.atualizarResposta(true);
	},
	eliminarErrado: function(){
		//carta amarela
	},
	pular: function(){
		//carta vermelha
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
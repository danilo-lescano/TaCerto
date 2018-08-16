var TaCerto = TaCerto || {};
TaCerto.Controladora = TaCerto.Controladora || {};
TaCerto.Controladora.FimJogo = {
	model:{
		tipoDeJogo: undefined,
		missao: undefined,


	},
	zerarVars: function(){
		TaCerto.Controladora.FimJogo.tipoDeJogo = undefined;
		TaCerto.Controladora.FimJogo.missao = undefined;
	},
	displayMission: function(){
		var missoesConquistadas;

		if (TaCerto.Controladora.FimJogo.missao !== undefined) {
			var missaoNum = TaCerto.Controladora.FimJogo.missao;
			var missoesConquistadas = TaCerto.Estrutura.Jogador.missoes[missaoNum];

		}
	},

	btnHome: function(){
		TaCerto.Controladora.CarregarPagina.htmlCorpo('menuInicial');
		TaCerto.Controladora.FimJogo.zerarVars();
	},
	btnCasual: function(){
		TaCerto.Controladora.MenuCasual.load();
		TaCerto.Controladora.FimJogo.zerarVars();
	},
	btnMissao: function(){
		TaCerto.Controladora.MenuMissao.load();
		TaCerto.Controladora.FimJogo.zerarVars();
	},
	btnReiniciar: function(){
		TaCerto.Controladora.Jogo.Load(TaCerto.Controladora.FimJogo.model.tipoDeJogo, TaCerto.Controladora.FimJogo.model.missao);
		TaCerto.Controladora.FimJogo.zerarVars();
	},
};
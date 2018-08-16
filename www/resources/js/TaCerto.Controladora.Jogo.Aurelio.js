var TaCerto = TaCerto || {};
TaCerto.Controladora = TaCerto.Controladora || {};
TaCerto.Controladora.Jogo = TaCerto.Controladora.Jogo || {};
TaCerto.Controladora.Jogo.Aurelio = {
	DESAFIO: [],
	called: function () {
		TaCerto.Controladora.CarregarPagina.htmlCorpo("jogo", ["aurelio"], ["JogoTipo"]);
		setTimeout(function(){
			TaCerto.Controladora.Jogo.Geral.fimDeJogo();
		}, 100);
	},
	loadDesafio: function () {

	},
	btnResposta: function(resp){
		
	},
	zerarVars: function(){
		
	}
};
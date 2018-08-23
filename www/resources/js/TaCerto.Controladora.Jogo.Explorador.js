var TaCerto = TaCerto || {};
TaCerto.Controladora = TaCerto.Controladora || {};
TaCerto.Controladora.Jogo = TaCerto.Controladora.Jogo || {};
TaCerto.Controladora.Jogo.Explorador = {
	DESAFIO: [],
	called: function () {
		TaCerto.Controladora.CarregarPagina.htmlCorpo("jogo", ["explorador"], ["JogoTipo"]);
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
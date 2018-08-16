var TaCerto = TaCerto || {};
TaCerto.Controladora = TaCerto.Controladora || {};
TaCerto.Controladora.MenuCasual = {
	load: function(){
		TaCerto.Controladora.CarregarPagina.htmlCorpo("menuCasual");
	},
	callGame: function(tipo){
		TaCerto.Controladora.Jogo.Load(tipo);
	},
	homeBtn: function () {
		TaCerto.Controladora.CarregarPagina.htmlCorpo("menuInicial");
	}
};
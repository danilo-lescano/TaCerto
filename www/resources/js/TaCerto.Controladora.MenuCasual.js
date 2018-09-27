var TaCerto = TaCerto || {};
TaCerto.Controladora = TaCerto.Controladora || {};
TaCerto.Controladora.MenuCasual = {
	load: function(){
		TaCerto.Controladora.CarregarPagina.htmlCorpo("menuCasual",["dica"],["dica"]);
	},
	callGame: function(tipo, el){
		TaCerto.GenFunc.fadeInBtnClick(el,
		function(){
			TaCerto.Controladora.Jogo.Load(tipo);
		});
	},
	homeBtn: function (el) {
		TaCerto.GenFunc.fadeInBtnClick(el,
		function(){
			//TaCerto.Controladora.CarregarPagina.htmlCorpo("menuInicial",["dica"],["dica"]);
			TaCerto.Controladora.MenuInicial.load();
		});
	}
};
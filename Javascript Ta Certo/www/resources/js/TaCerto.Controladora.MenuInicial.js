var TaCerto = TaCerto || {};
TaCerto.Controladora = TaCerto.Controladora || {};
TaCerto.Controladora.MenuInicial = {
	menuMissao: function(el){
		TaCerto.GenFunc.fadeInBtnClick(el,
		function(){
			TaCerto.Controladora.MenuMissao.load();
		}, 200);
	},
	menuCasual: function(el){
		TaCerto.GenFunc.fadeInBtnClick(el,
		function(){
			TaCerto.Controladora.MenuCasual.load();
		},200);
	},
	menuConquistas: function(el){
		TaCerto.GenFunc.fadeInBtnClick(el,
		function(){
			TaCerto.Controladora.MenuConquistas.load();
		}, 200);
	},
	load: function(){
		TaCerto.Controladora.CarregarPagina.htmlCorpo("menuInicial",["dica"],["dica"]);
	},
};
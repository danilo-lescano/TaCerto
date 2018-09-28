var TaCerto = TaCerto || {};
TaCerto.Controladora = TaCerto.Controladora || {};
TaCerto.Controladora.MenuInicial = {
	menuMissao: function(){
		TaCerto.GenFunc.fadeInBtnClick(document.getElementsByClassName("menuIicial_btn1")[0],
		function(){
			TaCerto.Controladora.MenuMissao.load();
		}, 200);
	},
	menuCasual: function(){
		TaCerto.GenFunc.fadeInBtnClick(document.getElementsByClassName("menuIicial_btn2")[0],
		function(){
			TaCerto.Controladora.MenuCasual.load();
		},200);
	},
	menuConquistas: function(){
		TaCerto.GenFunc.fadeInBtnClick(document.getElementsByClassName("menuIicial_btn3")[0]),
		function(){
			TaCerto.Controladora.MenuConquistas.load();
		}, 200;
	},
	load: function(){
		TaCerto.Controladora.CarregarPagina.htmlCorpo("menuInicial",["dica"],["dica"]);
	},
};
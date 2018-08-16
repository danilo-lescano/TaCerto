var TaCerto = TaCerto || {};
TaCerto.Controladora = TaCerto.Controladora || {};
TaCerto.Controladora.MenuInicial = {
	menuMissao: function(){
		TaCerto.Controladora.MenuMissao.load();
	},
	menuCasual: function(){
		TaCerto.Controladora.MenuCasual.load();
	}
};
var TaCerto = TaCerto || {};
TaCerto.Controladora = TaCerto.Controladora || {};
TaCerto.Controladora.Loja = {
    model:{
        backPage: undefined
    },
    voltarBtn: function(el){
        TaCerto.GenFunc.fadeInBtnClick(el,
        function(){
            if(TaCerto.Controladora[TaCerto.Controladora.Loja.model.backPage] && TaCerto.Controladora[TaCerto.Controladora.Loja.model.backPage].load)
                TaCerto.Controladora[TaCerto.Controladora.Loja.model.backPage].load();
            else
                TaCerto.Controladora.CarregarPagina.htmlCorpo(TaCerto.Controladora.Loja.model.backPage);
        });
    },
    cardBtn: function(el){
        TaCerto.GenFunc.fadeInBtnClick(el.parentElement,
            function(){
            });
    },
	load: function(pagina){
        TaCerto.Controladora.Loja.model.backPage = pagina;
        TaCerto.Controladora.CarregarPagina.htmlCorpo('loja');
    }
};
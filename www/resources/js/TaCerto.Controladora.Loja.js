var TaCerto = TaCerto || {};
TaCerto.Controladora = TaCerto.Controladora || {};
TaCerto.Controladora.Loja = {
    modal: undefined,
    voltarBtn: function(el){
        TaCerto.GenFunc.fadeInBtnClick(el,
        function(){
            document.getElementById('loja').style.display = "none";
		    //blur game blend
            var blurThis = document.getElementsByClassName('corpo')[0].getElementsByTagName("*");
            blurThis[blurThis.length] = document.getElementsByClassName('gameBlend')[0];
            for (var i = 0; i < blurThis.length; i++) {
                blurThis[i].style.filter = "none";
            }
            if(TaCerto.Controladora.Loja.modal){
                var blurThis = [document.getElementsByClassName('gameBlend')[0], document.getElementsByClassName('jogo_wrapper')[0]];
                for (var i = 0; i < blurThis.length; i++) {
                    blurThis[i].style.filter = "blur(5px)";
                }
            }
        });
    },
    openCardModal: function(el){
        //TaCerto.GenFunc.fadeInBtnClick(el.parentElement,function(){
           // getElementById(el.id+"-modal").style.display = "block";
        // });
    },
	display: function(isModal){
        TaCerto.Controladora.Loja.modal = isModal;
        document.getElementById('loja').style.display = "block";
		//blur game blend
		var blurThis = document.getElementsByClassName('corpo')[0].getElementsByTagName("*");
        blurThis[blurThis.length] = document.getElementsByClassName('gameBlend')[0];
		for (var i = 0; i < blurThis.length; i++) {
			blurThis[i].style.filter = "blur(5px)";
		}
    }
};
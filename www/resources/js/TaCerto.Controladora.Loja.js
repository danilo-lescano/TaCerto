var TaCerto = TaCerto || {};
TaCerto.Controladora = TaCerto.Controladora || {};
TaCerto.Controladora.Loja = {
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
        });
    },
    cardBtn: function(el){
        TaCerto.GenFunc.fadeInBtnClick(el.parentElement,
            function(){
            });
    },
	display: function(){
        document.getElementById('loja').style.display = "block";
		//blur game blend
		var blurThis = document.getElementsByClassName('corpo')[0].getElementsByTagName("*");
        blurThis[blurThis.length] = document.getElementsByClassName('gameBlend')[0];
		for (var i = 0; i < blurThis.length; i++) {
			blurThis[i].style.filter = "blur(5px)";
		}
    }
};
var TaCerto = TaCerto || {};
TaCerto.Controladora = TaCerto.Controladora || {};
TaCerto.Controladora.Loja = {
    modal: undefined,
    miniModalCard: undefined,
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
        TaCerto.GenFunc.fadeInBtnClick(el.parentElement,function(){
            TaCerto.Controladora.Loja.miniModalCard = el.id;

            var blurThis = document.getElementById('loja').getElementsByTagName("*");
            blurThis[blurThis.length] = document.getElementsByClassName('gameBlend')[0];
            for (var i = 0; i < blurThis.length; i++) {
                blurThis[i].style.filter = "blur(5px)";
            }

            var unBlurThis = [];
            unBlurThis[unBlurThis.length] = document.getElementsByClassName("cartaLojaModalBtn1")[0];
            unBlurThis[unBlurThis.length] = document.getElementsByClassName("cartaLojaModalBtn1")[0].getElementsByTagName("*")[0];
            unBlurThis[unBlurThis.length] = document.getElementsByClassName("cartaLojaModalBtn2")[0];
            unBlurThis[unBlurThis.length] = document.getElementById(el.id+"-modal");
            unBlurThis[unBlurThis.length] = document.getElementById(el.id+"-modal").getElementsByClassName("modalComprarCartaImg")[0];
            for (var i = 0; i < unBlurThis.length; i++) {
                unBlurThis[i].style.filter = "none";
            }
            document.getElementsByClassName("cartaLojaModalBtn1")[0].style.display = "block";
            document.getElementsByClassName("cartaLojaModalBtn2")[0].style.display = "block";
            document.getElementById(el.id+"-modal").style.display = "block";
        });
    },
    closeMiniModal: function(el){
        TaCerto.GenFunc.fadeInBtnClick(el,function(){
            elModal = TaCerto.Controladora.Loja.miniModalCard;
            document.getElementsByClassName("cartaLojaModalBtn1")[0].style.display = "none";
            document.getElementsByClassName("cartaLojaModalBtn2")[0].style.display = "none";
            document.getElementById(elModal+"-modal").style.display = "none";
            //blur game blend
            var unBlurThis = document.getElementById('loja').getElementsByTagName("*");
            for (var i = 0; i < unBlurThis.length; i++) {
                unBlurThis[i].style.filter = "none";
            }
        });
    },
    buyCard: function(el){
        TaCerto.Controladora.Loja.closeMiniModal(el);
        if (TaCerto.Estrutura.Jogador.moeda - 1 >= 0){
            var cardId = TaCerto.Controladora.Loja.miniModalCard.split("Loja")[0];
            TaCerto.Estrutura.Jogador.moeda -= TaCerto.Estrutura.Carta.preco;
            TaCerto.Estrutura.Jogador[cardId] += 1;
            document.getElementById("moedasLoja").innerHTML = TaCerto.Estrutura.Jogador.moeda;
            document.getElementById("moedas").innerHTML = TaCerto.Estrutura.Jogador.moeda;

            
        }
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
        document.getElementById("moedasLoja").innerHTML = TaCerto.Estrutura.Jogador.moeda;
    }
};
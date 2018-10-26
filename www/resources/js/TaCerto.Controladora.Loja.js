var TaCerto = TaCerto || {};
TaCerto.Controladora = TaCerto.Controladora || {};
TaCerto.Controladora.Loja = {
    modal: undefined,
    miniModalCard: undefined,
    cardPrice: 25,
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
        TaCerto.GenFunc.fadeInBtnClick(el.parentElement,()=>{
            TaCerto.Controladora.Loja.miniModalCard = el.id;

            if(TaCerto.Estrutura.Jogador.moeda - this.cardPrice < 0)
                document.getElementsByClassName("cartaLojaModalBtn1")[0].style.filter = "grayscale(100%)";
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
        if (TaCerto.Estrutura.Jogador.moeda - this.cardPrice >= 0){
            this.closeMiniModal(el);
            var cardId = this.miniModalCard.split("Loja")[0];
            TaCerto.Estrutura.Jogador.moeda -= this.cardPrice;
            TaCerto.Estrutura.Jogador[cardId] += 1;
            document.getElementById("moedasLoja").innerHTML = TaCerto.Estrutura.Jogador.moeda;
            document.getElementById("moedas").innerHTML = TaCerto.Estrutura.Jogador.moeda;
        }
    },
	display: function(isModal){
        this.modal = isModal;
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
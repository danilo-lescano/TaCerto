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
                blurThis[i].style.removeProperty("filter");
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
    closeMiniModal: async function(el){
        if(el){
            el.style.transform = "translate(-15%, calc(80% + 4px))";
            await delay(200);
        }

        elModal = TaCerto.Controladora.Loja.miniModalCard;
        document.getElementsByClassName("cartaLojaModalBtn1")[0].style.display = "none";
        document.getElementsByClassName("cartaLojaModalBtn2")[0].style.display = "none";
        document.getElementById(elModal+"-modal").style.display = "none";
        //blur game blend
        var unBlurThis = document.getElementById('loja').getElementsByTagName("*");
        for (var i = 0; i < unBlurThis.length; i++) {
            unBlurThis[i].style.removeProperty("filter");
        }
        if(el)
            el.style.transform = "translate(-15%, calc(80% + 0px))";
    },
    buyCard: function(el){
        if (TaCerto.Estrutura.Jogador.moeda - this.cardPrice >= 0){
            this.closeMiniModal(el);
            var cardId = this.miniModalCard.split("Loja")[0];
            TaCerto.Estrutura.Jogador.moeda -= this.cardPrice;
            TaCerto.Estrutura.Jogador[cardId] += 1;
            document.getElementById("moedasLoja").innerHTML = TaCerto.Estrutura.Jogador.moeda;
            if(document.getElementById("moedas"))
                document.getElementById("moedas").innerHTML = TaCerto.Estrutura.Jogador.moeda;
            this.checkCardAvailable();
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
    },
    checkCardAvailable: function(){
		var cardDiv = ["cartaVermelha", "cartaAzul", "cartaAmarela", "cartaVerde"];
        var cartaUsada = TaCerto.Controladora.Jogo.Geral.gameModel.cartaUsada;
		if (document.getElementById("flagCardExists")){
			for (var i = 0; i < cardDiv.length; i++) {
				document.getElementById(cardDiv[i]).innerHTML = "";
				for (var j = 0; j < TaCerto.Estrutura.Jogador[cardDiv[i]] && j < 2 && j < 2 - cartaUsada[cardDiv[i]]; j++) {

					let img = new Image();
					let src = "resources/media/image/" + cardDiv[i] + ".png";
					img.src = src;
					document.getElementById(cardDiv[i]).innerHTML += '<div class="imgCard bg' + cardDiv[i] + '"' + 'onclick="TaCerto.Controladora.Jogo.Geral.clickCarta(' + "'" + cardDiv[i] + "'" + ');"></div>';
				}
			}
		}
	}
};
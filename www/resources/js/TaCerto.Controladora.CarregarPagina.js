var TaCerto = TaCerto || {};
TaCerto.Controladora = TaCerto.Controladora || {};
TaCerto.Controladora.CarregarPagina = {
	htmlCorpo: function(pagina, apendice, apendiceid){
		if (pagina) {
			TaCerto.Controladora.CarregarPagina.LoadBG(apendice && apendice[0] === "lacuna" ? apendice[0] : pagina);
			var flagFound = false;
			for (var i = 0; i < TaCerto.HTML.length; i++)
				if (pagina === TaCerto.HTML[i].name){
					flagFound = true;
					document.getElementsByClassName('corpo')[0].innerHTML = TaCerto.HTML[i].conteudo;
				}
			console.log("htmlCorpo " + pagina + " found: " + flagFound);
		}
		if (apendice !== undefined) {
			TaCerto.Controladora.CarregarPagina.apendiceLoad(pagina, apendice, apendiceid);
		}
		TaCerto.Controladora.CarregarPagina.checkCardAvailable();
	},
	LoadBG: function (pagina) {
		var resetLayers = function(theLayer) {
			var layers = document.getElementsByClassName("layer");
			for (var i = 0; i < layers.length; i++)
				layers[i].style.display = "none";
			document.getElementsByClassName(theLayer)[0].style.display = "block";
		};
		if(pagina === "menuInicial" || pagina === "login") resetLayers("softBlue");
		else if(pagina === "menuCasual" || pagina === "loja"){
			resetLayers("brownGradient");
			document.getElementsByClassName("whiteBG")[0].style.display = "block";
		}
		else if(pagina === "jogo"){
			resetLayers("gameBlend");
			document.getElementsByClassName("JogoBg1")[0].style.display = "block";
			document.getElementsByClassName("JogoBg2")[0].style.display = "block";
			document.getElementsByClassName("JogoBg3")[0].style.display = "block";
			document.getElementsByClassName("JogoBg4-1x1")[0].style.display = "block";
			document.getElementsByClassName("JogoBg4-1x2")[0].style.display = "block";
			document.getElementsByClassName("JogoBg5")[0].style.display = "block";
			document.getElementsByClassName("JogoBg6")[0].style.display = "block";
			document.getElementsByClassName("JogoBg7")[0].style.display = "block";
		}
		else if(pagina === "lacuna" ){
			resetLayers("gameBlend");
			document.getElementsByClassName("JogoBg1")[0].style.display = "block";
			document.getElementsByClassName("JogoBg2")[0].style.display = "block";
			document.getElementsByClassName("JogoBg3")[0].style.display = "block";
			document.getElementsByClassName("JogoBg4-3x1")[0].style.display = "block";
			document.getElementsByClassName("JogoBg4-3x2")[0].style.display = "block";
			document.getElementsByClassName("JogoBg5-3x1")[0].style.display = "block";
			document.getElementsByClassName("JogoBg6-3x1")[0].style.display = "block";
			document.getElementsByClassName("JogoBg7")[0].style.display = "block";
		}
		else if(pagina === "loading") resetLayers("loading");
		else if(pagina === "fimDeJogo") resetLayers("marineBlue");
		else if(pagina === "menuMissao"){
			resetLayers("gameBlend");
			document.getElementsByClassName("JogoBg1")[0].style.display = "block";
			document.getElementsByClassName("JogoBg2")[0].style.display = "block";
			document.getElementsByClassName("JogoBg3")[0].style.display = "block";
			document.getElementsByClassName("JogoBg4-2x1")[0].style.display = "block";
			document.getElementsByClassName("JogoBg4-2x2")[0].style.display = "block";
			document.getElementsByClassName("JogoBg5")[0].style.display = "block";
			document.getElementsByClassName("JogoBg6")[0].style.display = "block";
			document.getElementsByClassName("JogoBg7")[0].style.display = "block";
		}
	},
	apendiceLoad: function(pagina, apendice, apendiceid){
		for (var i = 0; i < apendice.length; i++) {
			apendice[i] = (pagina + "." + apendice[i]).trim();
			var flagFound = false;
			for (var j = 0; j < TaCerto.HTML.length; j++)
				if (apendice[i] === TaCerto.HTML[j].name){
					flagFound = true;
					document.getElementById(apendiceid[i]).innerHTML = TaCerto.HTML[j].conteudo;
				}
			console.log("\tapendice " + apendice[i] + " found: " + flagFound);
		}
	},
	checkCardAvailable: function(){
		var cardDiv = ["cartaVermelha", "cartaAzul", "cartaAmarela", "cartaVerde"];

		if (document.getElementById("flagCardExists")){
			for (var i = 0; i < cardDiv.length; i++) {
				document.getElementById(cardDiv[i]).innerHTML = "";
				for (var j = 0; j < TaCerto.Estrutura.Jogador[cardDiv[i]] && j < 2; j++) {

					let img = new Image();
					let src = "resources/media/image/" + cardDiv[i] + ".png";
					img.src = src;
					document.getElementById(cardDiv[i]).innerHTML += '<div class="imgCard bg' + cardDiv[i] + '"' + 'onclick="TaCerto.Controladora.Jogo.Geral.clickCarta(' + "'" + cardDiv[i] + "'" + ');"></div>';
				}
			}
		}
	}
};
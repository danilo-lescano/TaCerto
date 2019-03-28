var TaCerto = TaCerto || {};
TaCerto.Controladora = TaCerto.Controladora || {};
TaCerto.Controladora.CarregarPagina = {
	timestamp: undefined,
	animacaoFimDeFase: false, //variavel utilizada para tratar diferente animações de transição
	htmlCorpo: function(pagina, apendice, apendiceid){
		this.timestamp = Date.now()+1500;
		this.sizeCheck(this.timestamp);
		if (pagina) {
			this.LoadBG(apendice && (apendice[0] === "lacuna" || apendice[0] === "aurelio") ? apendice[0] : pagina);
			var flagFound = false;
			for (var i = 0; i < TaCerto.HTML.length; i++)
				if (pagina === TaCerto.HTML[i].name){
					flagFound = true;
					document.getElementsByClassName('corpo')[0].innerHTML = TaCerto.HTML[i].conteudo;
				}
			console.log("htmlCorpo " + pagina + " found: " + flagFound);
		}
		if (apendice !== undefined)
			this.apendiceLoad(pagina, apendice, apendiceid);
		this.checkCardAvailable();
	},
	LoadBG: function (pagina) {
		var resetLayers = (theLayer)=>{
			var layers = document.getElementsByClassName("layer");
			for (var i = 0; i < layers.length; i++)
				layers[i].style.display = "none";
			document.getElementsByClassName(theLayer)[0].style.display = "block";
		};
		if(pagina === "menuInicial"){
			resetLayers("softBlue");
		}
		else if(pagina ==="menuConquistas" || pagina === "login") resetLayers("softBlue");
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
		else if(pagina === "lacuna"){
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
		else if(pagina === "aurelio"){
			resetLayers("gameBlend");
			document.getElementsByClassName("JogoBg1")[0].style.display = "block";
			document.getElementsByClassName("JogoBg2")[0].style.display = "block";
			document.getElementsByClassName("JogoBg3")[0].style.display = "block";
			document.getElementsByClassName("JogoBg4-4x1")[0].style.display = "block";
			document.getElementsByClassName("JogoBg4-4x2")[0].style.display = "block";
			document.getElementsByClassName("JogoBg5-4x1")[0].style.display = "block";
			document.getElementsByClassName("JogoBg6-4x1")[0].style.display = "block";
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
			apendice[i] = (apendice[i]).trim();
			if(!apendice[i])
				apendice[i] = (apendice[i]).trim();

			var flagFound = false;
			for (var j = 0; j < TaCerto.HTML.length; j++)
				if (apendice[i] === TaCerto.HTML[j].name){
					flagFound = true;
					var varApendice = document.getElementById(apendiceid[i]);
					if(!varApendice){
						varApendice = document.createElement("div");
						varApendice.id = apendiceid[i];
						document.getElementsByClassName("corpo")[0].appendChild(varApendice);
					}
					varApendice.innerHTML = TaCerto.HTML[j].conteudo;
				
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
	},
	sizeCheck: async function (timestamp){
		if(timestamp < Date.now() || this.timestamp != timestamp) return;
		var docWidth = document.documentElement.offsetWidth;
		var xxxx = document.querySelectorAll("*");
		var arrSize = [];
		for(var i = 0; i < xxxx.length; i++){
			if (xxxx[i].offsetWidth > docWidth) {
				console.log("border fix");
				document.getElementsByTagName("html")[0].style.boxSizing = "initial";
				await promiseRequestAnimationFrame();
				await promiseRequestAnimationFrame();
				document.getElementsByTagName("html")[0].style.boxSizing = "border-box";
				await promiseRequestAnimationFrame();
				await promiseRequestAnimationFrame();
			}
		}
		await promiseRequestAnimationFrame();
		this.sizeCheck(timestamp);
	}
};


//event listeners

document.addEventListener('click', function(e){
	console.log('hey');
	let elClick = e.target;
    if(elClick.classList.contains('transition2Key')){
		console.log('hoy');
		requestAnimationFrame(()=>{
			var el = document.getElementById("transitionPage");
			el.classList.add("transitionPage2");
			setTimeout(()=>{
				el.classList.remove("transitionPage2");
			}, 600);
		});
	}
    else if(elClick.classList.contains('transition3Key')){
		console.log('hoy');
		requestAnimationFrame(()=>{
			var el = document.getElementById("transitionPage");
			el.classList.add("transitionPage3");
			setTimeout(()=>{
				el.classList.remove("transitionPage3");
			}, 300);
		});
	}
 });
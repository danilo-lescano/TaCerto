var TaCerto = TaCerto || {};
TaCerto.Controladora = TaCerto.Controladora || {};
TaCerto.Controladora.PreLoad = {
	leftHTML: TaCerto.HTML.length,
	leftIMAGEM: 0,//TaCerto.IMAGEM.length,
	leftSOUND: 0,//TaCerto.SOUND.length,
	tempoDeLoading: new Date().getTime(),
	preloadHTML: function(){
		for (var i = 0; i < TaCerto.HTML.length; i++) {
			let requestHTML = new XMLHttpRequest();
			let index = i;
			requestHTML.open('GET', TaCerto.HTML[index].name + '.html');
			requestHTML.onload = function (){
				console.log("HTML carregado: " + TaCerto.HTML[index].name);
				TaCerto.HTML[index].conteudo = requestHTML.responseText;
				TaCerto.Controladora.PreLoad.leftHTML--;
				TaCerto.Controladora.PreLoad.checkIfLoaded();
			};
			requestHTML.send();
		}
	},
	preloadIMAGEM: function(){
		for (var i = 0; i < TaCerto.IMAGEM.length; i++) {
			let img = new Image();
			let index = i;
			img.src = TaCerto.IMAGEM[index].path;
			//document.getElementById('imageDB').appendChild(img);
			img.onload = function(){
				//console.log("IMAGEM carregada: " + TaCerto.IMAGEM[index].path.substring(TaCerto.IMAGEM[index].path.lastIndexOf('/') + 1));
				TaCerto.IMAGEM[index].img = img;
				TaCerto.IMAGEM[index].id = TaCerto.IMAGEM[index].path.substring(TaCerto.IMAGEM[index].path.lastIndexOf('/') + 1);
				TaCerto.Controladora.PreLoad.leftIMAGEM--;
				TaCerto.Controladora.PreLoad.checkIfLoaded();
			}
			img.onerror = function(){
				console.log("IMAGEM ERRO: " + TaCerto.IMAGEM[index].path.substring(TaCerto.IMAGEM[index].path.lastIndexOf('/') + 1));
				TaCerto.IMAGEM[index].img = null;
				TaCerto.IMAGEM[index].id = TaCerto.IMAGEM[index].path.substring(TaCerto.IMAGEM[index].path.lastIndexOf('/') + 1);
				TaCerto.Controladora.PreLoad.leftIMAGEM--;
				TaCerto.Controladora.PreLoad.checkIfLoaded();
			}
		}
	},
	preloadSOUND: function(){
		function sound(src) {
			this.sound = document.createElement("audio");
			this.sound.src = src;
			this.sound.setAttribute("preload", "auto");
			this.sound.setAttribute("controls", "none");
			this.sound.style.display = "none";
			document.getElementById('soundDB').appendChild(this.sound);
			this.play = function(){
				this.sound.pause();
				this.sound.currentTime = 0;
				this.sound.play();
			};
			this.stop = function(){
				this.sound.pause();
			};
		}

		for (var i = 0; i < TaCerto.SOUND.length; i++) {
			var loadSound = function(msg){
				if(flag){
					if (!msg) msg = "chrome zoando";
					console.log("SOUND " +  msg + ": " + TaCerto.SOUND[index].path.substring(TaCerto.SOUND[index].path.lastIndexOf('/') + 1));
					TaCerto.Controladora.PreLoad.leftSOUND--;
					TaCerto.Controladora.PreLoad.checkIfLoaded();
					flag = false;
				}
				else if(msg === "carregado"){
					console.log("---------------\n---------------\n---------------\nthe sound load after an error\n---------------\n---------------\n---------------");
				}
			};
			let index = i;
			let flag = true;
			TaCerto.SOUND[index].aud = new sound(TaCerto.SOUND[index].path);
			TaCerto.SOUND[index].aud.sound.onloadeddata = loadSound("carregado");
			TaCerto.SOUND[index].aud.sound.onerror = loadSound("ERRO");
			setTimeout(loadSound, 20000);

			/*aud.src = TaCerto.SOUND[index].path;
			aud.oncanplaythrough = function(){
				//console.log("SOUND carregado: " + TaCerto.SOUND[index].path.substring(TaCerto.SOUND[index].path.lastIndexOf('/') + 1));
				TaCerto.SOUND[index].aud = aud;
				TaCerto.SOUND[index].id = TaCerto.SOUND[index].path.substring(TaCerto.SOUND[index].path.lastIndexOf('/') + 1);
				TaCerto.Controladora.PreLoad.leftSOUND--;
				TaCerto.Controladora.PreLoad.checkIfLoaded();
			}
			aud.onerror = function(){
				console.log("SOUND ERRO: " + TaCerto.SOUND[index].path.substring(TaCerto.SOUND[index].path.lastIndexOf('/') + 1));
				TaCerto.SOUND[index].aud = null;
				TaCerto.SOUND[index].id = TaCerto.SOUND[index].path.substring(TaCerto.SOUND[index].path.lastIndexOf('/') + 1);
				TaCerto.Controladora.PreLoad.leftSOUND--;
				TaCerto.Controladora.PreLoad.checkIfLoaded();
			}*/
		}
	},
	preloadESTRUTURA: function(){
		//CARREGAR CARTA
		//CARREGAR DESAFIODEFASE
		//CARREGAR FASE
		//CARREGAR OBJETIVO
	},
	preloadJOGADOR: function(idSession){
		//CARREGAR JOGADOR
	},
	checkIfLoaded: function(){
		var loaded = TaCerto.Controladora.PreLoad.leftSOUND + TaCerto.Controladora.PreLoad.leftIMAGEM + TaCerto.Controladora.PreLoad.leftHTML;
		JSParaTeste.loadGif = JSParaTeste.loadGif || 2000;
		JSParaTeste.loading = JSParaTeste.loading || 3000;
		if (loaded <= 0) {
			TaCerto.Controladora.PreLoad.tempoDeLoading = new Date().getTime() - TaCerto.Controladora.PreLoad.tempoDeLoading;
			console.log("---------------\npaginas + imagens carregadas em: " + TaCerto.Controladora.PreLoad.tempoDeLoading + "ms\n---------------");
			setTimeout(function(){
				TaCerto.Controladora.CarregarPagina.htmlCorpo("gif");
				setTimeout(function(){
					TaCerto.Controladora.CarregarPagina.htmlCorpo("menuInicial"); //ORIGINAL:login || menuInicial
				},JSParaTeste.loading); //ORIGINAL:3000
			},JSParaTeste.loadGif); //ORIGINAL:2000
		}
	},
	start: function(){
		/*carregar uma pagina de loading aqui?*/
		TaCerto.Controladora.PreLoad.preloadHTML();
		TaCerto.Controladora.PreLoad.preloadSOUND();
		TaCerto.Controladora.PreLoad.preloadIMAGEM();
		TaCerto.Controladora.PreLoad.preloadESTRUTURA();
		TaCerto.Controladora.PreLoad.preloadJOGADOR(1);
	},
	loadImage: function(span){
		for (var i = 0; i < TaCerto.IMAGEM.length; i++) {
			if(TaCerto.IMAGEM[i].id === span.id){
				span.appendChild(TaCerto.IMAGEM[i].img);
				i = TaCerto.IMAGEM.length;
			}
		}
	}
};
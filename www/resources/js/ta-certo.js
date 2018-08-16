//misturar - array de palavras
Array.prototype.shuffle = function() {
	var i = this.length, j, temp;
	if ( i == 0 ) return this;
	while ( --i ) {
		j = Math.floor( Math.random() * ( i + 1 ) );
		temp = this[i];
		this[i] = this[j];
		this[j] = temp;
	}
	return this;
}

var TaCerto = {
	idSessao: false,
	Missao: {},
	Conquista: {},
	FinalPartida: {},
	Loja: {},
	Carregar: function(pagina) {
		TaCerto.LoadBG(pagina);
		if (pagina) {
			var requestCorpo = new XMLHttpRequest();
			requestCorpo.open('GET', pagina + '.html?loadThis=' + TaCerto.idSessao.toString());
			requestCorpo.onload = function (){
				document.getElementsByClassName('corpo')[0].innerHTML = requestCorpo.responseText;
				if(pagina === "gif"){
					var img = new Image();	img.src = "resources/media/image/entrada.gif";
					img.id = "entradaGif";	img.alt = "gif de abertura";
					var sesiGif = document.getElementById("sesiGif");
					img.onload = function () {
						sesiGif.appendChild(img);
						window.setTimeout(function(){
							TaCerto.Carregar("menuInicial"); //login
						},3000);
					}
				}
			};
			requestCorpo.send();
		}
	},
	LoadBG: function (pagina) {
		var resetLayers = function(theLayer) {
			var layers = document.getElementsByClassName("layer");
			for (var i = 0; i < layers.length; i++)
				layers[i].style.display = "none";
			document.getElementsByClassName(theLayer)[0].style.display = "block";
		}
		if(pagina === "menuInicial" || pagina === "login") resetLayers("softBlue");
		else if(pagina === "modosDeJogo") resetLayers("brownGradient");
		else if(pagina === "jogo"){
			resetLayers("gameBlend");
			document.getElementsByClassName("JogoBg1")[0].style.display = "block";
			document.getElementsByClassName("JogoBg2")[0].style.display = "block";
			document.getElementsByClassName("JogoBg3-1")[0].style.display = "block";
			document.getElementsByClassName("JogoBg3-2")[0].style.display = "block";
			document.getElementsByClassName("JogoBg4")[0].style.display = "block";
		}
	}
} 
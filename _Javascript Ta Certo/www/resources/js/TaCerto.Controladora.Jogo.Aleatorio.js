var TaCerto = TaCerto || {};
TaCerto.Controladora = TaCerto.Controladora || {};
TaCerto.Controladora.Jogo = TaCerto.Controladora.Jogo || {};
TaCerto.Controladora.Jogo.Aleatorio = {
	DESAFIO: [],
	tipoDeJogo: [
		"Normal",
		"Lacuna",
		"Explorador",
		"Aurelio",
	],
	indexTipoDeJogo: -1,
	respostasTotais: 0,
	
	clockFlashFlag: true, //ligar/delisgar efeito de flash do relogio

	called: function () {
		TaCerto.Controladora.CarregarPagina.htmlCorpo("jogo");
		var aleatorio = [];
		for (let i = 0; i < this.tipoDeJogo.length; i++) {
			let wrapper = document.createElement("div");
			wrapper.classList.add("aleWrapper");
			wrapper.id = this.tipoDeJogo[i]+"AleWrapper";
			wrapper.style.transform = "rotateX(90deg)";
			wrapper.innerHTML = ((htmlName)=>{
				for (let j = 0; j < TaCerto.HTML.length; j++) {
					if(TaCerto.HTML[j].name !== htmlName.toLowerCase()) continue;
					return TaCerto.HTML[j].conteudo;
				}
			})(this.tipoDeJogo[i]);
			document.getElementById("JogoTipo").appendChild(wrapper);
			TaCerto.Controladora.Jogo[this.tipoDeJogo[i]].loadDesafio();
		}
	},
	loadDesafio: function () {
		TaCerto.Controladora.Jogo.Geral.gameModel.desafioNum = 15;//ORIGINAL: 15
		this.next();
	},
	next: function(){
		this.respostasTotais++;
		if(this.respostasTotais > TaCerto.Controladora.Jogo.Geral.gameModel.desafioNum){
			setTimeout(()=>{
				this.zerarVars();
				TaCerto.Controladora.Jogo.Geral.fimDeJogo();
			},1010);
			return;
		}

		var oldIndex = this.indexTipoDeJogo;
		var newIndex = this.indexTipoDeJogo = Math.floor(Math.random() * this.tipoDeJogo.length);

		var oldIdFase = this.tipoDeJogo[oldIndex]+"AleWrapper";
		var newIdFase = this.tipoDeJogo[newIndex]+"AleWrapper";

		var waitingTime = (()=>{
			if(oldIndex === 0) return 450;//Normal
			else if(oldIndex === 1) return 950;//Lacuna
			else if(oldIndex === 2) return 850;//Explorador
			else if(oldIndex === 3) return 850;//Aurelio
			else return 0;
		})();

		//resolve multi clicks on normal chalenge
		var normalBtnsResolveMultiClick = (()=>{
			var btns = document.querySelectorAll("#botoes > img");
			btns[0].onclick = undefined;
			btns[1].onclick = undefined;
			setTimeout(function(){
				btns[0].onclick = function(){
					TaCerto.Controladora.Jogo.Normal.btnResposta(true);
				};
				btns[1].onclick = function(){
					TaCerto.Controladora.Jogo.Normal.btnResposta(false);
				};
			}, waitingTime);
		})();

		setTimeout(async ()=>{
			var oldF = document.getElementById(oldIdFase);
			if(oldF) oldF.style.transform = "rotateX(90deg)";
			var newF = document.getElementById(newIdFase);
			if(newF){
				newF.style.display = "none";
				newF.style.transform = "rotateX(0deg)";
				var apendice = this.tipoDeJogo[newIndex].toLowerCase();
				console.log(apendice)
				apendice = apendice && (apendice === "lacuna" || apendice === "aurelio") ? apendice : "jogo";
				TaCerto.Controladora.CarregarPagina.LoadBG(apendice);
				await promiseRequestAnimationFrame();
				newF.style.display = "block";
			} 
		}, waitingTime);
	},
	pular: function(){
		var oldIdFase = this.tipoDeJogo[this.indexTipoDeJogo]+"AleWrapper";
		var oldF = document.getElementById(oldIdFase);
		if(oldF) oldF.style.transform = "rotateX(90deg)";

		var modo = this.tipoDeJogo[this.indexTipoDeJogo];

		this.respostasTotais--;
		this.indexTipoDeJogo = -1;
		this.next();

		TaCerto.Controladora.Jogo[modo].pular();
	},
	eliminarErrado: function(){
		var modoTipo = this.tipoDeJogo[this.indexTipoDeJogo];
		TaCerto.Controladora.Jogo[modoTipo].eliminarErrado();
	},
	loadingMessage: function(){
		return "Todos os modos aleatoriamente!";
	},
	zerarVars: function(){
		this.indexTipoDeJogo = -1;
		this.respostasTotais = 0;
		for (var i = 0; i < this.tipoDeJogo.length; i++){
			var modoTipo = this.tipoDeJogo[i];
			TaCerto.Controladora.Jogo[modoTipo].zerarVars();
		}
	}
};
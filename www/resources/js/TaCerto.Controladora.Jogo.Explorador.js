var TaCerto = TaCerto || {};
TaCerto.Controladora = TaCerto.Controladora || {};
TaCerto.Controladora.Jogo = TaCerto.Controladora.Jogo || {};
TaCerto.Controladora.Jogo.Explorador = {
	DESAFIO: [],
	gameModel:{
		tipoPalavra: false,

		totalClickedTipoPalavra: 0,
		totalEquivalenteTipoPalavra: 0,
	},
	html:{
		getCleanHtml: function(){
			this.palavraExWrapper = document.getElementById("palavraExWrapper");
			this.lineWrapper = document.getElementById("lineWrapper");
			this.palavraExplorador = document.getElementById("palavraExplorador");
			this.colunaWrapper1 = document.getElementById("colunaWrapper1");
			this.colunaWrapper2 = document.getElementById("colunaWrapper2");

			if(this.palavraExWrapper && this.lineWrapper && this.palavraExplorador && this.colunaWrapper1 && this.colunaWrapper2){
				this.palavraExWrapper.innerHTML = this.lineWrapper.innerHTML = this.palavraExplorador.innerHTML = this.colunaWrapper1.innerHTML = this.colunaWrapper2.innerHTML = "";
				return true;
			}
			return false;
		}
	},

	called: function () {
		TaCerto.Controladora.CarregarPagina.htmlCorpo("jogo", ["explorador"], ["JogoTipo"]);
	},
	loadDesafio: function () {
		var desafioNum = TaCerto.Controladora.Jogo.Geral.gameModel.desafioNum = 15;//ORIGINAL: 15
		var shuffledDesafio = this.shuffleDesafio();

		for (var i = 0; i < desafioNum; i++)
			this.DESAFIO[i] = shuffledDesafio[i];

		this.DESAFIO[this.DESAFIO.length] = "primeira interação tem um pop().";
		this.proximaPergunta();
	},
	proximaPergunta: function(){
		this.DESAFIO.pop();
		if(this.DESAFIO.length === 0){
			this.zerarVars();
			TaCerto.Controladora.Jogo.Geral.fimDeJogo();
			return;
		}

		//clean html
		this.html.getCleanHtml();

		var desafio = JSON.parse(JSON.stringify(this.DESAFIO[this.DESAFIO.length -1]));
		console.log(desafio);
		this.gameModel.tipoPalavra = desafio.palavra;
		
		if(this.gameModel.tipoPalavra)
			this.montarFasePalavra(desafio);
		else
			this.montarFaseColuna(desafio);
	},
	montarFasePalavra: function(desafio){
		/*INICIO CREATE boxTotalRemain DIV*/
		var boxTotalRemain = document.createElement("div");
		boxTotalRemain.classList.add("boxTotalRemain");
		var boxTotalRemainNumber = document.createElement("span");
		boxTotalRemainNumber.id="boxTotalRemainNumber";
		boxTotalRemainNumber.classList.add("boxTotalRemainNumber");
		boxTotalRemainNumber.innerHTML = "0";

		this.gameModel.totalEquivalenteTipoPalavra = 0;
		for(var i=0; i < desafio.palavraExWrapper.length; i++)
			if(desafio.palavraExWrapper[i].equivalente)
				this.gameModel.totalEquivalenteTipoPalavra++;

		boxTotalRemain.appendChild(boxTotalRemainNumber);
		boxTotalRemain.innerHTML += "/" + this.gameModel.totalEquivalenteTipoPalavra;
		/*FIM CREATE boxTotalRemain DIV*/

		/*INICIO LOGING RESPOSTAS*/
		console.log("--");
		desafio.palavraExWrapper.forEach(element => {
			if(element.equivalente)
				console.log(element.conteudo);
		});
		/*FIM LOGING RESPOSTAS*/

		desafio.palavraExWrapper.shuffle();
		var palavraTituloIndex;
		for (let i = 0; i < desafio.palavraExWrapper.length; i++)
			if(desafio.palavraExWrapper[i].equivalente){
				palavraTituloIndex = i;
				break;
			}
		this.html.palavraExplorador.innerHTML = desafio.palavraExWrapper[palavraTituloIndex].conteudo;
		this.html.palavraExplorador.appendChild(boxTotalRemain);

		desafio.palavraExWrapper.remove(palavraTituloIndex);
		/*UFA - daqui pra cima ele alimenta o palavra titulo e ainda coloca boxTotalRemain*/

		for (let i = 0; i < desafio.palavraExplorador; i++) {
			let div = document.createElement("div");

			let span = document.createElement("span");
			let emojiPalavra = desafio.palavraExplorador[i].emoji ? "emojiSpan" : "palavraSpan";
			span.classList.add("exploradorSpan", emojiPalavra);
			span.innerHTML = desafio.palavraExplorador[i].conteudo;
			span.dataset.equivalente = desafio.palavraExplorador[i].equivalente;
			span.onclick = function (){
				var el = this;
				TaCerto.GenFunc.translate5050(el,
				function(){
					TaCerto.Controladora.Jogo.Explorador.palavraBtnClick(el);
				},50);
			};

			var zoomIn = ["zoomInDown", "zoomInLeft", "zoomInRight", "zoomInUp"];
			let timeEffect = Math.floor(Math.random() * 700);

			zoomIn.shuffle();
			div.classList.add("palavraEx", "animated", zoomIn[Math.floor(Math.random() * 4)]);
			this.html.palavraExWrapper.appendChild(div);
			span.style.position = "relative";
			setTimeout(function(){
				div.appendChild(span);
				console.log(div);
			}, timeEffect);
		}
	},
	montarFaseColuna: function(desafio){
		this.html.palavraExplorador.innerHTML = "Ligue as colunas!";

		desafio.coluna1.shuffle();
		desafio.coluna2.shuffle();

		var itens = desafio.coluna1.concat(desafio.coluna2);

		for (let i = 0; i < itens.length; i++) {
			let div = document.createElement("div");
			let span = document.createElement("span");
			let emojiPalavra = itens[i].emoji ? "emojiSpan" : "palavraSpan";
			span.classList.add("exploradorSpan", emojiPalavra);
			span.innerHTML = itens[i].conteudo;
			span.dataset.equivalente = itens[i].equivalente;
			span.onclick = function (){
				var el = this;
				TaCerto.GenFunc.translate5050(el,
				function(){
					TaCerto.Controladora.Jogo.Explorador.colunaBtnClick(el);
				},50);
			};

			let zoomIn = i < 3 ? "zoomInLeft" : "zoomInRight";
			div.classList.add("itemColunaExplorador", "animated", zoomIn, "fadeIn");
			if(this.html.colunaWrapper1.children.length < 3){
				div.classList.add("itemColunaPrincipal");
				this.html.colunaWrapper1.appendChild(div);
			}
			else
				this.html.colunaWrapper2.appendChild(div);
			div.appendChild(span);
		}
	},
	palavraBtnClick: function(el){
		this.proximaPergunta();
	},
	colunaBtnClick: function(el){
		this.proximaPergunta();

	},
	btnCallback: function(el){
		var isColunaPrincipal = el.parentElement.classList.contains("itemColunaPrincipal");
		var bgColor = this.getBG(isColunaPrincipal, el);

		var isDoubleClicked = el.dataset.clicked ? true : false;
		if(isDoubleClicked){//se já foi clicado então desclicar
			el.dataset.clicked = "";
			el.classList.remove("exploradorSpanSelected");
			var spanClicked = document.getElementById("palavraExplorador").getElementsByTagName("div")[0];
			if(spanClicked){
				spanClicked.innerHTML = (parseInt(spanClicked.innerHTML) + 1);
				this.animationHanddlerPalavraNum.new();
			}
			return;
		}

		var isTipoPalavra = this.gameModel.tipoPalavra;
		var isAllClicked = this.getAllClicked(isTipoPalavra, isDoubleClicked);
		if(isTipoPalavra){
			el.classList.add("exploradorSpanSelected");
			el.dataset.clicked = "true";

			var spanClicked = document.getElementById("palavraExplorador").getElementsByTagName("div")[0];
			spanClicked.innerHTML = (parseInt(spanClicked.innerHTML) - 1);
			this.animationHanddlerPalavraNum.new();

			if(isAllClicked){
				this.desativarOnclick();

				var resposta = this.DESAFIO;
				resposta = resposta[resposta.length - 1].coluna1;
				var itensCol = document.querySelectorAll(".palavraEx span");
				var flagResp = false;
				var contAcertos = 0;
				var contTotalGabarito = 0;
				
				for(let i = 0; i < itensCol.length; i++){
					var flagAcertou = false;
					itensCol[i].classList.remove("exploradorSpanSelected");
					if(itensCol[i].dataset.clicked && itensCol[i].dataset.equivalente == "0"){
						flagAcertou = true;
						contAcertos++;
					}
					if(flagAcertou){
						itensCol[i].classList.add("rightExploradorSpan");
					}
					else if(itensCol[i].dataset.clicked){
						itensCol[i].classList.add("wrongExploradorSpan");
					}
				}

				for(let i = 0; i < resposta.length; i++)
					if(!isNaN(resposta[i].equivalente))
						contTotalGabarito++;

				flagResp = contAcertos === contTotalGabarito - 1;
				setTimeout(function(){
					TaCerto.Controladora.Jogo.Geral.atualizarResposta(flagResp);
					TaCerto.Controladora.Jogo.Explorador.proximaPergunta();
				},3000);
			}
			return;
		}

		var MATCHBRED = "redBorderExplorador", MATCHBLUE = "blueBorderExplorador", MATCHGREEN = "greenBorderExplorador";
		var isAlredyMatch = 	el.classList.contains(MATCHBRED) ? MATCHBRED
							:	el.classList.contains(MATCHBLUE) ? MATCHBLUE
							:	el.classList.contains(MATCHGREEN) ? MATCHGREEN
							:	false;
		if(isAlredyMatch){//toggledown matchs
			var itensMatched = document.querySelectorAll("."+isAlredyMatch);
			for (let i = 0; i < itensMatched.length; i++) {
				itensMatched[i].classList.remove(isAlredyMatch);
			}
		}

		el.dataset.clicked = "true";
		el.classList.add("exploradorSpanSelected");

		var isSecondClick = this.getSecondClick(isTipoPalavra, isColunaPrincipal, el);//segundo click na mesma coluna
		if(isSecondClick){//se clicar em um e tiver outro clicado (só da mesma coluna e !tipoPalavra)
			isSecondClick.dataset.clicked = "";
			var newBgColor = this.getBG(isColunaPrincipal, isSecondClick);
			isSecondClick.classList.remove("exploradorSpanSelected");
			return;
		}

		var isMatchClick = this.getMatchClick(isTipoPalavra, isColunaPrincipal, el);
		if(isMatchClick){
			el.dataset.clicked = "";
			el.classList.remove("exploradorSpanSelected");

			var newBgColor = this.getBG(!isColunaPrincipal, isMatchClick);
			isMatchClick.dataset.clicked = "";
			isMatchClick.classList.remove("exploradorSpanSelected");

			var colorBorderMatch = (isColunaPrincipal ? bgColor : newBgColor) + "BorderExplorador";
			el.classList.add(colorBorderMatch);
			isMatchClick.classList.add(colorBorderMatch);

			var lineWrapper = document.getElementById("lineWrapper");//div com wrapper de svg
			var posEl = el.getBoundingClientRect();
			var posMatch = isMatchClick.getBoundingClientRect();
			var line = document.createElement("div");
			line.classList.add("lineRedExplorer", colorBorderMatch);
			line.style.top = ((posEl.top + posEl.height/2 + posMatch.top + posMatch.height/2)/2) + "px";
			line.style.left = Math.min(posEl.left + posEl.width/2, posMatch.left + posMatch.width/2) + "px";
			
			var x1 = (posEl.left + (posEl.width/2)); var x2 = (posMatch.left + (posMatch.width/2));
			var y1 = (posEl.top + (posEl.height/2)); var y2 = (posMatch.top + (posMatch.height/2));

			line.style.width = (x1>x2? (x1-x2) : (x2-x1)) + "px";

			var coeficienteAngular = Math.atan((y1-y2) / (x1-x2));
			var rad = coeficienteAngular + "rad)";
			line.style.transform = "translateY(-50%) rotateZ(" + rad;
			

			lineWrapper.appendChild(line);

			//check fim de jogo
			var itensCol = document.querySelectorAll(".itemColunaExplorador span");
			for (let i = 0; i < 3; i++) {
				var isClassResp = itensCol[i].classList.contains(MATCHBRED) ? true
					:	itensCol[i].classList.contains(MATCHBLUE) ? true
					:	itensCol[i].classList.contains(MATCHGREEN) ? true
					:	false;
				if (!isClassResp) return;
			}

			this.desativarOnclick();

			//check respostas corretas
			var flagResp = false;
			var contResp = 0;
			for (let i = 0; i < 3; i++) {
				var classRespCol1 = itensCol[i].classList.contains(MATCHBRED) ? MATCHBRED
					:	itensCol[i].classList.contains(MATCHBLUE) ? MATCHBLUE
					:	MATCHGREEN;

				for (let j = 3; j < 6; j++) {
					var classRespCol2 = itensCol[j].classList.contains(MATCHBRED) ? MATCHBRED
					:	itensCol[j].classList.contains(MATCHBLUE) ? MATCHBLUE
					:	MATCHGREEN;
					if(itensCol[i].dataset.equivalente === itensCol[j].dataset.equivalente){
						console.log(classRespCol1);
						console.log(classRespCol2);
					}
					if(classRespCol2 === classRespCol1)
						if(itensCol[i].dataset.equivalente === itensCol[j].dataset.equivalente){
							contResp++;
							//fazer as respostas certas piscarem
							itensCol[i].classList.add("rightExploradorSpan");
							itensCol[j].classList.add("rightExploradorSpan");
						}
						else{
							//fazer as respostas erradas piscarem
							itensCol[i].classList.add("wrongExploradorSpan");
							itensCol[j].classList.add("wrongExploradorSpan");
						}
				}
			}

			if (contResp === 3) flagResp = true;
			setTimeout(function(){
				TaCerto.Controladora.Jogo.Geral.atualizarResposta(flagResp);
				TaCerto.Controladora.Jogo.Explorador.proximaPergunta();
			}, 3000);
		}
	},
	animationHanddlerPalavraNum: {
		animacaoFlag: false,
		timeoutAnimacao: undefined,
		new: function(){
			var spanClicked = document.getElementById("palavraExplorador").getElementsByTagName("div")[0];
			if(this.animacaoFlag){
				clearTimeout(this.timeoutAnimacao);
				spanClicked.classList.remove("palavraNumExploradorAnimation");
			}
			this.animacaoFlag = true;
			setTimeout(function(){
				spanClicked.classList.add("palavraNumExploradorAnimation");
			},10);
			this.timeoutAnimacao = setTimeout(function(){
				try{
					spanClicked.classList.remove("palavraNumExploradorAnimation");
				}
				catch(err){/*do nothin*/}
				clearTimeout(this.timeoutAnimacao);
				this.timeoutAnimacao = undefined;
				this.animacaoFlag = false;
			},1010);
		}
	},
	desativarOnclick: function(){
		var elArr = document.querySelectorAll(".itemColunaExplorador span");
		if(!elArr.length)
			elArr = document.querySelectorAll(".palavraEx span");
		for (let i = 0; i < elArr.length; i++)
			elArr[i].onclick = undefined;
	},
	getBG: function(isColunaPrincipal, el){
		var ret = "grey";
		if(isColunaPrincipal){
			var itensCol = document.querySelectorAll(".itemColunaExplorador span");
			var colors= ["red", "blue", "green"];
			for (let i = 0; i < 3; i++) {
				let index = i;
				if(itensCol[i] === el)
					return ret = colors[index];
			}
		}
		return ret;
	},
	getSecondClick: function(isTipoPalavra, isColunaPrincipal, el){//retorna o equivalente se for um click na msm coluna se não retorna falso
		if(!isTipoPalavra){
			var itensCol = document.querySelectorAll(".itemColunaExplorador span");
			var inicio = isColunaPrincipal ? 0 : 3;
			var fim = inicio + 3;
			for (let i = inicio; i < fim; i++){
				if(itensCol[i] !== el && itensCol[i].dataset.clicked)
					return itensCol[i];
			}
		}
		return false;
	},
	getMatchClick: function(isTipoPalavra, isColunaPrincipal, el){//verifica se possui matchClick
		if(!isTipoPalavra){
			var itensCol = document.querySelectorAll(".itemColunaExplorador span");
			var inicio = isColunaPrincipal ? 3 : 0;
			var fim = inicio + 3;
			for (let i = inicio; i < fim; i++){
				if(itensCol[i].dataset.clicked) //PODE SER UTIL DEPOIS: itensCol[i].dataset.equivalente === el.dataset.equivalente && 
					return itensCol[i];
			}
		}
		return false;
	},
	getAllClicked: function(isTipoPalavra, isDoubleClicked){
		if(isTipoPalavra && !isDoubleClicked){
			//var itensCol = document.querySelectorAll(".itemColunaExplorador span");
			//var contItensClicked = 1;
			//for (let i = 0; i < itensCol.length; i++)
			//	if(itensCol[i].dataset.clicked)
			//		contItensClicked++;
			if(1 == document.getElementById("palavraNumExplorador").innerHTML)
				return true;
		}
		return false;
	},

	pular: function(){
		this.DESAFIO[this.DESAFIO.length] = this.shuffleDesafio()[0];
		this.DESAFIO[this.DESAFIO.length] = "primeira interação tem um pop().";
		this.proximaPergunta();
	},
	eliminarErrado: function(){
		var isTipoPalavra = TaCerto.Controladora.Jogo.Explorador.gameModel.tipoPalavra;
		function addBG(el, index){
			setTimeout(function(){
				if(isTipoPalavra){
					for (let i = 0; i < 6; i++){
						if(!isNaN(el[i].dataset.equivalente)){
							el[i].classList.add("cartaAmarelaExplroador");
							setTimeout(function(){
								try {el[i].classList.remove("cartaAmarelaExplroador");}
								catch(err){/*donothing*/}
							},1000);
						}
					}
				}
				else{
					for (let i = 3; i < 6; i++){
						if(el[i].dataset.equivalente === el[index].dataset.equivalente){
							el[i].classList.add("cartaAmarelaExplroador");
							el[index].classList.add("cartaAmarelaExplroador");
							setTimeout(function(){
								try {
									el[i].classList.remove("cartaAmarelaExplroador");
									el[index].classList.remove("cartaAmarelaExplroador");
								}
								catch(err){/*donothing*/}
							},1000);
							break;
						}
					}
					if(el[index+1] && index < 3)
						addBG(el, index+1);
				}
			},!index ? 0:1000);
		}
		addBG(document.querySelectorAll(".itemColunaExplorador span"), 0);
	},
	shuffleDesafio: function(){
		var x = JSON.parse(JSON.stringify(TaCerto.Estrutura.DesafioDeFase.explorador));
		var arr = [];
		var auxNvl = TaCerto.Controladora.Jogo.Missao.parametros.missao ? TaCerto.Controladora.Jogo.Missao.parametros.missao : 0;
		for (var i = auxNvl; i < TaCerto.Controladora.Jogo.Geral.calculaLvl(TaCerto.Estrutura.Jogador.xp); i++)
			arr[i] = i;
		x.shuffle();
		x.pickFase(arr);
		return x;
	},
	zerarVars: function(){
		this.DESAFIO = [];
	}
};
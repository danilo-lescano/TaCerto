var TaCerto = TaCerto || {};
TaCerto.Controladora = TaCerto.Controladora || {};
TaCerto.Controladora.Jogo = TaCerto.Controladora.Jogo || {};
TaCerto.Controladora.Jogo.Explorador = {
	DESAFIO: [],
	missaoChave: null,
	gameModel:{
		tipoPalavra: false,

		totalItensCorretosPalavra: 0,
		totalItensSelecionadosPalavra: 0,
	},
	html:{
		getCleanHtml: function(){
			this.explCabecalho = document.getElementById("explCabecalho");
			this.explPCountContentDinamico = document.getElementById("explPCountContentDinamico");
			this.explPCountContentDinamicoBase = document.getElementById("explPCountContentDinamicoBase");
			this.explPWordWrapper = document.getElementById("explPWordWrapper");
			this.explCCol1 = document.getElementById("explCCol1");
			this.explCCol2 = document.getElementById("explCCol2");
			this.explPWrapper = document.getElementById("explPWrapper");
			this.explCWrapper = document.getElementById("explCWrapper");
			this.lineWrapper = document.getElementById("lineWrapper");

			if(this.explCabecalho && this.explPCountContentDinamico && this.explPCountContentDinamicoBase && this.explPWordWrapper && this.explCCol1 && this.explCCol2 && this.explPWrapper && this.explCWrapper && this.lineWrapper){
				this.explCabecalho.innerHTML = this.explPCountContentDinamico.innerHTML = this.explPCountContentDinamicoBase.innerHTML = this.explPWordWrapper.innerHTML = this.explCCol1.innerHTML = this.explCCol2.innerHTML = this.lineWrapper.innerHTML = "";
				return true;
			}
			return false;
		}
	},
	called: function () {
		TaCerto.Controladora.CarregarPagina.htmlCorpo("jogo", ["explorador"], ["JogoTipo"]);
	},
	loadDesafio: function(missaoId, tamanho) {
		var desafioNum = tamanho;
		this.missaoChave = missaoId && isNaN(missaoId) ? missaoId : null;
		var shuffledDesafio = this.shuffleDesafio(this.missaoChave);

		for (var i = 0; i < desafioNum; i++)
			this.DESAFIO[i] = shuffledDesafio[i];

		this.DESAFIO[this.DESAFIO.length] = "primeira interação tem um pop().";
		this.proximaPergunta();
	},
	proximaPergunta: function(){
		//deleta ultima pergunta respondida e chama fim de jogo se não tiver mais nenhum
		this.DESAFIO.pop();
		if(this.DESAFIO.length === 0){
			this.zerarVars();
			TaCerto.Controladora.Jogo.Geral.fimDeJogo();
			return;
		}

		//clean html
		this.html.getCleanHtml();

		//atualizar tipo de jogo
		var desafio = JSON.parse(JSON.stringify(this.DESAFIO[this.DESAFIO.length -1]));
		this.gameModel.tipoPalavra = desafio.palavra;

		if(this.gameModel.tipoPalavra)
			this.montarFasePalavra(desafio);
		else
			this.montarFaseColuna(desafio);
	},
	montarFasePalavra: function(desafio){
		this.html.explPWrapper.style.display = "block";
		this.html.explCWrapper.style.display = "none";
		
		desafio.palavraExWrapper.shuffle();
		for (let i = 0; i < desafio.palavraExWrapper.length; i++) {
			if(desafio.palavraExWrapper[i].equivalente){
				this.html.explCabecalho.innerHTML = desafio.palavraExWrapper[i].conteudo;
				desafio.palavraExWrapper.remove(i);
				break;
			}
		}

		this.gameModel.totalItensCorretosPalavra = 0;
		for (let i = 0; i < desafio.palavraExWrapper.length; i++) {
			if(desafio.palavraExWrapper[i].equivalente)
				this.gameModel.totalItensCorretosPalavra++;

			let explPItemWrapper = document.createElement("div");
			var zoomIn = ["zoomInDown", "zoomInLeft", "zoomInRight", "zoomInUp"];
			explPItemWrapper.classList.add("explPItemWrapper", "animated", zoomIn[Math.floor(Math.random()*zoomIn.length)], "fadeIn");

			let explPItem = document.createElement("div");
			let emojiOuPalavra = desafio.palavraExWrapper[i].emoji ? "explEmojiItem" : "explPalavraItem";
			explPItem.classList.add("explPItem", emojiOuPalavra); 
			explPItem.id = i+"explItem";
			explPItem.dataset.equivalente = desafio.palavraExWrapper[i].equivalente ? "c" : "e";
			explPItem.innerHTML = desafio.palavraExWrapper[i].conteudo;
			explPItem.onclick = function(){
				var el = this;
				TaCerto.GenFunc.fadeInBtnClick(this,
				function(){
					TaCerto.Controladora.Jogo.Explorador.palavraBtnClick(el);
				});
			};

			explPItemWrapper.appendChild(explPItem);

			setTimeout(() => {
				this.html.explPWordWrapper.appendChild(explPItemWrapper);
			}, 100*i);
		}

		this.html.explPCountContentDinamico.innerHTML = this.gameModel.totalItensSelecionadosPalavra = 0;
		this.html.explPCountContentDinamicoBase.innerHTML = this.gameModel.totalItensCorretosPalavra;
	},
	montarFaseColuna: function(desafio){
		this.html.explPWrapper.style.display = "none";
		this.html.explCWrapper.style.display = "block";
		
		function povoarColunas(isCol1, itens){
			for (let i = 0; i < itens.length; i++) {
				let aclassAux;
				let explCColItemWrapper = document.createElement("div");
				aclassAux = isCol1 ? "explCCol1ItemWrapper" : "explCCol2ItemWrapper";
				var zoomIn = ["zoomInDown", "zoomInLeft", "zoomInRight", "zoomInUp"];
				explCColItemWrapper.classList.add(aclassAux, "animated", zoomIn[Math.floor(Math.random()*zoomIn.length)], "fadeIn");

				let explCColItem = document.createElement("div");
				aclassAux = [];
				aclassAux[0] = isCol1 ? "explCCol1Item" : "explCCol2Item";;
				aclassAux[1] = itens[i].emoji ? "explEmojiItem" : "explPalavraItem";
				explCColItem.classList.add(aclassAux[0], aclassAux[1]);
				explCColItem.dataset.equivalente = itens[i].equivalente;
				explCColItem.dataset.match = "n";
				explCColItem.id = i + (isCol1 ? "itemColPrincipal" : "itemColSecundaria");
				explCColItem.innerHTML = itens[i].conteudo;
				explCColItem.onclick = function(){
					var el = this;
					TaCerto.GenFunc.translate5050(this,
					function(){
						TaCerto.Controladora.Jogo.Explorador.colunaBtnClick(el);
					});
				};
				explCColItemWrapper.appendChild(explCColItem);

				setTimeout(() => {
					let col = isCol1 ? this.html.explCCol1 : this.html.explCCol2;
					col.appendChild(explCColItemWrapper);

					//fonte de tamanho dinamico
					if(itens[i].emoji == true) return;

					var maxSize = window.innerWidth * 0.3;
					var fontSize = 2;
					var height = explCColItem.offsetHeight;
					while(explCColItem.clientWidth > maxSize){
						fontSize -= 0.05;
						explCColItem.style.fontSize = "calc(12px + " + fontSize + "vw)";

						explCColItem.style.paddingTop = explCColItem.style.paddingBottom = "0px";
						explCColItem.style.paddingTop = explCColItem.style.paddingBottom = (height - explCColItem.offsetHeight)/2 + "px";
					}
					//explCColItem.style.height = height;
				}, 100*i);
			}
		}

		desafio.coluna1.shuffle(); povoarColunas(true, desafio.coluna1);
		desafio.coluna2.shuffle(); povoarColunas(false, desafio.coluna2);
	},
	palavraBtnClick: function(el){
		//se for doubleclick da unclick e sai
		var isDoubleClicked = el.classList.contains("explClicked");
		if(isDoubleClicked){
			this.html.explPCountContentDinamico.innerHTML = --this.gameModel.totalItensSelecionadosPalavra;
			el.classList.remove("explClicked");
			return;
		}

		//atualiza os clicks
		this.html.explPCountContentDinamico.innerHTML = ++this.gameModel.totalItensSelecionadosPalavra;
		el.classList.add("explClicked");

		//fim de jogo. conta respostas certas; atualiza resposta; chama proxima pergunta; remove onclick
		if(this.gameModel.totalItensSelecionadosPalavra === this.gameModel.totalItensCorretosPalavra){
			var flagResposta; var contRespostasCorretas = 0;
			var explPItem = document.getElementsByClassName("explPItem");
			for (let i = 0; i < explPItem.length; i++) {
				explPItem[i].onclick = undefined;
				if(explPItem[i].classList.contains("explClicked")){
					explPItem[i].classList.remove("explClicked");
					if(explPItem[i].dataset.equivalente === "e")
						explPItem[i].classList.add("explWrongAnswer");
					else if(explPItem[i].dataset.equivalente === "c"){
						explPItem[i].classList.add("explRightAnswer");
						contRespostasCorretas++;
					}
				}
			}
			flagResposta = contRespostasCorretas === this.gameModel.totalItensCorretosPalavra;
			TaCerto.Controladora.Jogo.Geral.atualizarResposta(flagResposta);
			setTimeout(()=>{
				this.proximaPergunta();
			},1000);
		}
	},
	colunaBtnClick: function(el){
		//se for doubleclick da unclick e sai
		var isDoubleClicked = el.classList.contains("explClicked");
		if(isDoubleClicked){
			this.html.explPCountContentDinamico.innerHTML = --this.gameModel.totalItensSelecionadosPalavra;
			el.classList.remove("explClicked");
			return;
		}

		//pegar a coluna do itens e carregar eles
		var isColPrincipal = el.classList.contains("explCCol1Item");
		var queryItensColClicked = isColPrincipal ? ".explCCol1ItemWrapper>.explCCol1Item" : ".explCCol2ItemWrapper>.explCCol2Item";
		var queryItensColOpposite = !isColPrincipal ? ".explCCol1ItemWrapper>.explCCol1Item" : ".explCCol2ItemWrapper>.explCCol2Item";
		var itensColClicked = document.querySelectorAll(queryItensColClicked);
		var itensColOpposite = document.querySelectorAll(queryItensColOpposite);

		//resolver problema se outro item da msm coluna ja foi clicado
		(()=>{
			for (let i = 0; i < itensColClicked.length; i++)
				if(itensColClicked[i].classList.contains("explClicked")){
					itensColClicked[i].classList.remove("explClicked");
					return;
				}
		})();

		//atualiza os clicks
		el.classList.add("explClicked");

		//resolver problema se item tem match
		(()=>{
			var oldMatch = document.getElementById(el.dataset.match);
			if(!oldMatch) return; //item n possui match

			var indexMatchClass = isColPrincipal ? el.id.substring(0,1) : oldMatch.id.substring(0,1);
			var line = document.getElementById("colMatchLine"+indexMatchClass);
			line.parentElement.removeChild(line);

			el.dataset.match = oldMatch.dataset.match = "n"; //remove match
			el.classList.remove("colMatch0", "colMatch1", "colMatch2");
			oldMatch.classList.remove("colMatch0", "colMatch1", "colMatch2");
		})();

		//resolver match. retona falso se n tiver match ou o item que deu match
		var isMatch = (()=>{
			for (let i = 0; i < itensColOpposite.length; i++)
				if(itensColOpposite[i].classList.contains("explClicked"))
					return itensColOpposite[i];
			return false;
		})();
		if(!isMatch) return; //se n tiver match ja retorna pq n tem mais nada pra fazer

		//separando elementos da coluna 1 e 2 que deram match
		var elCol1 = isColPrincipal ? el : isMatch;
		var elCol2 = !isColPrincipal ? el : isMatch;
		//setando match atributo
		elCol1.dataset.match = elCol2.id;
		elCol2.dataset.match = elCol1.id;
		//removendo clicked class
		elCol1.classList.remove("explClicked");
		elCol2.classList.remove("explClicked");
		//index coluna 1
		var indexMatchClass = elCol1.id.substring(0,1);
		//criando linha que liga os dois divs
		var line = document.createElement("div");
		line.id = "colMatchLine"+indexMatchClass;
		line.classList.add("colMatchLine"+indexMatchClass);
		//calculando posicoes, width e height da linha
		var posElCol1 = elCol1.getBoundingClientRect();
		var posElCol2 = elCol2.getBoundingClientRect();
		var topLineWrapper = this.html.lineWrapper.getBoundingClientRect().top;
		line.style.top = ((posElCol1.top + posElCol1.height/2 + posElCol2.top + posElCol2.height/2)/2) - (topLineWrapper) + "px";
		
		var x1 = (posElCol1.left + (posElCol1.width/2)); var x2 = (posElCol2.left + (posElCol2.width/2));
		var y1 = (posElCol1.top + (posElCol1.height/2)); var y2 = (posElCol2.top + (posElCol2.height/2));

		//calculando tamanho da linha e posicao left
		(()=>{
			//tamanho
			var altura = x1>x2? x1-x2 : x2-x1;
			var largura = y1>y2? y1-y2 : y2-y1;
			var size = (altura**2 + largura**2)**0.5;
			line.style.width = size + "px";
			//left
			var middle = (posElCol2.right - posElCol1.left)/2 + posElCol1.left;
			var leftPoint = middle - size/2;
			//(posElCol1.left + posElCol1.width/2) + "px";
			line.style.left = leftPoint + "px";
		})();
		var coeficienteAngular = Math.atan((y1-y2) / (x1-x2));
		var rad = coeficienteAngular + "rad)";
		line.style.transform = "translateY(-50%) rotateZ(" + rad;

		this.html.lineWrapper.appendChild(line);

		elCol2.classList.add("colMatch"+indexMatchClass);

		//checkar se é fim de jogo e parar se n for
		var itensColuna1 = document.querySelectorAll(".explCCol1ItemWrapper>.explCCol1Item");
		for (let i = 0; i < itensColuna1.length; i++) {
			if(itensColuna1[i].dataset.match !== "n")
				continue;
			return;
		}

		//fim desafio aqui - mostrar respostas e chamar proxima pergunta
		var flagResposta = true;

		for (let i = 0; i < itensColuna1.length; i++) {
			if(itensColuna1[i].dataset.equivalente == document.getElementById(itensColuna1[i].dataset.match).dataset.equivalente){
				itensColuna1[i].classList.add("explRightAnswer");
				document.getElementById(itensColuna1[i].dataset.match).classList.add("explRightAnswer");
				document.getElementById("colMatchLine"+i).classList.add("explRightAnswer");
			}
			else{
				itensColuna1[i].classList.add("explWrongAnswer");
				document.getElementById(itensColuna1[i].dataset.match).classList.add("explWrongAnswer");
				document.getElementById("colMatchLine"+i).classList.add("explWrongAnswer");
				flagResposta = false;
			}
		}

		TaCerto.Controladora.Jogo.Geral.atualizarResposta(flagResposta);
		setTimeout(()=>{
			this.proximaPergunta();
		},900);
	},
	pular: function(){
		this.DESAFIO[this.DESAFIO.length] = this.shuffleDesafio(this.missaoChave)[0];
		this.DESAFIO[this.DESAFIO.length] = "primeira interação tem um pop().";
		this.proximaPergunta();
	},
	eliminarErrado: function(){
		if(this.gameModel.tipoPalavra){
			var itens = document.querySelectorAll(".explPItem");
			var randNumArr = [];
			for (let i = 0; i < itens.length; randNumArr[i] = i++);
			randNumArr.shuffle();
			var contAux = 2;
			for (let i = 0; i < itens.length && contAux > 0; i++) {
				let index = randNumArr[i];
				if(itens[index].dataset.equivalente == "e"){
					itens[index].classList.add("animated", "fadeOut");
					contAux--;
					setTimeout(function(){
						try {
							itens[index].parentElement.parentElement.removeChild(itens[index].parentElement);
						} catch (error) {}
					},700);
				}
			}
		}
		else{
			var itensColuna1 = document.querySelectorAll(".explCCol1ItemWrapper>.explCCol1Item");
			var itensColuna2 = document.querySelectorAll(".explCCol2ItemWrapper>.explCCol2Item");
			for (let i = 0; i < itensColuna1.length; i++)
				for (let j = 0; j < itensColuna2.length; j++)
					if(itensColuna1[i].dataset.equivalente === itensColuna2[j].dataset.equivalente)
						setTimeout(function(){
							try {
								itensColuna1[i].classList.add("explGreenCardEff");
								itensColuna2[j].classList.add("explGreenCardEff");
							} catch (error) {}
							setTimeout(function(){
								try {
									itensColuna1[i].classList.remove("explGreenCardEff");
									itensColuna2[j].classList.remove("explGreenCardEff");
								} catch (error) {}
							},700);
						},1000*i);
		}
	},
	shuffleDesafio: function(missaoChave){
		var x = TaCerto.Estrutura.DesafioDeFase.explorador.slice().shuffle();
		if(missaoChave || !isNaN(missaoChave))
			x.pickFase([missaoChave]);
		return x;
	},
	loadingMessage: function(){
		return "Ligue as lacunas ou escolha as palavras equivalentes.";
	},
	zerarVars: function(){
		this.DESAFIO = [];
	}
};
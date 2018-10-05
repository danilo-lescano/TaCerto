var TaCerto = TaCerto || {};
TaCerto.Controladora = TaCerto.Controladora || {};
TaCerto.Controladora.Jogo = TaCerto.Controladora.Jogo || {};
TaCerto.Controladora.Jogo.Explorador = {
	DESAFIO: [],
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

			if(this.explCabecalho && this.explPCountContentDinamico && this.explPCountContentDinamicoBase && this.explPWordWrapper && this.explCCol1 && this.explCCol2 && this.explPWrapper && this.explCWrapper){
				this.explCabecalho.innerHTML = this.explPCountContentDinamico.innerHTML = this.explPCountContentDinamicoBase.innerHTML = this.explPWordWrapper.innerHTML = this.explCCol1.innerHTML = this.explCCol2.innerHTML = "";
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
			explPItem.dataset.pesoResposta = desafio.palavraExWrapper[i].equivalente ? "c" : "e";
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
		//apagar 2linhas
this.proximaPergunta(); return;
		function povoaColuna(colIndex, itens){
			var col = colIndex? this.html.coluna1 : this.html.coluna2;
			for (let i = 0; i < itens.length; i++) {

			}
		}

		this.html.explPWrapper.style.display = "none";
		this.html.explCWrapper.style.display = "block";
		
		desafio.coluna1.shuffle();	desafio.coluna2.shuffle();
		povoaColuna(true, desafio.coluna1); povoaColuna(false, desafio.coluna2)
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
					if(explPItem[i].dataset.pesoResposta === "e")
						explPItem[i].classList.add("explWrongAnswer");
					else if(explPItem[i].dataset.pesoResposta === "c"){
						explPItem[i].classList.add("explRightAnswer");
						contRespostasCorretas++;
					}
				}
			}
			flagResposta = contRespostasCorretas === this.gameModel.totalItensCorretosPalavra;
			TaCerto.Controladora.Jogo.Geral.atualizarResposta(flagResposta);
			setTimeout(function(){
				TaCerto.Controladora.Jogo.Explorador.proximaPergunta();
			},1000);
		}
	},
	colunaBtnClick: function(el){
		this.proximaPergunta();

	},
	pular: function(){
		this.DESAFIO[this.DESAFIO.length] = this.shuffleDesafio()[0];
		this.DESAFIO[this.DESAFIO.length] = "primeira interação tem um pop().";
		this.proximaPergunta();
	},
	eliminarErrado: function(){
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
var TaCerto = TaCerto || {};
TaCerto.Controladora = TaCerto.Controladora || {};
TaCerto.Controladora.Jogo = TaCerto.Controladora.Jogo || {};
TaCerto.Controladora.Jogo.Explorador = {
	DESAFIO: [],
	gameModel:{
		isEvenClick: false,
		tipoPalavra: false
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
	proximaPergunta: function(){//joga fora o último elemento(1) / chama fim de jogo se n tiver mais elementos(2) / seleciona modo(3) / alimenta página com o desafiodefase(4) / atualizar variavel global tipoPalavra(5)
		/*(4)*/
		function alimentarHTML(itens, addClass){
			var col1 = document.getElementById("colunaWrapper1");
			var col2 = document.getElementById("colunaWrapper2");
			col1.innerHTML = col2.innerHTML = "";

			for (let i = 0; i < itens.length; i++) {
				var div = document.createElement("div");
				div.classList.add("itemColunaExplorador");

				var span = document.createElement("span");
				var emojiPalavra = itens[i].emoji ? "emojiSpan" : "palavraSpan";
				span.classList.add("exploradorSpan", emojiPalavra);
				span.innerHTML = itens[i].conteudo;
				span.dataset.equivalente = itens[i].equivalente;
				span.onclick = function (){
					TaCerto.Controladora.Jogo.Explorador.btnPressionado(this);
				};
				if(col1.children.length < 3){
					if(addClass)
						div.classList.add("itemColunaPrincipal");
					col1.appendChild(div);
				}
				else
					col2.appendChild(div);
				div.appendChild(span);
			}
		}

		/*(1)*/
		this.DESAFIO.pop();
		/*(2)*/
		if(this.DESAFIO.length === 0){
			this.zerarVars();
			TaCerto.Controladora.Jogo.Geral.fimDeJogo();
			return;
		}

		var desafio = JSON.parse(JSON.stringify(this.DESAFIO[this.DESAFIO.length -1]));
		var itens;
		document.getElementById("palavraExplorador").innerHTML = "";
		if(desafio.palavra){/*(3) nesse if*/
			var span = document.createElement("span");
			span.id="palavraNumExplorador";
			span.classList.add("palavraNumExplorador");
			span.innerHTML = (desafio.coluna1.length - 1);

			desafio.coluna1.shuffle();
			document.getElementById("palavraExplorador").innerHTML = desafio.coluna1 /*parcialmente (4)*/[desafio.coluna1.length-1].conteudo;
			document.getElementById("palavraExplorador").appendChild(span);
			
			desafio.coluna1.pop();

			itens = desafio.coluna1.concat(desafio.coluna2);
			itens.shuffle();
		}
		else{
			desafio.coluna1.shuffle();
			desafio.coluna2.shuffle();

			itens = desafio.coluna1.concat(desafio.coluna2);
		}
		/*(5)*/
		this.gameModel.tipoPalavra = desafio.palavra;
		
		/*(4)*/
		alimentarHTML(itens, !desafio.palavra);
	},
	btnPressionado: function(el){//verificar que tipo de botao foi pressionado(1) / 
		TaCerto.GenFunc.translate5050(el,
		function(){
			var isColunaPrincipal = el.parentElement.classList.contains("itemColunaPrincipal");
			var bgColor = TaCerto.Controladora.Jogo.Explorador.getBG(isColunaPrincipal, el);

			var isDoubleClicked = el.dataset.clicked ? true : false;
			if(isDoubleClicked){//se já foi clicado então desclicar
				el.dataset.clicked = "";
				el.classList.remove(bgColor+"BGExplorador");
				return;
			}

			var isTipoPalavra = TaCerto.Controladora.Jogo.Explorador.gameModel.tipoPalavra;
			var isAllClicked = TaCerto.Controladora.Jogo.Explorador.getAllClicked(isTipoPalavra, isDoubleClicked);
			if(isTipoPalavra){
				el.classList.add(bgColor+"BGExplorador");
				el.dataset.clicked = "true";
				if(isAllClicked){
					var resposta = TaCerto.Controladora.Jogo.Explorador.DESAFIO;
					resposta = resposta[resposta.length - 1];
					var itensCol = document.querySelectorAll(".itemColunaExplorador span");
					var flagResp = false;
					var contAcertos = 0;
					var contTotalGabarito = 0;
					
					for(let i = 0; i < itensCol.length; i++){
						console.log(itensCol[i].dataset.clicked);
						console.log(itensCol[i].dataset.equivalente);
						if(itensCol[i].dataset.clicked && itensCol[i].dataset.equivalente == "0")
							contAcertos++;
					}

					for(let i = 0; i < resposta.length; i++)
						if(resposta[i].equivalente)
							contTotalGabarito++;

					flagResp = contAcertos === contTotalGabarito;

					TaCerto.Controladora.Jogo.Geral.atualizarResposta(flagResp);
					TaCerto.Controladora.Jogo.Explorador.proximaPergunta();
				}
				return;
			}

			el.dataset.clicked = "true";
			el.classList.add(bgColor+"BGExplorador");

			var isSecondClick = TaCerto.Controladora.Jogo.Explorador.getSecondClick(isTipoPalavra, isColunaPrincipal, el);
			if(isSecondClick){//se clicar em um e tiver outro clicado (só da mesma coluna e !tipoPalavra)
				isSecondClick.dataset.clicked = "";
				var newBgColor = TaCerto.Controladora.Jogo.Explorador.getBG(isColunaPrincipal, isSecondClick);
				isSecondClick.classList.remove(newBgColor+"BGExplorador");
				return;
			}

			var isMatchClick = TaCerto.Controladora.Jogo.Explorador.getMatchClick(isTipoPalavra, isColunaPrincipal, el);
			if(isMatchClick){
				el.dataset.clicked = "";
				el.classList.remove(bgColor+"BGExplorador");

				var newBgColor = TaCerto.Controladora.Jogo.Explorador.getBG(!isColunaPrincipal, isMatchClick);
				isMatchClick.dataset.clicked = "";
				isMatchClick.classList.remove(newBgColor+"BGExplorador");
				el.classList.add((isColunaPrincipal ? bgColor : newBgColor) + "BorderExplorador");
				isMatchClick.classList.add((isColunaPrincipal ? bgColor : newBgColor) + "BorderExplorador");

				console.log(bgColor);
				console.log(newBgColor);
				return;
			}
			/*console.log(
				"isTipoPalavra: " + isTipoPalavra + "\n" +
				"isColunaPrincipal: " + isColunaPrincipal + "\n" +
				"isSecondClick: " + isSecondClick + "\n" +
				"isDoubleClicked: " + isDoubleClicked + "\n" +
				"bgColor: " + bgColor + "\n" +
				"isAllClicked: " + isAllClicked + "\n" +
				""
			);*/
		},50);
	},
	getBG: function(isColunaPrincipal, el){
		var ret = "grey";
		if(isColunaPrincipal){
			var itensCol = document.querySelectorAll(".itemColunaExplorador span");
			var colors= ["red", "blue", "green"];
			console.log("--------------");
			for (let i = 0; i < 3; i++) {
				let index = i;
				console.log("é igual " + (itensCol[i] === el));
				console.log(colors[i]);
				if(itensCol[i] === el){
					console.log("porra vai tomar no cu");
				console.log(colors[i]);
				console.log(colors[index]);
				return ret = colors[index];

				}
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
				if(itensCol[i].dataset.equivalente === el.dataset.equivalente && itensCol[i].dataset.clicked)
					return itensCol[i];
			}
		}
		return false;
	},
	getAllClicked: function(isTipoPalavra, isDoubleClicked){
		if(isTipoPalavra && !isDoubleClicked){
			var itensCol = document.querySelectorAll(".itemColunaExplorador span");
			var contItensClicked = 1;
			for (let i = 0; i < itensCol.length; i++)
				if(itensCol[i].dataset.clicked)
					contItensClicked++;
			if(contItensClicked == document.getElementById("palavraNumExplorador").innerHTML)
				return true;
		}
		return false;
	},

	pular: function(){

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
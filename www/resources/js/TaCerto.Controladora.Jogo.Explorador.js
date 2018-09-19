var TaCerto = TaCerto || {};
TaCerto.Controladora = TaCerto.Controladora || {};
TaCerto.Controladora.Jogo = TaCerto.Controladora.Jogo || {};
TaCerto.Controladora.Jogo.Explorador = {
	DESAFIO: [],
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

		var desafio = JSON.parse(JSON.stringify(this.DESAFIO[this.DESAFIO.length -1]));
		if(desafio.palavra){
			desafio.coluna1.shuffle();
			document.getElementById("palavraExplorador").innerHTML = desafio.coluna1[desafio.coluna1.length-1].conteudo;
			desafio.coluna1.pop();
			
			var itens = desafio.coluna1.concat(desafio.coluna2);
			itens.shuffle();
			var col1 = document.getElementById("colunaWrapper1");
			col1.innerHTML = "";
			var col2 = document.getElementById("colunaWrapper2");
			col2.innerHTML = "";
			for (let i = 0; i < itens.length; i++) {
				var div = document.createElement("div");
				div.classList.add("itemColunaExplorador");

				var span = document.createElement("span");
				var emojiPalavra = itens[i].emoji ? "emojiSpan" : "palavraSpan";
				span.classList.add("exploradorSpan", emojiPalavra);
				span.innerHTML = itens[i].conteudo;

				if(col1.children.length < 3)
					col1.appendChild(div);
				else
					col2.appendChild(div);
				div.appendChild(span);
			}
		}
		else{
			desafio.coluna1.shuffle();
			desafio.coluna2.shuffle();
			
			var col1 = document.getElementById("colunaWrapper1");
			col1.innerHTML = "";
			for (let i = 0; i < desafio.coluna1.length; i++) {
				var div = document.createElement("div");
				div.classList.add("itemColunaExplorador", "itemColunaPrincipal");

				var span = document.createElement("span");
				var emojiPalavra = desafio.coluna1[i].emoji ? "emojiSpan" : "palavraSpan";
				span.classList.add("exploradorSpan", emojiPalavra);
				span.innerHTML = desafio.coluna1[i].conteudo;

				col1.appendChild(div);
				div.appendChild(span);
			}


			var col2 = document.getElementById("colunaWrapper2");
			col2.innerHTML = "";
			for (let i = 0; i < desafio.coluna2.length; i++) {
				var div = document.createElement("div");
				div.classList.add("itemColunaExplorador");

				var span = document.createElement("span");
				var emojiPalavra = desafio.coluna2[i].emoji ? "emojiSpan" : "palavraSpan";
				span.classList.add("exploradorSpan", emojiPalavra);
				span.innerHTML = desafio.coluna2[i].conteudo;

				col2.appendChild(div);
				div.appendChild(span);
			}
		}
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
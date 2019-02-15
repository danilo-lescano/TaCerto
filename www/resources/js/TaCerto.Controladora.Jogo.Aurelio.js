var TaCerto = TaCerto || {};
TaCerto.Controladora = TaCerto.Controladora || {};
TaCerto.Controladora.Jogo = TaCerto.Controladora.Jogo || {};
TaCerto.Controladora.Jogo.Aurelio = {
	DESAFIO: [],
	missaoChave: null,
	called: function () {
		TaCerto.Controladora.CarregarPagina.htmlCorpo("jogo", ["aurelio"], ["JogoTipo"]);
	},
	loadDesafio: function(missaoId, tamanho) {
		var desafioNum = tamanho;
		this.missaoChave = missaoId ? missaoId : null;
		var shuffledDesafio = this.shuffleDesafio(this.missaoChave);

		for (var i = 0; i < desafioNum; i++)
			this.DESAFIO[i] = shuffledDesafio[i];

		this.DESAFIO[this.DESAFIO.length] = "primeira interação tem um pop().";
		this.proximaPergunta();
	},
	proximaPergunta: function(){
		//deleta ultima pergunta respondida e chama fim de jogo se não tiver mais nenhum
		var minWidth = document.getElementById("aurBotWordWrap").getBoundingClientRect().width/15;

		this.DESAFIO.pop();
		if(this.DESAFIO.length === 0){
			this.zerarVars();
			TaCerto.Controladora.Jogo.Geral.fimDeJogo();
			return;
		}
		function createAurWord(word){
			let wordDiv = document.createElement("div");
			wordDiv.innerHTML = word.palavra;
			if(!isNaN(word.index))
				wordDiv.dataset.index = word.index;
			if(word.apendice !== undefined)
				wordDiv.dataset.apendice = word.apendice;
			wordDiv.classList.add("aurWord");
			return wordDiv;
		}
		function serAurWordSize(wordDiv){
			var widthSize = wordDiv.getBoundingClientRect().width;
			wordDiv.style.width = minWidth * Math.ceil(widthSize/minWidth) + "px";
			wordDiv.calcWidth = Math.ceil(widthSize/minWidth);
		}

		var desafio = this.DESAFIO[this.DESAFIO.length - 1];
		var deleteOldAurTWordItem = (()=>{
			var aurTWordItem = document.getElementsByClassName("aurTWordItem");
			for (let i = 0; i < aurTWordItem.length; i++)
				aurTWordItem[i].parentNode.removeChild(aurTWordItem[i]);
		})();

		var aurWords = [];
		var aurWordsNovaOrdem = [];
		var aurBotWordWrap = document.getElementById("aurBotWordWrap");
		aurBotWordWrap.innerHTML = "";
		var aurTopContentWrap = document.getElementById("aurTopContentWrap");
		aurTopContentWrap.innerHTML = "";

		for (let i = 0; i < desafio.conteudoResposta.length; i++) {
			let aurWord = createAurWord(desafio.conteudoResposta[i]);
			aurWord.id = i + "aurWordBot";
			aurWord.onclick = function(){
				TaCerto.GenFunc.fadeInBtnClick(this, ()=>{});
				TaCerto.Controladora.Jogo.Aurelio.aurWordClick(this);
			};
			aurBotWordWrap.appendChild(aurWord);
			serAurWordSize(aurWord);

			aurWords[i] = aurWord;
		}
		var pontuacao = (()=>{
			var array = [];
			var pontos = [{palavra: "?"}, {palavra: "."}, {palavra: ","}];
			for (let i = 0; i < pontos.length; i++) {
				array[i] = createAurWord(pontos[i]);
				array[i].onclick = function(){
					TaCerto.GenFunc.fadeInBtnClick(this, ()=>{});
					TaCerto.Controladora.Jogo.Aurelio.aurPunctClick(this);
				};
				aurBotWordWrap.appendChild(array[i]);
				serAurWordSize(array[i]);
			}
			return array;
		})();
		//aurWords.sort().reverse().sort().reverse();
		aurWords.shuffle();
		aurWords = pontuacao.concat(aurWords);
		while(aurWords.length > 0){
			let linha = [];
			linha.calcWidth = function(){
				var total = 0;
				for (let i = 0; i < this.length; i++)
					total += this[i].calcWidth;
				return total;
			};
			for (let i = 0; i < aurWords.length; i++) {
				if(linha.calcWidth() + aurWords[i].calcWidth < 15){
					linha[linha.length] = aurWords[i];
					aurWords.remove(i--);
					if(linha.calcWidth() === 14) break;
				}
			}
			if(minWidth < linha.length*4)
			for (let i = 0; i < linha.length; i++) {
				linha[i].style.marginLeft = linha[i].style.marginRight = minWidth / (linha.length * 2) + "px";
			}
			aurWordsNovaOrdem[aurWordsNovaOrdem.length] = linha;
		}

		document.getElementById("aurPhraseWrap").innerHTML = desafio.fraseParaCorrecao;
		var aurBotWordWrap = document.getElementById("aurBotWordWrap");
		aurBotWordWrap.innerHTML = "";
		var onumerodepalavras = 0;
		for (let i = 0; i < aurWordsNovaOrdem.length; i++) {
			for (let j = 0; j < aurWordsNovaOrdem[i].length; j++) {
				aurBotWordWrap.appendChild(aurWordsNovaOrdem[i][j]);
				onumerodepalavras++;
			}
		}

		var x = [];
		for (let i = 1; i < 15; i++)
			x[i-1] = minWidth*i;
		//console.log(x);
		console.log(minWidth);
		console.log("linhas " + aurWordsNovaOrdem.length);
		console.log("onumerodepalavras " + onumerodepalavras);
		for (let i = 0; i < aurWordsNovaOrdem.length; i++)
			console.log(aurWordsNovaOrdem[i].calcWidth());
	},
	__rearrengeFontSize: function(aurWord, maxWidth){
		let widthSize = aurWord.getBoundingClientRect().width;
		let fontSize = 2;
		while(widthSize >= maxWidth){
			fontSize += 0.1;
			aurWord.style.fontSize = "calc(12px + " + fontSize + "vw)";
			widthSize = aurWord.getBoundingClientRect().width;
		}
	},
	aurWordClick: function(el){
		var wordItem = document.createElement("div");
		wordItem.classList.add("aurTWordItem");
		wordItem.dataset.idBot = el.id;
		wordItem.dataset.index = el.dataset.index;
		wordItem.dataset.apendice = el.dataset.apendice;
		var verticalBar = document.getElementById("aurTWrintingBar");
		var wordCardWrapper = document.getElementById("aurTopContentWrap");
		wordCardWrapper.insertBefore(wordItem, verticalBar);

		el.onclick = undefined;
		el.style.filter = "grayscale(100%)";

		var resolveWordItemAnimation = (async ()=>{
			for (let i = 0; i < el.innerHTML.length; i++) {
				wordItem.innerHTML += el.innerHTML[i];
				await promiseRequestAnimationFrame();
			}
		})();
	},
	aurPunctClick: function(el){
		var topWords = document.getElementsByClassName("aurTWordItem");
		if(!topWords.length) return;
		var lastTopWord = topWords[topWords.length - 1];
		if(lastTopWord.dataset.addApendice !== undefined && lastTopWord.dataset.addApendice !== "f")
			lastTopWord.innerHTML = lastTopWord.innerHTML.substring(0, lastTopWord.innerHTML.length-1);
		lastTopWord.innerHTML += el.innerHTML;
		lastTopWord.dataset.addApendice = el.innerHTML;
	},
	aurSendClick: function(el){
		//TaCerto.GenFunc.fadeInBtnClick(el, ()=>{});

		var flagResposta = true;
		var topWords = document.getElementsByClassName("aurTWordItem");
		if(this.DESAFIO[this.DESAFIO.length-1].totalSize !== topWords.length)
			flagResposta = false;
		for (let i = 0; i < topWords.length; i++) {
			var addApendice = topWords[i].dataset.addApendice;
			if(!addApendice || addApendice === undefined || addApendice === "undefined")
				addApendice = "f";
			var apendice = topWords[i].dataset.apendice;
			if(!apendice || apendice === undefined || apendice === "undefined")
				apendice = "f";

			if(parseInt(topWords[i].dataset.index) !== i){
				flagResposta = false;
				topWords[i].style.color = "red";
			}
			else if(addApendice !== apendice){
				flagResposta = false;

				var spanAurPont = document.createElement("div");
				spanAurPont.classList.add("spanAurPont");

				if(addApendice !== "f"){
					var html = topWords[i].innerHTML;
					topWords[i].innerHTML = html.substring(0, html.length-1);
					spanAurPont.innerHTML = addApendice;
				}
				else{
					spanAurPont.innerHTML = apendice;
				}
				topWords[i].style.color = "green";
				topWords[i].appendChild(spanAurPont);
			}
			else{
				topWords[i].style.color = "green";
			}
		}

		TaCerto.Controladora.Jogo.Geral.atualizarResposta(flagResposta);
		setTimeout(()=>{
			this.proximaPergunta();
		},900);
	},
	aurEraseClick: function(el){
		//TaCerto.GenFunc.fadeInBtnClick(el, ()=>{});

		var topWords = document.getElementsByClassName("aurTWordItem");
		if(!topWords.length) return;
		var lastTopWord = topWords[topWords.length - 1];

		var hasPunctuation = (()=>{
			var flag = false;
			if(lastTopWord.dataset.addApendice !== undefined && lastTopWord.dataset.addApendice !== "f"){
				flag = true;
				lastTopWord.dataset.addApendice = "f";
				lastTopWord.innerHTML = lastTopWord.innerHTML.substring(0, lastTopWord.innerHTML.length-1);
			}
			return flag;
		})();
		if(hasPunctuation) return;

		var resolveRestoreBotClick = (()=>{
			var botWord = document.getElementById(lastTopWord.dataset.idBot);
			botWord.style.filter = "grayscale(0%)";
			botWord.onclick = function(){
				TaCerto.GenFunc.fadeInBtnClick(this, ()=>{});
				TaCerto.Controladora.Jogo.Aurelio.aurWordClick(this);
			};
		})();

		var resolveWordItemAnimation = (async ()=>{
			var textHtml = lastTopWord.innerHTML;
			for (let i = textHtml.length - 1; i >= 0; i--) {
				lastTopWord.innerHTML = textHtml.substring(0, i);
				await promiseRequestAnimationFrame();
			}
			lastTopWord.parentElement.removeChild(lastTopWord);
		})();
	},
	pular: function(){
		this.DESAFIO[this.DESAFIO.length] = this.shuffleDesafio(this.missaoChave)[0];
		this.DESAFIO[this.DESAFIO.length] = "primeira interação tem um pop().";
		this.proximaPergunta();
	},
	eliminarErrado: function(){
		var cont = 0;
		var elementos = (()=>{
			var aux = document.getElementsByClassName("aurWord");
			var arr = []
			for (let i = 0; i < aux.length; i++)
				arr[i] = aux[i];
			return arr;
		})();
		elementos.shuffle();
		for (let i = 0; i < elementos.length && cont < 2; i++) {
			console.log(elementos[i].dataset.index);
			if(parseInt(elementos[i].dataset.index) === -1){
				cont++;
				elementos[i].classList.add("animated", "fadeOut");
				setTimeout(()=>{
					try {
						elementos[i].parentElement.removeChild(elementos[i]);
					} catch (error) {}
				}, 500);
			}
		}
	},
	shuffleDesafio: function(missaoChave){
		var x = TaCerto.Estrutura.DesafioDeFase.aurelio.slice().shuffle();
		if(missaoChave || !isNaN(missaoChave))
			x.pickFase([missaoChave]);
		return x;
	},
	loadingMessage: function(){
		return "Rescreva as frases na forma normativa.";
	},
	zerarVars: function(){
		this.DESAFIO = [];
	}
};
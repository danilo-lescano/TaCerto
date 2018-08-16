var TaCerto = TaCerto || {};
TaCerto.Controladora = TaCerto.Controladora || {};
TaCerto.Controladora.Jogo = TaCerto.Controladora.Jogo || {};
TaCerto.Controladora.Jogo.Lacuna = {
	DESAFIO: [],
	called: function () {
		TaCerto.Controladora.CarregarPagina.htmlCorpo("jogo", ["lacuna"], ["JogoTipo"]);
	},
	loadDesafio: function () {
		var desafioNum = TaCerto.Controladora.Jogo.Geral.gameModel.desafioNum = 15;//ORIGINAL: 15
		var shuffledDesafio = TaCerto.Controladora.Jogo.Lacuna.shuffleDesafio();

		for (var i = 0; i < desafioNum; i++)
			TaCerto.Controladora.Jogo.Lacuna.DESAFIO[i] = shuffledDesafio[i];
		TaCerto.Controladora.Jogo.Lacuna.proximoDesafio();
		TaCerto.Controladora.Jogo.Lacuna.initDraggableEvent();
		TaCerto.Controladora.Jogo.Lacuna.dealWithDroppable();
	},
	proximoDesafio: function () {
		var desafio = TaCerto.Controladora.Jogo.Lacuna.DESAFIO[TaCerto.Controladora.Jogo.Lacuna.DESAFIO.length-1];
		var frase = '', resposta = '';
		for (var i = 0; i < desafio.fraseXlacuna.length; i++)
			frase += desafio.fraseXlacuna[i].frase ? desafio.fraseXlacuna[i].conteudo : "<div class='padThis'><div id='lacuna" + i + "' class='emptyLacuna droppableLacuna'></div></div>";
		document.getElementById('palavra').innerHTML = frase;

		for (var i = 0; i < desafio.resposta.length; i++)
			resposta +='<div class="padThis"><div class="draggableLacuna lacunaAlternativa">' + desafio.resposta[i].conteudo + '</div></div>';
		document.getElementById('lacunaResp').innerHTML = resposta;
	},
	checkResposta: function(){
		var itens = document.getElementsByClassName('droppableLacuna');
		var flagItensCompletos = 0;
		var flagResp = false;
		var respostasCorretas = 0;

		var lacunaEstiloFlag = [];

		for (var i = 0; i < itens.length; i++)
			flagItensCompletos += itens[i].innerHTML ? 1 : 0;
		if (flagItensCompletos === itens.length){
			for (var i = 0; i < itens.length; i++) {
				var posicao = parseInt(itens[i].id.split("lacuna")[1]);
				lacunaEstiloFlag[lacunaEstiloFlag.length] = false;
				for (var j = 0; j < TaCerto.Controladora.Jogo.Lacuna.DESAFIO[TaCerto.Controladora.Jogo.Lacuna.DESAFIO.length-1].resposta.length; j++) {
					var desafio = TaCerto.Controladora.Jogo.Lacuna.DESAFIO[TaCerto.Controladora.Jogo.Lacuna.DESAFIO.length-1].resposta[j];
					if(desafio.position === posicao && desafio.conteudo === itens[i].innerHTML){
						lacunaEstiloFlag[lacunaEstiloFlag.length-1] = true;
						respostasCorretas++;
					}
				}
			}

			flagResp = itens.length === respostasCorretas;

			for (var i = 0; i < itens.length; i++)
				itens[i].style.backgroundColor = lacunaEstiloFlag[i] ? "green" : itens[i].style.backgroundColor = "red";
			TaCerto.Controladora.Jogo.Geral.atualizarResposta(flagResp);
			
			setTimeout(function(){
				if(TaCerto.Controladora.Jogo.Geral.gameModel.tipoDeJogo === "Lacuna"){
					TaCerto.Controladora.Jogo.Lacuna.DESAFIO.pop();
					if(TaCerto.Controladora.Jogo.Lacuna.DESAFIO.length){
						TaCerto.Controladora.Jogo.Lacuna.proximoDesafio();
						TaCerto.Controladora.Jogo.Lacuna.initDraggableEvent();
						TaCerto.Controladora.Jogo.Lacuna.dealWithDroppable();
					}
					else
						TaCerto.Controladora.Jogo.Geral.fimDeJogo();
				}
			},1000);
		}
	},
	dealWithDroppable: function(){
		$(".droppableLacuna").draggable();
		$(".droppableLacuna")
		.mouseup(function(){
			var xPointer = event.clientX;
			var yPointer = event.clientY;
			var lacunas = document.getElementsByClassName('droppableLacuna').length;
			var flag = 0;
			var notEmptyFlag = this.innerHTML ? true : false;
			for (var i = 1; i <= lacunas; i++) {
				var auxId = document.getElementsByClassName('droppableLacuna')[i-1].id;
				var xLacuna = $("#"+auxId).offset().left;
				var yLacuna = $("#"+auxId).offset().top;
				var wLacuna = $("#"+auxId).width();
				var hLacuna = $("#"+auxId).height();

				if (xPointer >= xLacuna && xPointer <= xLacuna+wLacuna && yPointer >= yLacuna && yPointer <= yLacuna+hLacuna && this.id !== auxId){
					flag = auxId;
				}
			}
			if (flag && notEmptyFlag){
				var clickMP3 = TaCerto.SOUND.find("clicklacuna");
				clickMP3.stop();
				clickMP3.play();
				var item = document.getElementById(flag);
				if(this.id !== item.id){
					var oldHTML = item.innerHTML;
					item.innerHTML = this.innerHTML;
					item.classList.remove("emptyLacuna");
					item.classList.add("lacunaAlternativa");

					var draggables = document.getElementsByClassName('draggableLacuna');
					for (var i = 0; i < draggables.length; i++) {
						if (draggables[i].innerHTML === oldHTML)
							draggables[i].style.visibility = "visible";
					}
					clean(this);
				}
			}
			else{
				clean(this);
			}

			function clean(el) {
				var oldHTML = el.innerHTML;
				el.innerHTML = '';
				el.classList.remove("lacunaAlternativa");
				el.classList.add("animated", "rubberBand", "emptyLacuna");
				setTimeout(function(){
					if(el)
						el.classList.remove("rubberBand", "animated");
				},500);
				var draggables = document.getElementsByClassName('draggableLacuna');
				for (var i = 0; i < draggables.length; i++) {
					if (!flag && draggables[i].innerHTML === oldHTML)
						draggables[i].style.visibility = "visible";
				}
			}
			this.style.left = "0px";
			this.style.top = "0px";
			$(".droppableLacuna").draggable("destroy");
			$(".droppableLacuna").draggable();
			$(".draggableLacuna").draggable("destroy");
			$(".draggableLacuna").draggable();
		});
	},
	initDraggableEvent: function(){
		$(".draggableLacuna").draggable();
		$(".draggableLacuna")
		.mouseup(function(){
			var xPointer = event.clientX;
			var yPointer = event.clientY;
			var lacunas = document.getElementsByClassName('droppableLacuna').length;
			var flag = 0;
			for (var i = 1; i <= lacunas; i++) {
				var auxId = document.getElementsByClassName('droppableLacuna')[i-1].id;
				var xLacuna = $("#"+auxId).offset().left;
				var yLacuna = $("#"+auxId).offset().top;
				var wLacuna = $("#"+auxId).width();
				var hLacuna = $("#"+auxId).height();

				if (xPointer >= xLacuna && xPointer <= xLacuna+wLacuna && yPointer >= yLacuna && yPointer <= yLacuna+hLacuna) flag = auxId;
			}
			if (flag){
				var clickMP3 = TaCerto.SOUND.find("clicklacuna");
						clickMP3.stop();
						clickMP3.play();
				this.style.visibility = "hidden";
				var item = document.getElementById(flag);
				var oldHTML = item.innerHTML;
				item.innerHTML = this.innerHTML;
				item.classList.remove("emptyLacuna");
				item.classList.add("lacunaAlternativa");

				var draggables = document.getElementsByClassName('draggableLacuna');
				for (var i = 0; i < draggables.length; i++) {
					if (draggables[i].innerHTML === oldHTML)
						draggables[i].style.visibility = "visible";
				}
			}
			this.style.left = "0px";
			this.style.top = "0px";

			TaCerto.Controladora.Jogo.Lacuna.checkResposta();

			$('.droppableLacuna').draggable("destroy");
			$(".droppableLacuna").draggable();
			$(".draggableLacuna").draggable("destroy");
			$(".draggableLacuna").draggable();
		});
	},
	pular: function(){
		var flag = document.getElementById('palavra').classList.length;
		document.getElementById('palavra').classList.remove("animated", "bounceInDown");
		document.getElementById('lacunaResp').classList.remove("animated", "bounceInRight");
		var shuffledDesafio = TaCerto.Controladora.Jogo.Lacuna.shuffleDesafio();

		setTimeout(function(){
			TaCerto.Controladora.Jogo.Lacuna.DESAFIO.pop();
			TaCerto.Controladora.Jogo.Lacuna.DESAFIO[TaCerto.Controladora.Jogo.Lacuna.DESAFIO.length] = shuffledDesafio[0];
			document.getElementById('palavra').classList.add("animated", "bounceInDown");
			document.getElementById('lacunaResp').classList.add("animated", "bounceInRight");
			TaCerto.Controladora.Jogo.Lacuna.proximoDesafio();
			TaCerto.Controladora.Jogo.Lacuna.initDraggableEvent();
		}, 10);
		
		setTimeout(function(){
			if (flag > 1 && document.getElementById('palavra')){
				document.getElementById('palavra').classList.remove("animated", "bounceInDown");
				document.getElementById('lacunaResp').classList.remove("animated", "bounceInRight");
			}
		}, 1000);
	},
	eliminarErrado: function(){
		var eliminarX = 2;
		var lacunas = document.getElementsByClassName('droppableLacuna');
		var respostas = TaCerto.Controladora.Jogo.Lacuna.DESAFIO[TaCerto.Controladora.Jogo.Lacuna.DESAFIO.length-1].resposta;
		while(eliminarX && lacunas.length < respostas.length){
			var rand = Math.floor(Math.random() * respostas.length);
			if(TaCerto.Controladora.Jogo.Lacuna.DESAFIO[TaCerto.Controladora.Jogo.Lacuna.DESAFIO.length-1].resposta[rand].position === -1){
				var matchHtml = TaCerto.Controladora.Jogo.Lacuna.DESAFIO[TaCerto.Controladora.Jogo.Lacuna.DESAFIO.length-1].resposta[rand].conteudo;
				TaCerto.Controladora.Jogo.Lacuna.DESAFIO[TaCerto.Controladora.Jogo.Lacuna.DESAFIO.length-1].resposta.splice(rand, 1);
				eliminarX--;

				for (var i = 0; i < lacunas.length; i++) {
					if(lacunas[i].innerHTML === matchHtml){
						let aux = lacunas[i];
						aux.innerHTML = '';
						aux.classList.remove("lacunaAlternativa");
						aux.classList.add("animated", "rubberBand", "emptyLacuna");
						setTimeout(function(){
							aux.classList.remove("rubberBand", "animated");
						},500);
					}
				}
				var respostasHtml = document.getElementsByClassName('draggableLacuna');
				for (var i = 0; i < respostasHtml.length; i++) {
					if(respostasHtml[i].innerHTML === matchHtml){
						let aux = respostasHtml[i];
						aux.classList.add("animated", "fadeOut");
						setTimeout(function(){
							aux.parentNode.parentNode.removeChild(aux.parentNode);
						},500);
					}
				}
			}
			lacunas = document.getElementsByClassName('droppableLacuna');
			respostas = TaCerto.Controladora.Jogo.Lacuna.DESAFIO[TaCerto.Controladora.Jogo.Lacuna.DESAFIO.length-1].resposta;
		}
		//TaCerto.Controladora.Jogo.Lacuna.proximoDesafio();
		//TaCerto.Controladora.Jogo.Lacuna.initDraggableEvent();
	},
	shuffleDesafio: function(){
		var x = TaCerto.Estrutura.DesafioDeFase.lacuna;
		var arr = [];
		var auxNvl = TaCerto.Controladora.Jogo.Missao.parametros.missao ? TaCerto.Controladora.Jogo.Missao.parametros.missao : 0;
		for (var i = auxNvl; i < TaCerto.Controladora.Jogo.Geral.calculaLvl(TaCerto.Estrutura.Jogador.xp); i++)
			arr[i] = i;
		x.shuffle();
		x.pickFase(arr);
		return x;
	},
	zerarVars: function(){
		TaCerto.Controladora.Jogo.Lacuna.DESAFIO = [];
	}
};
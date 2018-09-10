var TaCerto = TaCerto || {};
TaCerto.Controladora = TaCerto.Controladora || {};
TaCerto.Controladora.Jogo = TaCerto.Controladora.Jogo || {};
TaCerto.Controladora.Jogo.Geral = {
	gameModel: {
		acerto: 0,
		erro: 0,
		moeda: 0,
		tempo: 0,
		acertosConsecutivos: 0,
		tipoDeJogo: '',
		desafioNum: 0,
		comboBonus: 1,

		paused: false,
		intervalo: false,

		flagCardMenu: false,
		frozen: false,
		frozenTimer: 0,

		cartaUsada:{
			cartaVermelha: 0,
			cartaAzul: 0,
			cartaAmarela: 0,
			cartaVerde: 0,
		},
	},
	gameClockInterval: function () {
		TaCerto.Controladora.Jogo.Geral.gameModel.tempo = 0;
		TaCerto.Controladora.Jogo.Geral.gameModel.intervalo = setInterval(function (){
			if (!TaCerto.Controladora.Jogo.Geral.gameModel.paused && !TaCerto.Controladora.Jogo.Geral.gameModel.frozen)
				document.getElementById('tempo').innerHTML = TaCerto.Controladora.Jogo.Geral.gameModel.tempo++;
		}, 1000);
	},
	loadDesafio: function(){
		TaCerto.Controladora.Jogo[TaCerto.Controladora.Jogo.Geral.gameModel.tipoDeJogo].loadDesafio();
	},
	zerarVars: function(){
		if(TaCerto.Controladora.Jogo.Geral.gameModel.tipoDeJogo !== ''){
			TaCerto.Controladora.Jogo[TaCerto.Controladora.Jogo.Geral.gameModel.tipoDeJogo].zerarVars();
		}

		TaCerto.Controladora.Jogo.Geral.gameModel.acerto = 0;
		TaCerto.Controladora.Jogo.Geral.gameModel.erro = 0;
		TaCerto.Controladora.Jogo.Geral.gameModel.moeda = 0;
		TaCerto.Controladora.Jogo.Geral.gameModel.tempo = 0;
		TaCerto.Controladora.Jogo.Geral.gameModel.acertosConsecutivos = 0;
		TaCerto.Controladora.Jogo.Geral.gameModel.tipoDeJogo = '';
		TaCerto.Controladora.Jogo.Geral.gameModel.desafioNum = 0;
		TaCerto.Controladora.Jogo.Geral.gameModel.comboBonus = 1;

		TaCerto.Controladora.Jogo.Geral.gameModel.flagCardMenu = false;
		TaCerto.Controladora.Jogo.Geral.gameModel.frozen = false;
		TaCerto.Controladora.Jogo.Geral.gameModel.frozenTimer = 0;

		TaCerto.Controladora.Jogo.Geral.gameModel.paused = false;
		clearInterval(TaCerto.Controladora.Jogo.Geral.gameModel.intervalo);
		TaCerto.Controladora.Jogo.Geral.gameModel.intervalo = false;

		TaCerto.Controladora.Jogo.Geral.gameModel.cartaUsada.cartaVermelha = 0;
		TaCerto.Controladora.Jogo.Geral.gameModel.cartaUsada.cartaAzul = 0;
		TaCerto.Controladora.Jogo.Geral.gameModel.cartaUsada.cartaAmarela = 0;
		TaCerto.Controladora.Jogo.Geral.gameModel.cartaUsada.cartaVerde = 0;
	},
	pauseModalClick: function(el, botao){
		function logica() {
			if (TaCerto.Controladora.Jogo.Geral[botao]){
				TaCerto.Controladora.Jogo.Geral.pauseJogo(false);
				TaCerto.Controladora.Jogo.Geral[botao]();
			}
			//clicou em despausar ou  play
			else{
				document.getElementById("pauseModal").style.display = "none";
				document.getElementById("despauseModal").style.display = "block";
				for (var i = 4; i >= 0; i--) {
					let auxTime = i ? (4000 - i*1000) : 3050;
					let auxI = i ? i - 1 : "";
					setTimeout(function(){
						document.getElementById("despauseCountdown").innerHTML = auxI;
						if (auxTime === 3050) {
							document.getElementById("despauseCountdown").innerHTML = "";
							document.getElementById("despauseModal").style.display = "none";
							TaCerto.Controladora.Jogo.Geral.pauseJogo(false);
						}
					},JSParaTeste.unPause ? JSParaTeste.unPause : auxTime);
				}
			}
		}
		if(el)
			TaCerto.GenFunc.fadeInBtnClick(el,logica);
		else
			logica();

		var e = window.event;
		e.cancelBubble = true;
		if (e.stopPropagation) e.stopPropagation();
	},
	pauseBtn: function(el){
		TaCerto.GenFunc.fadeInBtnClick(el,
		function(){
			TaCerto.Controladora.Jogo.Geral.pauseJogo(true);
		});
	},
	pauseJogo: function (flag) {
		TaCerto.Controladora.Jogo.Geral.gameModel.paused = flag;
		//find and display block the modal
		var modal = document.getElementById("pauseModal");
		modal.style.display = flag ? "block" : "none";
		//pause clock animation
		var secondClock = document.getElementsByClassName('second')[0];
		secondClock.style.WebkitAnimationPlayState = flag ? "paused" : "running";
		secondClock.style.animationPlayState = flag ? "paused" : "running";
		//blur game blend
		var blurThis = [document.getElementsByClassName('gameBlend')[0], document.getElementsByClassName('jogo_wrapper')[0]];
		for (var i = 0; i < blurThis.length; i++) {
			blurThis[i].style.filter = flag ? "blur(5px)" : "none";
		}
	},
	/*-----INICIO*/
	/*PAUSE MENU CLICKS*/
	home: function(){
		TaCerto.Controladora.CarregarPagina.htmlCorpo('menuInicial');
		TaCerto.Controladora.Jogo.Geral.zerarVars();
	},
	reiniciar: function(){
		TaCerto.Controladora.Jogo.Load(TaCerto.Controladora.Jogo.Geral.gameModel.tipoDeJogo, TaCerto.Controladora.Jogo.Missao.parametros.missao);
		TaCerto.Controladora.Jogo.Geral.zerarVars();
	},
	loja: function(){
		TaCerto.Controladora.Loja.display(true);
		TaCerto.Controladora.Jogo.Geral.pauseJogo(true);
	},
	missao: function(){
		TaCerto.Controladora.MenuMissao.load();
		TaCerto.Controladora.Jogo.Geral.zerarVars();
	},
	casual: function(){
		TaCerto.Controladora.MenuCasual.load();
		TaCerto.Controladora.Jogo.Geral.zerarVars();
	},	
	/*PAUSE MENU CLICKS*/
	/*-----FIM*/

	/*-----INICIO*/
	/*CARD MENU CLICKS*/
	toggleBarraCarta: function(){
		document.getElementsByClassName("barraCartaBG")[0].style.left = TaCerto.Controladora.Jogo.Geral.gameModel.flagCardMenu ? "-58%" : "0px";
		TaCerto.Controladora.Jogo.Geral.gameModel.flagCardMenu = !TaCerto.Controladora.Jogo.Geral.gameModel.flagCardMenu;
	},
	/*CARD MENU CLICKS*/
	/*-----FIM*/
	plusBarra: function (comboFlag){
		var widthVal;
		var barra = document.getElementsByClassName("barraProgressoBack")[0];
		comboFlag = comboFlag ? true : false;

		if (TaCerto.Controladora.Jogo.Geral.gameModel.acerto <= 1){
			widthVal = TaCerto.Controladora.Jogo.Geral.gameModel.acerto ? 10 : 0;
		}
		else{
			var aux = (TaCerto.Controladora.Jogo.Geral.gameModel.acerto/TaCerto.Controladora.Jogo.Geral.gameModel.desafioNum)*100;
			widthVal = aux > 10 ? aux : 10;
		}

		barra.style.width = widthVal + "%";
		barra.classList.remove("combo1", "combo2", "combo3");

		var comboMult = TaCerto.Controladora.Jogo.Geral.gameModel.acertosConsecutivos;
		if(comboMult < 3){
			barra.classList.add("combo1");
			TaCerto.Controladora.Jogo.Geral.gameModel.comboBonus = 1;
		}
		else if(comboMult < 5){
			barra.classList.add("combo2");
		}
		else{
			barra.classList.add("combo3");
		}
		if(comboMult === 3 && !comboFlag){
			TaCerto.Controladora.Jogo.Geral.gameModel.comboBonus = 2;
			TaCerto.Controladora.Jogo.Geral.showCombo("combo" + TaCerto.Controladora.Jogo.Geral.gameModel.comboBonus + "x");
			var comboMP3 = TaCerto.SOUND.find("combo" + TaCerto.Controladora.Jogo.Geral.gameModel.comboBonus);
				comboMP3.stop();
				comboMP3.play();
		}
		else if(comboMult === 5 && !comboFlag){
			TaCerto.Controladora.Jogo.Geral.gameModel.comboBonus = 3;
			TaCerto.Controladora.Jogo.Geral.showCombo("combo" + TaCerto.Controladora.Jogo.Geral.gameModel.comboBonus + "x");
			var comboMP3 = TaCerto.SOUND.find("combo" + TaCerto.Controladora.Jogo.Geral.gameModel.comboBonus);
				comboMP3.stop();
				comboMP3.play();
		}

	},
	atualizarResposta: function(resp){
		function plusPopup(color, spanId, timeout){
			setTimeout(function () {
				var span = document.createElement("span");
				span.innerHTML = timeout ? "+" + TaCerto.Controladora.Jogo.Geral.gameModel.comboBonus : "+1";
				span.classList.add("animated", "fadeOutUp", "popupNum", color);
				document.getElementById(spanId).appendChild(span);
				setTimeout(function () {
					var k = document.querySelectorAll("#" + spanId + " > span");
					if(k.length>0)
						document.getElementById(spanId).removeChild(k[0]);
				}, 300);
			}, timeout);
		}

		if (resp){
			++TaCerto.Controladora.Jogo.Geral.gameModel.acertosConsecutivos;
			document.getElementById('acertos').innerHTML = ++TaCerto.Controladora.Jogo.Geral.gameModel.acerto;
			plusPopup("colorGreen", "acertosSpan", 10);


			document.getElementById('economia').innerHTML = TaCerto.Controladora.Jogo.Geral.gameModel.moeda += TaCerto.Controladora.Jogo.Geral.gameModel.comboBonus;
			plusPopup("colorYellow", "economiaSpan", 100);
		}
		else{
			document.getElementById('erros').innerHTML = ++TaCerto.Controladora.Jogo.Geral.gameModel.erro;
			plusPopup("colorRed", "errosSpan", 10);
			TaCerto.Controladora.Jogo.Geral.gameModel.acertosConsecutivos = 0;
		}
		TaCerto.Controladora.Jogo.Geral.plusBarra();

		if(!isNaN(TaCerto.Controladora.Jogo.Missao.parametros.missao))
			TaCerto.Controladora.Jogo.Missao.checkObjetivo();

		if(TaCerto.Controladora.Jogo.Geral.gameModel.tipoDeJogo === "Aleatorio")
			TaCerto.Controladora.Jogo.Aleatorio.next();
	},
	clickCarta: function(card){
		callCarta = {
			cartaVermelha: function(){
				TaCerto.Controladora.Jogo.Geral.gameModel.cartaUsada.cartaVermelha++;
				TaCerto.Controladora.Jogo[TaCerto.Controladora.Jogo.Geral.gameModel.tipoDeJogo].pular();
			},
			cartaAzul: function(){
				TaCerto.Controladora.Jogo.Geral.gameModel.cartaUsada.cartaAzul++;
				TaCerto.Controladora.Jogo.Geral.showCombo("clockIce");
				var secondClock = document.getElementsByClassName('second')[0];
				var intervalo;
				var freezeMP3 = TaCerto.SOUND.find("freeze");
				freezeMP3.stop();
				freezeMP3.play();

				if (TaCerto.Controladora.Jogo.Geral.gameModel.frozen)
					TaCerto.Controladora.Jogo.Geral.gameModel.frozenTimer -= 3000;
				else{
					intervalo = setInterval(function(){
						if (!TaCerto.Controladora.Jogo.Geral.gameModel.frozen)
							clearInterval(intervalo);
						else{
							if (!TaCerto.Controladora.Jogo.Geral.gameModel.paused){
								TaCerto.Controladora.Jogo.Geral.gameModel.frozenTimer += 100;
								secondClock.style.WebkitAnimationPlayState = "paused";
								secondClock.style.animationPlayState = "paused";
							}
							if (TaCerto.Controladora.Jogo.Geral.gameModel.frozenTimer === 3000) {
								TaCerto.Controladora.Jogo.Geral.gameModel.frozen = false;
								clearInterval(intervalo);
								secondClock.style.WebkitAnimationPlayState = "running";
								secondClock.style.animationPlayState = "running";
								TaCerto.Controladora.Jogo.Geral.gameModel.frozenTimer -= 3000;
							}
						}
					},100);					
				}
				TaCerto.Controladora.Jogo.Geral.gameModel.frozen = true;
			},
			cartaVerde: function(){
				var vassouraMP3 = TaCerto.SOUND.find("vassoura");
				vassouraMP3.stop();
				vassouraMP3.play();
				TaCerto.Controladora.Jogo.Geral.showCombo("vassoura");
				TaCerto.Controladora.Jogo.Geral.gameModel.cartaUsada.cartaVerde++;
				TaCerto.Controladora.Jogo[TaCerto.Controladora.Jogo.Geral.gameModel.tipoDeJogo].eliminarErrado();
			},
			cartaAmarela: function(){
				TaCerto.Controladora.Jogo.Geral.gameModel.cartaUsada.cartaAmarela++;
				TaCerto.Controladora.Jogo.Geral.showCombo("block");
				if(TaCerto.Controladora.Jogo.Geral.gameModel.erro){
					var flag = document.getElementById('erros').classList.length;
					document.getElementById('erros').classList.remove("animated", "bounce");
					document.getElementById('erros').innerHTML = --TaCerto.Controladora.Jogo.Geral.gameModel.erro;
					document.getElementById('erros').classList.add("animated", "bounce");
					setTimeout(function(){
						if (document.getElementById('erros'))
							document.getElementById('erros').classList.remove("animated", "bounce");
					},1000);
				}
			},
		};

		var cartaClicada = document.getElementById(card).childNodes;

		for (var i = cartaClicada.length - 1, flag = true; i >= 0 && flag; i--) {
			if (cartaClicada[i].classList.length === 2){
				var clickMP3 = TaCerto.SOUND.find("clickcarta");
				clickMP3.stop();
				clickMP3.play();
				setTimeout(function(){
					if(document.getElementById(card) && document.getElementById(card).childNodes[document.getElementById(card).childNodes.length - 1] && document.getElementById(card).childNodes[document.getElementById(card).childNodes.length - 1].classList.length > 2){
						document.getElementById(card).removeChild(document.getElementById(card).childNodes[document.getElementById(card).childNodes.length - 1]);
					}
				}, 1000);

				cartaClicada[i].classList.add("animated", "bounceUpOut", "flipCard"+card);
				callCarta[card]();
				TaCerto.Estrutura.Jogador[card]--;
				flag = false;
			}
		}
	},
	calculaLvl: function(xp){
		var level = 1;
		xp-=200;
		while(xp !== 0)
			xp -= xp > 0 ? ++level * 100 : level-- * 0 + xp;
		return level;
	},
	showCombo: function(comboId){
		//SAMPLE
		//<div id="clockIce" data-timing="3000" data-tada="false" data-animacoesTotal="21" data-framesX="4" data-framesY="6"></div>

		var comboEl = document.getElementById(comboId);
		comboEl.style.visibility = "visible";
		comboEl.style.backgroundPosition = "0 0";
		comboEl.style.zIndex = "99";
		if(comboEl.getAttribute("data-tada") === "true")
			comboEl.classList.add("animated", "tada");
		var tempo = parseInt(comboEl.getAttribute("data-timing"));
		var animacoes = parseInt(comboEl.getAttribute("data-animacoesTotal"));
		var x = parseInt(comboEl.getAttribute("data-framesX"));
		var y = parseInt(comboEl.getAttribute("data-framesY"));

		var i = 0;
		var intervalo = setInterval(function () {
			if(comboEl.style.backgroundPosition === "0% 0%" && i > 1)
				clearInterval(intervalo);
			else 
				comboEl.style.backgroundPosition = (100/(x-1)) * (i%x) + "% " + (100/(y-1)) * Math.trunc(i/x) + "%";
			if (++i === animacoes){
				comboEl.style.visibility = "hidden";
				comboEl.classList.remove("animated", "tada");
				clearInterval(intervalo);
				comboEl.style.zIndex = "-99";
			}
		}, Math.ceil(tempo/animacoes));
	},
	fimDeJogo: function(){
		TaCerto.Estrutura.Jogador.moeda += TaCerto.Controladora.Jogo.Geral.gameModel.moeda;
		TaCerto.Controladora.FimJogo.start();
		TaCerto.Controladora.Jogo.Geral.zerarVars();
	},
	start: function(tipo){
		TaCerto.Controladora.Jogo.Geral.zerarVars();
		TaCerto.Controladora.Jogo.Geral.gameModel.tipoDeJogo = tipo;
		TaCerto.Controladora.Jogo.Geral.loadDesafio();
		TaCerto.Controladora.Jogo.Geral.gameClockInterval();
	}
};
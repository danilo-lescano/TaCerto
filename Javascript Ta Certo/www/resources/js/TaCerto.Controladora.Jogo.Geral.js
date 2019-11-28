var TaCerto = TaCerto || {};
TaCerto.Controladora = TaCerto.Controladora || {};
TaCerto.Controladora.Jogo = TaCerto.Controladora.Jogo || {};
TaCerto.Controladora.Jogo.Geral = {
	gameModel: {
		acerto: 0,
		erro: 0,
		moeda: 0,
		maxMoney: 0,
		tempo: 0,
		acertosConsecutivos: 0,
		tipoDeJogo: '',
		missaoId: null,
		tamanho: 0,
		desafioNum: 0,
		comboBonus: 1,

		paused: false,
		intervalo: false,
		errou: false,

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

		this.gameModel.tempo = 0;

		this.gameModel.intervalo = setInterval(()=>{

			if (!this.gameModel.paused && !this.gameModel.frozen){

				var minutes = Math.floor(this.gameModel.tempo / 60);
				var seconds = this.gameModel.tempo - (minutes * 60);

				var tempoText = "";
				tempoText += "" + (minutes < 10 ? "0" : "") + minutes;
				tempoText += ":" + (seconds < 10 ? "0" : "") + seconds;
				document.getElementById('tempo').innerHTML = tempoText;
				this.gameModel.tempo++;
			}
				
		}, 1000);
	},
	loadDesafio: function(){
		TaCerto.Controladora.Jogo[this.gameModel.tipoDeJogo].loadDesafio(this.gameModel.missaoId, this.gameModel.tamanho);

		this.gameModel.maxMoney =  3 + 4 + ((this.gameModel.desafioNum-5)*3);
	},
	zerarVars: function(){
		if(this.gameModel.tipoDeJogo !== ''){
			TaCerto.Controladora.Jogo[this.gameModel.tipoDeJogo].zerarVars();
		}

		this.gameModel.acerto = 0;
		this.gameModel.erro = 0;
		this.gameModel.moeda = 0;
		this.gameModel.maxMoney = 0;
		this.gameModel.tempo = 0;
		this.gameModel.acertosConsecutivos = 0;
		this.gameModel.tipoDeJogo = '';
		this.gameModel.missaoId = null;
		this.gameModel.tamanho = 0;
		this.gameModel.desafioNum = 0;
		this.gameModel.comboBonus = 1;

		this.gameModel.flagCardMenu = false;
		this.gameModel.frozen = false;
		this.gameModel.frozenTimer = 0;

		this.gameModel.paused = false;
		clearInterval(this.gameModel.intervalo);
		this.gameModel.intervalo = false;
		this.gameModel.errou = false;

		this.gameModel.cartaUsada.cartaVermelha = 0;
		this.gameModel.cartaUsada.cartaAzul = 0;
		this.gameModel.cartaUsada.cartaAmarela = 0;
		this.gameModel.cartaUsada.cartaVerde = 0;
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
					},isNaN(JSParaTeste.unPause) ? auxTime : JSParaTeste.unPause);
				}
			}
		}
		if(el)
			TaCerto.GenFunc.fadeInBtnClick(el,logica);
		else if(document.getElementById("despauseModal").style.display === "none")
			logica();
	},
	pauseBtn: function(el){
		TaCerto.GenFunc.fadeInBtnClick(el,
		()=>{
			this.pauseJogo(true);
		});
	},
	pauseJogo: function (flag) {
		this.gameModel.paused = flag;
		//find and display block the modal
		var modal = document.getElementById("pauseModal");
		modal.style.display = flag ? "block" : "none";
		//pause clock animation
		//blur game blend
		var blurThis = [document.getElementsByClassName('gameBlend')[0], document.getElementsByClassName('jogo_wrapper')[0]];
		for (var i = 0; i < blurThis.length; i++) {
			blurThis[i].style.filter = flag ? "blur(5px)" : "none";
		}
	},
	/*-----INICIO*/
	/*PAUSE MENU CLICKS*/
	home: function(){
		TaCerto.Controladora.MenuInicial.load();
		this.zerarVars();
	},
	reiniciar: function(){
		var tipoDeJogo = this.gameModel.tipoDeJogo;
		var missaoId = this.gameModel.missaoId;
		var tamanho = this.gameModel.tamanho;
		this.zerarVars();
		TaCerto.Controladora.Jogo.Load(tipoDeJogo, missaoId, tamanho);
	},
	loja: function(){
		TaCerto.Controladora.Loja.display(true);
		this.pauseJogo(true);
	},
	missao: function(){
		TaCerto.Controladora.MenuMissao.load();
		this.zerarVars();
	},
	casual: function(){
		TaCerto.Controladora.MenuCasual.load();
		this.zerarVars();
	},	
	/*PAUSE MENU CLICKS*/
	/*-----FIM*/

	/*-----INICIO*/
	/*CARD MENU CLICKS*/
	toggleBarraCarta: function(){
		document.getElementsByClassName("barraCartaBG")[0].style.left = this.gameModel.flagCardMenu ? "-63%" : "0px";

		this.gameModel.flagCardMenu = !this.gameModel.flagCardMenu;

		TaCerto.Controladora.MenuConquistas.checkIfICanCheckAchievements(false); // Checa achievements
	},
	/*CARD MENU CLICKS*/
	/*-----FIM*/

	/*-----INICIO*/
	/*Mostrar informações de erro e significado CLICKS*/
	showMeMeuErro: function(el, flag){

		if(!this.gameModel.errou)
			return;

		TaCerto.GenFunc.fadeInBtnClick(el,
		()=>{
			this.showLastErrorPanel(flag);
		});
	},
	showLastErrorPanel: function(flag){
		this.gameModel.paused = flag;
		//find and display block the modal
		var modal = document.getElementById("errorModal");

		requestAnimationFrame(() => {
			modal.classList.remove("animated", "fadeIn");
			modal.classList.remove("animated", "fadeOut");
		});		

		requestAnimationFrame(() => {
			if(!flag){
				
				modal.classList.add("animated", "fadeOut");
				setTimeout(() => {
					console.log("fecha");
				}, 1000);

			}else{
				

				modal.classList.add("animated", "fadeIn");

				setTimeout(() => {
					console.log("abre");
				}, 10);
			}
		});
		
		document.querySelector("#errorModal>.modalWrapper>.centerPanel>h6").innerHTML = TaCerto.Controladora.Jogo[this.gameModel.tipoDeJogo].DESAFIO[TaCerto.Controladora.Jogo[this.gameModel.tipoDeJogo].DESAFIO.length - 1].significado;

		modal.style.display = flag ? "block" : "none";
		//pause clock animation
		//blur game blend
		var blurThis = [document.getElementsByClassName('gameBlend')[0], document.getElementsByClassName('jogo_wrapper')[0]];
		for (var i = 0; i < blurThis.length; i++) {
			blurThis[i].style.filter = flag ? "blur(5px)" : "none";
		}
	},

	showMeOSignificado: function(el, flag){

		TaCerto.GenFunc.fadeInBtnClick(el,
		()=>{
			this.showSignificadoPanel(flag);
		});
	},
	showSignificadoPanel: function(flag){
		this.gameModel.paused = flag;
		//find and display block the modal
		var modal = document.getElementById("significadoModal");
		
		requestAnimationFrame(() => {
			modal.classList.remove("animated", "fadeIn");
			modal.classList.remove("animated", "fadeOut");
		});		

		requestAnimationFrame(() => {
			if(!flag){
				
				modal.classList.add("animated", "fadeOut");
				setTimeout(() => {
					console.log("fecha");
				}, 1000);

			}else{
				

				modal.classList.add("animated", "fadeIn");

				setTimeout(() => {
					console.log("abre");
				}, 10);
			}
		});

		//var child = modal.children[0].children[0].children[1];
		document.querySelector("#significadoModal>.modalWrapper>.centerPanel>h6").innerHTML = TaCerto.Controladora.Jogo[this.gameModel.tipoDeJogo].DESAFIO[TaCerto.Controladora.Jogo[this.gameModel.tipoDeJogo].DESAFIO.length - 1].dica;
		//child.innerHTML = TaCerto.Controladora.Jogo.Normal.DESAFIO[TaCerto.Controladora.Jogo.Normal.DESAFIO.length - 1].dica;

		modal.style.display = flag ? "block" : "none";
		//pause clock animation
		//blur game blend
		var blurThis = [document.getElementsByClassName('gameBlend')[0], document.getElementsByClassName('jogo_wrapper')[0]];
		for (var i = 0; i < blurThis.length; i++) {
			blurThis[i].style.filter = flag ? "blur(5px)" : "none";
		}
	},
	/* Mostrar informações de erro e significado CLICKS*/
	/*-----FIM*/

	plusBarra: function (comboFlag){
		var widthVal;
		var barra = document.getElementsByClassName("barraProgressoBack")[0];
		comboFlag = comboFlag ? true : false;

		if (this.gameModel.acerto <= 1){
			widthVal = this.gameModel.acerto ? 10 : 0;
		}
		else{
			var aux = (this.gameModel.acerto/this.gameModel.desafioNum)*100;
			widthVal = aux > 10 ? aux : 10;
		}

		barra.style.width = widthVal + "%";
		barra.classList.remove("combo1", "combo2", "combo3");

		var comboMult = this.gameModel.acertosConsecutivos;
		if(comboMult < 3){
			barra.classList.add("combo1");
			this.gameModel.comboBonus = 1;
		}
		else if(comboMult < 5)
			barra.classList.add("combo2");
		else
			barra.classList.add("combo3");
		if(comboMult === 3 && !comboFlag){
			this.gameModel.comboBonus = 2;
			this.showCombo("combo" + this.gameModel.comboBonus + "x");
			var comboMP3 = TaCerto.SOUND.find("combo" + this.gameModel.comboBonus);
				comboMP3.stop();
				comboMP3.play();
		}
		else if(comboMult === 5 && !comboFlag){
			this.gameModel.comboBonus = 3;
			this.showCombo("combo" + this.gameModel.comboBonus + "x");
			var comboMP3 = TaCerto.SOUND.find("combo" + this.gameModel.comboBonus);
				comboMP3.stop();
				comboMP3.play();
		}

	},
	plusBarraMoney: function (comboFlag){
		var widthVal;
		var barra = document.getElementsByClassName("barraProgressoBack")[0];

		if (this.gameModel.moeda <= 1)
			widthVal = 0;
		else{
			var aux = (this.gameModel.moeda/this.gameModel.maxMoney)*100;
			widthVal = aux > 10 ? aux : 10;
		}

		barra.style.width = widthVal + "%";
		barra.classList.remove("combo1", "combo2", "combo3");

		var comboMult = this.gameModel.acertosConsecutivos;
		if(comboMult < 3){
			barra.classList.add("combo1");
			this.gameModel.comboBonus = 1;
		}
		else if(comboMult < 5)
			barra.classList.add("combo2");
		else
			barra.classList.add("combo3");
		if(comboMult === 3 && !comboFlag){
			this.gameModel.comboBonus = 2;
			this.showCombo("combo" + this.gameModel.comboBonus + "x");
			var comboMP3 = TaCerto.SOUND.find("combo" + this.gameModel.comboBonus);
				comboMP3.stop();
				comboMP3.play();
		}
		else if(comboMult === 5 && !comboFlag){
			this.gameModel.comboBonus = 3;
			this.showCombo("combo" + this.gameModel.comboBonus + "x");
			var comboMP3 = TaCerto.SOUND.find("combo" + this.gameModel.comboBonus);
				comboMP3.stop();
				comboMP3.play();
		}

	},
	atualizarResposta: function(resp){
		function plusPopup(color, spanId, timeout){
			setTimeout(function () {
				try{
					var span = document.createElement("span");
					span.innerHTML = timeout ? "+" + TaCerto.Controladora.Jogo.Geral.gameModel.comboBonus : "+1";
					span.classList.add("animated", "fadeOutUp", "popupNum", color);
					document.getElementById(spanId).appendChild(span);
					setTimeout(function () {
						var k = document.querySelectorAll("#" + spanId + " > span");
						if(k.length>0)
							document.getElementById(spanId).removeChild(k[0]);
					}, 300);
				}catch(erro){
					console.log("erro");
				}
			}, timeout);
		}

		if (resp){
			this.gameModel.errou = false;
			// Incrementa acerto total do jogador
			++TaCerto.Estrutura.Jogador.totalAcertos;

			++this.gameModel.acertosConsecutivos;
			document.getElementById( 'acertos').innerHTML = ++this.gameModel.acerto;
			plusPopup("colorGreen", "acertosSpan", 10);

			//document.getElementById('economia').innerHTML = 
			this.gameModel.moeda += this.gameModel.comboBonus;
			//plusPopup("colorYellow", "economiaSpan", 100);
			
			TaCerto.Estrutura.Jogador.moeda += this.gameModel.comboBonus;

			//document.getElementById('botaoInformacao').classList.add('disableButton');
			document.querySelector('#botaoInformacao>img').src = "resources/media/image/botaoInformacao2.png";
		}
		else{
			this.gameModel.errou = true;
			//document.getElementById('botaoInformacao').classList.remove('disableButton');
			document.querySelector('#botaoInformacao>img').src = "resources/media/image/botaoInformacao.png";
			document.getElementById('erros').innerHTML = ++this.gameModel.erro;
			plusPopup("colorRed", "errosSpan", 10);
			this.gameModel.acertosConsecutivos = 0;
		}
		this.plusBarraMoney();


		if(!isNaN(TaCerto.Controladora.Jogo.Missao.parametros.missao))
			TaCerto.Controladora.Jogo.Missao.checkObjetivo();

		if(this.gameModel.tipoDeJogo === "Aleatorio")
			TaCerto.Controladora.Jogo.Aleatorio.next();		
			
		TaCerto.Controladora.MenuConquistas.checkIfICanCheckAchievements(false);

	},
	clickCarta: function(card){
		callCarta = {
			cartaVermelha: function(){
				TaCerto.Controladora.Jogo.Geral.gameModel.cartaUsada.cartaVermelha++;
				TaCerto.Estrutura.Jogador.cartaVermelhaUsadas++;
				TaCerto.Controladora.Jogo[TaCerto.Controladora.Jogo.Geral.gameModel.tipoDeJogo].pular();
			},
			cartaAzul: function(){
				TaCerto.Controladora.Jogo.Geral.gameModel.cartaUsada.cartaAzul++;
				TaCerto.Estrutura.Jogador.cartaAzulUsadas++;
				TaCerto.Controladora.Jogo.Geral.showCombo("clockIce");
				var intervalo;
				var freezeMP3 = TaCerto.SOUND.find("freeze");
				freezeMP3.stop();
				freezeMP3.play();

				if (TaCerto.Controladora.Jogo.Geral.gameModel.frozen)
					TaCerto.Controladora.Jogo.Geral.gameModel.frozenTimer -= 3000;
				else
					intervalo = setInterval(function(){
						if (!TaCerto.Controladora.Jogo.Geral.gameModel.frozen)
							clearInterval(intervalo);
						else{
							if (!TaCerto.Controladora.Jogo.Geral.gameModel.paused)
								TaCerto.Controladora.Jogo.Geral.gameModel.frozenTimer += 100;
							if (TaCerto.Controladora.Jogo.Geral.gameModel.frozenTimer === 3000) {
								TaCerto.Controladora.Jogo.Geral.gameModel.frozen = false;
								clearInterval(intervalo);
								TaCerto.Controladora.Jogo.Geral.gameModel.frozenTimer -= 3000;
							}
						}
					},100);
				TaCerto.Controladora.Jogo.Geral.gameModel.frozen = true;
			},
			cartaVerde: function(){
				var vassouraMP3 = TaCerto.SOUND.find("vassoura");
				vassouraMP3.stop();
				vassouraMP3.play();
				TaCerto.Controladora.Jogo.Geral.showCombo("vassoura");
				TaCerto.Controladora.Jogo.Geral.gameModel.cartaUsada.cartaVerde++;
				TaCerto.Estrutura.Jogador.cartaVerdeUsadas++;
				TaCerto.Controladora.Jogo[TaCerto.Controladora.Jogo.Geral.gameModel.tipoDeJogo].eliminarErrado();
			},
			cartaAmarela: function(){
				TaCerto.Controladora.Jogo.Geral.gameModel.cartaUsada.cartaAmarela++;
				TaCerto.Estrutura.Jogador.cartaAmarelaUsadas++;
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
		//TaCerto.Estrutura.Jogador.moeda += this.gameModel.moeda;		
		TaCerto.Controladora.FimJogo.start();
		TaCerto.Controladora.MenuConquistas.checkIfICanCheckAchievements(true);
		this.zerarVars();
	},
	start: function(tipo, missaoId, tamanho){
		this.zerarVars();
		this.gameModel.tipoDeJogo = tipo;
		this.gameModel.missaoId = missaoId;
		this.gameModel.tamanho = tamanho;
		this.loadDesafio();
		this.gameClockInterval();
	}
};
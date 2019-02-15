var TaCerto = TaCerto || {};
TaCerto.Controladora = TaCerto.Controladora || {};
TaCerto.Controladora.Jogo = TaCerto.Controladora.Jogo || {};
TaCerto.Controladora.Jogo.Load = function(tipo, missaoId, tamanho){
	
	var message = TaCerto.Controladora.Jogo[tipo].loadingMessage() || "";
	function loadDesafio(tipo) {
		console.log("LOADING GAME TYPE: " + tipo + "   MISSION LEVEL: " + 
		(missaoId ? (!isNaN(missaoId) ? missaoId+1 : missaoId) : "NONE"));

		TaCerto.Controladora.Jogo[tipo].called();

		if(!isNaN(missaoId)) TaCerto.Controladora.Jogo.Missao.start(missaoId);
		TaCerto.Controladora.Jogo.Geral.start(tipo, missaoId, tamanho);

		if (!isNaN(missaoId)){
			document.getElementById("modalBtnMissao").style.display = "initial";
			document.getElementById("modalBtnCasual").style.display = "none";
		}

	}
	function startCountDown(flag, iteracao){ //usando promisse caso alguem tenha duvidas de como essa parte funciona
		if (flag) {
			TaCerto.Controladora.CarregarPagina.htmlCorpo("countDown");
			document.getElementById("countdownText").innerHTML = message;
			var contador = setInterval(function(){
				if (count === 0){
					tictac.stop();
					loadDesafio(tipo);
					clearInterval(contador);
				}
				else
					document.getElementById('counter').innerHTML = --count;
			}, 950); //era pra ser 1000, mas 950 ta mais alinhado com o som
		}
		else{
			tictac.play();
			startCountDown(true);
		}
		iteracao++;
	}
	JSParaTeste.countTimer = JSParaTeste.countTimer !== undefined ? JSParaTeste.countTimer : 6;
	var count = JSParaTeste.countTimer; //ORIGINAL:6
	var tictac = TaCerto.SOUND.find("clock");

	TaCerto.Controladora.CarregarPagina.htmlCorpo("loading");

	tictac.oncanplaythrough = startCountDown(false, 0);
};
TaCerto.Jogo = {
	countTempo: false,
	flagKillInterval: false,
	flagRestart: false,
	pause: false,
	contador: false,
	tipo: '',
	PALAVRAS: [],
	play: function (tipo) {
		if (tipo === "normal" || tipo === "explorador" || tipo === "aurelio") {
			TaCerto.Jogo.countTempo = 0;
			TaCerto.Jogo.tipo = tipo;
			TaCerto.Carregar("jogo");
			TaCerto.Jogo.contador = setInterval(function (){
				if (TaCerto.Jogo.flagKillInterval || TaCerto.Jogo.flagRestart){
					clearInterval(TaCerto.Jogo.contador);
					TaCerto.Jogo.resetVars();
				}
				else if (!TaCerto.Jogo.pause && !TaCerto.Jogo.flagKillInterval) {
					document.getElementById('tempo').innerHTML = TaCerto.Jogo.countTempo;
					TaCerto.Jogo.countTempo++;
				}
			}, 1000);
		}
	},
	pauseBtn: function() {
		var modal = document.getElementsByClassName('jogo_pauseModal')[0];
		var secondClock = document.getElementsByClassName('second')[0];
		var blurThis = [document.getElementsByClassName('gameBlend')[0], document.getElementsByClassName('jogo_wrapper')[0]];

		secondClock.style.WebkitAnimationPlayState = "paused";
		secondClock.style.animationPlayState = "paused";
		TaCerto.Jogo.pause = true;
		modal.style.display = "block";
		for (var i = 0; i < blurThis.length; i++) {
			blurThis[i].style.filter = "blur(5px)";
		}
	},
	modalClick: function(elemento, load) {
		var blurThis = [document.getElementsByClassName('gameBlend')[0], document.getElementsByClassName('jogo_wrapper')[0]];
		var secondClock = document.getElementsByClassName('second')[0];
		secondClock.style.WebkitAnimationPlayState = "running";
		secondClock.style.animationPlayState = "running";
		for (var i = 0; i < blurThis.length; i++) blurThis[i].style.filter = "none";
		if (elemento.id === "pauseModal" || elemento.id === "play_button") {
			var modal = document.getElementsByClassName('jogo_pauseModal')[0];
			modal.style.display = "none";
			TaCerto.Jogo.pause = false;
		}
		else if (elemento.id === "restart_button"){
			TaCerto.Jogo.flagRestart = true;
			TaCerto.JogoLoad.play(TaCerto.Jogo.tipo);
		}
		else{
			TaCerto.Jogo.flagKillInterval = true;
			TaCerto.Carregar(load);
		}


		var e = window.event;
		e.cancelBubble = true;
		if (e.stopPropagation) e.stopPropagation();
	},
	resetVars: function () {
		TaCerto.Jogo.countTempo = false;
		TaCerto.Jogo.flagKillInterval = false;
		TaCerto.Jogo.flagRestart = false;
		TaCerto.Jogo.pause = false;
		TaCerto.Jogo.contador = false;
		TaCerto.Jogo.PALAVRAS = [];
	}
};
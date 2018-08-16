TaCerto.JogoLoad = {
	play: function(tipo){
		TaCerto.Carregar("jogoLoad");
		var count = 0;
		var tictac = new Audio ("resources/media/audio/clock.mp3");
		tictac.play();
		var contador = setInterval(function contar(){
			var contagem = document.getElementById('counter');
			if(count < 0) {
				tictac.pause(); tictac.currentTime = 0;
				document.getElementById('countdownWrapper').style.display = "none";
				clearInterval(contador);

				TaCerto.Jogo.play(tipo);
			} else
				contagem.innerHTML = count;
			count--;
		}, 1000);
	},
	loadDesafio: function (tipo) {
		var http = new XMLHttpRequest();
		var params = {"idSessao":TaCerto.idSessao, "tipo":tipo};
		http.open('POST', '/loadDesafio');
		http.setRequestHeader('Content-type', 'application/json');
		http.send(JSON.stringify(params)); // Make sure to stringify
		http.onload = function() {
			console.log(http.responseText);
			if (http.responseText) {
				TaCerto.Jogo.PALAVRAS = JSON.parse(http.responseText);
			}
			else
				alert("Operacao invalida");
		}
	}
};
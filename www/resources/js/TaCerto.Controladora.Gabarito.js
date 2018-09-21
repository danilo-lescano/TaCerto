var TaCerto = TaCerto || {};
TaCerto.Controladora = TaCerto.Controladora || {};
TaCerto.Controladora.Gabarito = {
    gameModel: {
        openned: false,
    },
    open: function () {
        console.log("oi");
		var telaGabarito = document.getElementById("gabaritoScreen");
		var gabaritoBotao = document.getElementById("gabaritoBotao");
		//gabaritoBotao.style.display === "none";
		//telaGabarito.style.display === "none";
		this.gameModel.openned = !this.gameModel.openned;
		//telaGabarito.classList.remove("animated","slideInUp","slideInDown");
		
		
		if(this.gameModel.openned){
            console.log("levanta a tela");
            setTimeout(function(){
				telaGabarito.style.height = 70 + "vh";
            	//telaGabarito.classList.add("animated","slideInUp");
			}, 10);
            

        }else{
			console.log("desce a tela");
			
			setTimeout(function(){
				telaGabarito.style.height = 0 + "vh";
            	//telaGabarito.classList.add("animated","slideInDown");
			}, 10);
			

			/*
			setTimeout(function(){
				telaGabarito.style.height = 0 + "vh";
			}, 1000);
*/
        }
        

       /* document.getElementById("pauseModal").style.display = "none";

		TaCerto.Controladora.CarregarPagina.htmlCorpo("jogo", ["hardcore"], ["JogoTipo"]);
		//document.getElementsByClassName("second")[0].style.animation = "timeRev 60s infinite linear";
		var alturaDaParede = document.getElementById("parede");
		var intervaloParede = setInterval(
			function(){
				
				if(!document.getElementById("parede")){
					clearInterval(intervaloParede);
					clearInterval(intervaloParede);
					TaCerto.Controladora.Jogo.Geral.fimDeJogo();
				}else if (!TaCerto.Controladora.Jogo.Geral.gameModel.paused && !TaCerto.Controladora.Jogo.Geral.gameModel.frozen){
					TaCerto.Controladora.Jogo.HardCore.gameModel.alturaAtual += TaCerto.Controladora.Jogo.HardCore.gameModel.speed;
					if(TaCerto.Controladora.Jogo.HardCore.gameModel.alturaAtual > 72)
						TaCerto.Controladora.Jogo.HardCore.gameModel.alturaAtual = 72;
					alturaDaParede.style.height = TaCerto.Controladora.Jogo.HardCore.gameModel.alturaAtual + "vh";
				}
			}, 1000);*/
	},
	loadDesafio: function () {
		/*var desafioNum = TaCerto.Controladora.Jogo.Geral.gameModel.desafioNum = 300;//ORIGINAL: 15
		var shuffledDesafio = this.shuffleDesafio();

		for (var i = 0; i < desafioNum; i++)
			this.DESAFIO[i] = shuffledDesafio[i];
		document.getElementById('palavra').innerHTML = TaCerto.Controladora.Jogo.HardCore.DESAFIO[TaCerto.Controladora.Jogo.HardCore.DESAFIO.length - 1].palavra;
		document.getElementById('significado').innerHTML = TaCerto.Controladora.Jogo.HardCore.DESAFIO[TaCerto.Controladora.Jogo.HardCore.DESAFIO.length - 1].significado;
    */
    }	
};
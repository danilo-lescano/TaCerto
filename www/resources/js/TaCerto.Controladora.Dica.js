var TaCerto = TaCerto || {};
TaCerto.Controladora = TaCerto.Controladora || {};
TaCerto.Controladora.Dica = {
    gameModel: {
        openned: false,
    },
    open: function () {
        console.log("oi");
		var telaDica = document.getElementById("dicaScreen");
		var dicaBotao = document.getElementById("dicaBotao");
		
		this.gameModel.openned = !this.gameModel.openned;
		
		if(this.gameModel.openned){
            console.log("levanta a tela");
            setTimeout(function(){
				telaDica.style.height = 90 + "vh";
				dicaBotao.style.height = 97 + "vh";
			}, 10);  

        }else{
			console.log("desce a tela");
			
			setTimeout(function(){
				telaDica.style.height = 0 + "vh";
				dicaBotao.style.height = 5 + "vh";
			}, 10);
			
        }
		
		this.carregaDicas();
	},
	carregaDicas: function () {
		console.log("carregar frases erradas aqui");
    },
	apagarDica: function (elemento) {

		var pai = elemento.parentNode.parentNode;

		//elemento.parentNode.removeChild(elemento);
		elemento.onclick = undefined;
		pai.classList.add("animated","fadeOut");

		setTimeout( function(){
			pai.parentNode.removeChild(pai);
		}, 1000);
    }	
};
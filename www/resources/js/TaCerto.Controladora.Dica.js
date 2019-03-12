var TaCerto = TaCerto || {};
TaCerto.Controladora = TaCerto.Controladora || {};
TaCerto.Controladora.Dica = {
    gameModel: {
		openned: false,
		carregado: false,
    },
    open: function () {
		
		this.checaVazio();
		
		var telaDica = document.getElementById("dica");
		
		this.gameModel.openned = !this.gameModel.openned;
		
		if(this.gameModel.openned)
            requestAnimationFrame(()=> {
				telaDica.style.height = "calc(11vw + 90vh)";
				telaDica.style.zIndex = 3;
			});  
        else
			requestAnimationFrame(()=> {
				telaDica.style.height = "11vw";
				setTimeout(()=>{
					telaDica.style.zIndex = 1;
				}, 1000);
			});  
	},
	carregaDicas: function () {
		this.gameModel.carregado = true;
		var tabelaDicas = document.getElementById('telaDica');

		//Apaga todos os filhos
		while(tabelaDicas.firstChild)
			tabelaDicas.removeChild(tabelaDicas.firstChild);

		//Add o header e o li de mensagem
		tabelaDicas.innerHTML += '<li id="telaDicaMsg"></li>';

		// Add as dicas
		for(var i = 0, l = TaCerto.Estrutura.Jogador.dicas.length; i < l; i++){
			tabelaDicas.innerHTML += '<li class="collection-item"><div>'+TaCerto.Estrutura.Jogador.dicas[i].dica+'<a id="'+TaCerto.Estrutura.Jogador.dicas[i].id+'" onclick="TaCerto.Controladora.Dica.apagarDica(this)" class="secondary-content"><img class="clearIcon" src="resources/media/image/clear.png" alt="clear icon"></a></div></li>';
		}
		
    },
	apagarDica: function (elemento) {

		var pai = elemento.parentNode.parentNode;

		var list = TaCerto.Estrutura.Jogador.dicas;

		var elementClickedId = elemento.id;

		elementClickedId = parseInt(elementClickedId);
		
		// Procura e apaga a dica do array
		for(var i = list.length; i--;){
			if(list[i].id === elementClickedId){
				list.splice(i, 1);
				TaCerto.Estrutura.Jogador.numDicas--;
			}
		}

		//elemento.parentNode.removeChild(elemento);
		elemento.onclick = undefined;
		pai.classList.add("animated","fadeOut");

		console.log(pai.parentNode.children.length);
		setTimeout( function(){
			try{
				if(pai.parentNode.children.length == 2){
					// Não tem nenhum dica
					var teladicaMsg = document.getElementById('telaDicaMsg');
					teladicaMsg.innerHTML += '<h5>Você é muito bom! <br>Não precisa de dicas.</h5>';
					teladicaMsg.classList.add("animated", "fadeIn");
				}else{
					// Tem alguma dica
				}
				pai.parentNode.removeChild(pai);
			}catch(err){
				console.log("Erro checando se não tem dicas.");
			}	
		}, 1000);

	},
	checaVazio: function () {
		
		if(TaCerto.Estrutura.Jogador.dicas.length > 0)
			this.carregaDicas();
		else{
			var tabelaDicas = document.getElementById('telaDica'); 
			if(tabelaDicas.children.length == 1){
				var teladicaMsg = document.getElementById('telaDicaMsg');
				teladicaMsg.innerHTML = '<h5>Você é muito bom! <br>Não precisa de dicas.</h5>';
				teladicaMsg.classList.add("animated", "fadeIn");
			}
		}
		
	},
	colocaDica: function (idDica, _dica){
		//console.log(TaCerto.Estrutura.Jogador.numDicas + "----" + idDica + " = " + _dica);
	
		var list = TaCerto.Estrutura.Jogador.dicas;
		var isThere = false;
		// Procura e apaga a dica do array
		for(var i = 0, l = list; i < l && !isThere; i++){
			//String.prototype.equals
			if(list[i].id === parseInt(idDica))
				console.log("Vc já tá aqui, irmão");
		}

		if(!isThere){
			TaCerto.Estrutura.Jogador.dicas.push({id: idDica, dica: _dica});
			TaCerto.Estrutura.Jogador.numDicas++;
		}			
	}	
};
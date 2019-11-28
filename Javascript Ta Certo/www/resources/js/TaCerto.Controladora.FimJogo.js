var TaCerto = TaCerto || {};
TaCerto.Controladora = TaCerto.Controladora || {};
TaCerto.Controladora.FimJogo = {
	model:{
		tipo: undefined,
		missaoId: undefined,
		tamanho: undefined,
	},
	zerarVars: function(){
		this.model.tipo = undefined;
		this.model.missaoId = undefined;
		this.model.tamanho = undefined;
	},
	btnHome: function(el){
		TaCerto.GenFunc.pressClick(el, ()=>{
			TaCerto.Controladora.MenuInicial.load();
			this.zerarVars();
		});
	},
	btnCasual: function(el){
		TaCerto.GenFunc.pressClick(el, ()=>{
			TaCerto.Controladora.MenuCasual.load();
			this.zerarVars();
		});
	},
	btnMissao: function(el){
		TaCerto.GenFunc.pressClick(el, ()=>{
			TaCerto.Controladora.MenuMissao.load();
			this.zerarVars();
		});
	},
	btnReiniciar: function(el){
		TaCerto.GenFunc.pressClick(el,() => {
			tipo = this.model.tipo;
			missaoId = this.model.missaoId;
			tamanho = this.model.tamanho;

			this.zerarVars();
			TaCerto.Controladora.Jogo.Load(tipo, missaoId, tamanho);
		});
	},

	displayMission: function(){
		var missoesConquistadas;

		if (this.missao !== undefined) {
			var missaoNum = this.missao;
			var missoesConquistadas = TaCerto.Estrutura.Jogador.missoes[missaoNum];
		}
	},
	start: function(){
		this.model.tipo = TaCerto.Controladora.Jogo.Geral.gameModel.tipoDeJogo;
		this.model.missaoId = TaCerto.Controladora.Jogo.Geral.gameModel.missaoId;
		this.model.tamanho = TaCerto.Controladora.Jogo.Geral.gameModel.tamanho;
		var flagMissaoAcertos = -1;
		var auxAcerto = TaCerto.Controladora.Jogo.Geral.gameModel.acerto;
		var auxErro = TaCerto.Controladora.Jogo.Geral.gameModel.erro;
		var auxMoeda = TaCerto.Controladora.Jogo.Geral.gameModel.moeda;
		var auxTempo = TaCerto.Controladora.Jogo.Geral.gameModel.tempo;

		if(!isNaN(TaCerto.Controladora.Jogo.Missao.parametros.missao)){
			var missNum = TaCerto.Controladora.Jogo.Missao.parametros.missao;
			TaCerto.Controladora.Jogo.Missao.parametros.fimDeJogo = true;
			TaCerto.Controladora.Jogo.Missao.checkObjetivo();
			flagMissaoAcertos = TaCerto.Estrutura.Jogador.missoes[missNum][0] ? 1 : 0;
			flagMissaoAcertos += TaCerto.Estrutura.Jogador.missoes[missNum][1] ? 1 : 0;
			flagMissaoAcertos += TaCerto.Estrutura.Jogador.missoes[missNum][2] ? 1 : 0;
		}

		setTimeout(() => {
			TaCerto.Controladora.CarregarPagina.htmlCorpo('fimDeJogo',["dica"],["dica"]);

			document.getElementById("showAcerto").innerHTML = document.getElementById("showAcertoE").innerHTML = "Acertos:\t" + auxAcerto;
			document.getElementById("showErro").innerHTML = document.getElementById("showErroE").innerHTML = "Erros:\t" + auxErro;
			document.getElementById("showMoeda").innerHTML = document.getElementById("showMoedaE").innerHTML = "Moedas:\t" + auxMoeda;
			document.getElementById("showTempo").innerHTML = document.getElementById("showTempoE").innerHTML = "Segundos:\t" + auxTempo;

			setTimeout(function(){//precisa do timeout se n ele n ativa o transform dele
				document.getElementsByClassName("wrapperestrela")[0].style.height = flagMissaoAcertos ? (flagMissaoAcertos/3)*100 + "%" : "0px";
			}, 10);

			var displyModal = flagMissaoAcertos === -1 ? 'fimjogonormal' : 'fimjogoestrela';
			var hiddeModal = flagMissaoAcertos === -1 ? 'fimjogoestrela' : 'fimjogonormal';
			hiddeModal = document.getElementById(hiddeModal);
			hiddeModal.style.display = "none";
			displyModal = document.getElementById(displyModal);
			displyModal.classList.add("flipInY");

			if(flagMissaoAcertos >= 0){
				var el = document.getElementsByClassName("fimPontoE")[1];
				var html;
				var mis = TaCerto.Estrutura.Fase[this.model.missaoId];
				var misJogadorFlag = TaCerto.Estrutura.Jogador.missoes[this.model.missaoId];

				html =
				"<div class='tpFimJogo'>" + mis.tipo + "</div>" +
				'<div class="piramideWrapper">'+
					'<div class="piramideWrapper2">'+
						'<div class="piramide">'+
							'<div class="facePiramide facePiramide-frente">'+
								'<img src="resources/media/image/' + (misJogadorFlag[0] ? '' : 'un') + 'checkedbox.png">'+
								'<div class="piramideText">' + mis.descricaoObjetivos[0] + '</div>' +
							'</div>'+
							'<div class="facePiramide facePiramide-topo">'+
								'<img src="resources/media/image/' + (misJogadorFlag[1] ? '' : 'un') + 'checkedbox.png">'+
								'<div class="piramideText">' + mis.descricaoObjetivos[1] + '</div>' +
							'</div>'+
							'<div class="facePiramide facePiramide-baixo">'+
								'<img src="resources/media/image/' + (misJogadorFlag[2] ? '' : 'un') + 'checkedbox.png">'+
								'<div class="piramideText">' + mis.descricaoObjetivos[2] + '</div>' +
							'</div>'+
						'</div>'+
					'</div>'+
					'<div class="coverPiramide"></div>'+
				'</div>';

				el.innerHTML = html;
			}

		}, 100);

	}
};
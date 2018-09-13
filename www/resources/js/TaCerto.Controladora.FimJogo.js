var TaCerto = TaCerto || {};
TaCerto.Controladora = TaCerto.Controladora || {};
TaCerto.Controladora.FimJogo = {
	model:{
		tipoDeJogo: undefined,
		missao: undefined,

	},
	zerarVars: function(){
		TaCerto.Controladora.FimJogo.tipoDeJogo = undefined;
		TaCerto.Controladora.FimJogo.missao = undefined;
	},
	btnHome: function(el){
		TaCerto.GenFunc.pressClick(el,function(){
			TaCerto.Controladora.CarregarPagina.htmlCorpo('menuInicial');
			TaCerto.Controladora.FimJogo.zerarVars();
		});
	},
	btnCasual: function(el){
		TaCerto.GenFunc.pressClick(el,function(){
			TaCerto.Controladora.MenuCasual.load();
			TaCerto.Controladora.FimJogo.zerarVars();
		});
	},
	btnMissao: function(el){
		TaCerto.GenFunc.pressClick(el,function(){
			TaCerto.Controladora.MenuMissao.load();
			TaCerto.Controladora.FimJogo.zerarVars();
		});
	},
	btnReiniciar: function(el){
		TaCerto.GenFunc.pressClick(el,function(){
			TaCerto.Controladora.Jogo.Load(TaCerto.Controladora.FimJogo.model.tipoDeJogo, TaCerto.Controladora.FimJogo.model.missao);
			TaCerto.Controladora.FimJogo.zerarVars();
		});
	},


	displayMission: function(){
		var missoesConquistadas;

		if (TaCerto.Controladora.FimJogo.missao !== undefined) {
			var missaoNum = TaCerto.Controladora.FimJogo.missao;
			var missoesConquistadas = TaCerto.Estrutura.Jogador.missoes[missaoNum];

		}
	},
	start: function(){
		TaCerto.Controladora.FimJogo.model.tipoDeJogo = TaCerto.Controladora.Jogo.Geral.gameModel.tipoDeJogo;
		TaCerto.Controladora.FimJogo.model.missao = TaCerto.Controladora.Jogo.Missao.parametros.missao;
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



		setTimeout(function(){
			TaCerto.Controladora.CarregarPagina.htmlCorpo('fimDeJogo');

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

			if(flagMissaoAcertos){
				var el = document.getElementsByClassName("fimPontoE")[1];
				var html;
				var mis = TaCerto.Estrutura.Fase[TaCerto.Controladora.FimJogo.model.missao];
				var misJogadorFlag = TaCerto.Estrutura.Jogador.missoes[TaCerto.Controladora.FimJogo.model.missao];

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
/*
				"<div class='missaoFJWrapper'>"+
					"<div class='missaoPiramide'>"+
						"<div class='missCard'>"+
							"<div class='missCardImg'>"+
								"<img src='resources/media/image/" + (misJogadorFlag[0] ? "" : "un")+ "checkedbox.png'>"+
							"</div>"+
							"<div class='missCardtxt'>" + mis.descricaoObjetivos[0] + "</div>"+
						"</div>"+
						"<div class='missCard'>"+
							"<div class='missCardImg'>"+
								"<img src='resources/media/image/" + (misJogadorFlag[1] ? "" : "un")+ "checkedbox.png'>"+
							"</div>"+
							"<div class='missCardtxt'>" + mis.descricaoObjetivos[1] + "</div>"+
						"</div>"+
						"<div class='missCard'>"+
							"<div class='missCardImg'>"+
								"<img src='resources/media/image/" + (misJogadorFlag[2] ? "" : "un")+ "checkedbox.png'>"+
							"</div>"+
							"<div class='missCardtxt'>" + mis.descricaoObjetivos[2] + "</div>"+
						"</div>"+
					"</div>"+
				"</div>";
*/
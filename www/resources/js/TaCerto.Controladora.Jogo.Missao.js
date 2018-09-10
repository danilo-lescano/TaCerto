var TaCerto = TaCerto || {};
TaCerto.Controladora = TaCerto.Controladora || {};
TaCerto.Controladora.Jogo = TaCerto.Controladora.Jogo || {};
TaCerto.Controladora.Jogo.Missao = {
	parametros: {
		acerto: 0,
		acertoConsecutivo: 0,
		maxAcertoConsecutivo: 0,
		erro: 0,
		erroConsecutivo: 0,
		maxErroConsecutivo: 0,

		moeda: 0,

		tempoDoAcerto: [],
		tempoDoErro: [],

		cartaUsada: {
			cartaAzul: 0,
			cartaVerde: 0,
			cartaAmarela: 0,
			cartaVermelha: 0,
		},

		fimDeJogo: false,

		missao: undefined,
		flagObjetivo: [false, false, false],
		/*tipo: '',
		acertoMinimo: 0,
		acertoMinimoConsecutivo: 0,
		erroMaximo: 0,
		erroMaximoConsecutivo: 0,
		acertoXtempo: {
			xAcerto: 0,
			xSegundo: 0
		},
		maxCartaUsada: {
			azul: 0,
			vermelho: 0,
			amarelo: 0,
			verde: 0
		},*/
	},

	zerarVars: function(){
		TaCerto.Controladora.Jogo.Missao.parametros.acerto = 0;
		TaCerto.Controladora.Jogo.Missao.parametros.acertoConsecutivo = 0;
		TaCerto.Controladora.Jogo.Missao.parametros.maxAcertoConsecutivo = 0;
		TaCerto.Controladora.Jogo.Missao.parametros.erro = 0;
		TaCerto.Controladora.Jogo.Missao.parametros.erroConsecutivo = 0;
		TaCerto.Controladora.Jogo.Missao.parametros.maxErroConsecutivo = 0;

		TaCerto.Controladora.Jogo.Missao.parametros.moeda = 0;

		TaCerto.Controladora.Jogo.Missao.parametros.tempoDoAcerto = [];
		TaCerto.Controladora.Jogo.Missao.parametros.tempoDoErro = [];

		TaCerto.Controladora.Jogo.Missao.parametros.cartaUsada.cartaAzul = 0;
		TaCerto.Controladora.Jogo.Missao.parametros.cartaUsada.cartaVermelha = 0;
		TaCerto.Controladora.Jogo.Missao.parametros.cartaUsada.cartaAmarela = 0;
		TaCerto.Controladora.Jogo.Missao.parametros.cartaUsada.cartaVerde = 0;

		TaCerto.Controladora.Jogo.Missao.parametros.fimDeJogo = false;

		TaCerto.Controladora.Jogo.Missao.parametros.missao = undefined;
		TaCerto.Controladora.Jogo.Missao.parametros.flagObjetivo[0] = false;
		TaCerto.Controladora.Jogo.Missao.parametros.flagObjetivo[1] = false;
		TaCerto.Controladora.Jogo.Missao.parametros.flagObjetivo[2] = false;
		/*TaCerto.Controladora.Jogo.Missao.parametros.tipo = '';
		TaCerto.Controladora.Jogo.Missao.parametros.acertoMinimo = 0;
		TaCerto.Controladora.Jogo.Missao.parametros.acertoMinimoConsecutivo = 0;
		TaCerto.Controladora.Jogo.Missao.parametros.erroMaximo = 0;
		TaCerto.Controladora.Jogo.Missao.parametros.erroMaximoConsecutivo = 0;
		TaCerto.Controladora.Jogo.Missao.parametros.acertoXtempo.xAcerto = 0;
		TaCerto.Controladora.Jogo.Missao.parametros.acertoXtempo.xSegundo = 0;
		TaCerto.Controladora.Jogo.Missao.parametros.maxCartaUsada.azul = 0;
		TaCerto.Controladora.Jogo.Missao.parametros.maxCartaUsada.vermelho = 0;
		TaCerto.Controladora.Jogo.Missao.parametros.maxCartaUsada.amarelo = 0;
		TaCerto.Controladora.Jogo.Missao.parametros.maxCartaUsada.verde = 0;*/
	},

	objetivo: {
		acertoConsecutivo: function(objetivo){
			var param = TaCerto.Estrutura.Fase[TaCerto.Controladora.Jogo.Missao.parametros.missao].param[objetivo];
			if(TaCerto.Controladora.Jogo.Missao.parametros.maxAcertoConsecutivo >= param.maxAcertoConsecutivo)
				return true;
			return false
		},
		acertoXtempo: function(objetivo){
			var param = TaCerto.Estrutura.Fase[TaCerto.Controladora.Jogo.Missao.parametros.missao].param[objetivo];
			var tempoDoAcerto = TaCerto.Controladora.Jogo.Missao.parametros.tempoDoAcerto;
			for (var i = 0; i < tempoDoAcerto.length; i++) {
				var acerto = 1;
				for (var j = i+1; j < tempoDoAcerto.length; j++)
					if((tempoDoAcerto[j] - tempoDoAcerto[i]) <= param.acertoXtempo[1])
						if(++acerto >= param.acertoXtempo[0])
							return true;
			}
			return false;
		},
		acertoTotal: function(objetivo){
			var param = TaCerto.Estrutura.Fase[TaCerto.Controladora.Jogo.Missao.parametros.missao].param[objetivo];	
			if (TaCerto.Controladora.Jogo.Missao.parametros.acerto >= param.acertoTotal)
				return true;
			return false;
		},
		erroConsecutivo: function(objetivo){
			var param = TaCerto.Estrutura.Fase[TaCerto.Controladora.Jogo.Missao.parametros.missao].param[objetivo];
			if (TaCerto.Controladora.Jogo.Missao.parametros.fimDeJogo && TaCerto.Controladora.Jogo.Missao.parametros.maxErroConsecutivo <= param.maxErroConsecutivo)
				return true;
			return false;
		},
		usarMinimoCarta: function(objetivo){
			var param = TaCerto.Estrutura.Fase[TaCerto.Controladora.Jogo.Missao.parametros.missao].param[objetivo];
			console.log(param);
			console.log(TaCerto.Controladora.Jogo.Missao.parametros.cartaUsada);

			if (TaCerto.Controladora.Jogo.Missao.parametros.cartaUsada.cartaAzul >= param.cartaUsada.azul &&
				TaCerto.Controladora.Jogo.Missao.parametros.cartaUsada.cartaVerde >= param.cartaUsada.verde &&
				TaCerto.Controladora.Jogo.Missao.parametros.cartaUsada.cartaAmarela >= param.cartaUsada.amarelo &&
				TaCerto.Controladora.Jogo.Missao.parametros.cartaUsada.cartaVermelha >= param.cartaUsada.vermelho)
				return true;

			return false;
		},
		usarExatamenteCarta: function(objetivo){
			var param = TaCerto.Estrutura.Fase[TaCerto.Controladora.Jogo.Missao.parametros.missao].param[objetivo];
			if (TaCerto.Controladora.Jogo.Missao.parametros.fimDeJogo &&
				TaCerto.Controladora.Jogo.Missao.parametros.cartaUsada.cartaAzul === param.cartaUsada.azul &&
				TaCerto.Controladora.Jogo.Missao.parametros.cartaUsada.cartaVerde === param.cartaUsada.verde &&
				TaCerto.Controladora.Jogo.Missao.parametros.cartaUsada.cartaAmarela === param.cartaUsada.amarelo &&
				TaCerto.Controladora.Jogo.Missao.parametros.cartaUsada.cartaVermelha === param.cartaUsada.vermelho)
				return true;
			return false;
		},
		acertoXerro: function(objetivo){
			var param = TaCerto.Estrutura.Fase[TaCerto.Controladora.Jogo.Missao.parametros.missao].param[objetivo];
			if (TaCerto.Controladora.Jogo.Missao.parametros.acerto >= param.acerto &&
				TaCerto.Controladora.Jogo.Missao.parametros.erro <= param.erro &&
				TaCerto.Controladora.Jogo.Missao.parametros.fimDeJogo)
				return true;
			return false;
		},
		moedasMinimas: function(objetivo){
			var param = TaCerto.Estrutura.Fase[TaCerto.Controladora.Jogo.Missao.parametros.missao].param[objetivo];
			if (TaCerto.Controladora.Jogo.Missao.parametros.moeda >= param.moeda)
				return true;
			return false;
		},
		tempoMaximo: function(objetivo){
			var param = TaCerto.Estrutura.Fase[TaCerto.Controladora.Jogo.Missao.parametros.missao].param[objetivo];
			if(TaCerto.Controladora.Jogo.Missao.parametros.fimDeJogo && TaCerto.Controladora.Jogo.Geral.gameModel.tempo <= param.tempoMaximo)
				return true;
			return false;
		},
		terminarFase: function(objetivo){
			if (TaCerto.Controladora.Jogo.Missao.parametros.fimDeJogo)
				return true;
			return false;
		},
	},
	trocarBtn: function(){

	},
	checkObjetivo: function(){
		function atualizarVars(){
			if(TaCerto.Controladora.Jogo.Missao.parametros.acerto < TaCerto.Controladora.Jogo.Geral.gameModel.acerto){
				TaCerto.Controladora.Jogo.Missao.parametros.acerto++;
				if(++TaCerto.Controladora.Jogo.Missao.parametros.acertoConsecutivo > TaCerto.Controladora.Jogo.Missao.parametros.maxAcertoConsecutivo) TaCerto.Controladora.Jogo.Missao.parametros.maxAcertoConsecutivo++;
				TaCerto.Controladora.Jogo.Missao.parametros.tempoDoAcerto[TaCerto.Controladora.Jogo.Missao.parametros.tempoDoAcerto.length] = Date.now();

				TaCerto.Controladora.Jogo.Missao.parametros.moeda = TaCerto.Controladora.Jogo.Geral.gameModel.moeda;

				TaCerto.Controladora.Jogo.Missao.parametros.erroConsecutivo = 0;
			}
			else{
				TaCerto.Controladora.Jogo.Missao.parametros.erro++;
				if(++TaCerto.Controladora.Jogo.Missao.parametros.erroConsecutivo > TaCerto.Controladora.Jogo.Missao.parametros.maxErroConsecutivo) TaCerto.Controladora.Jogo.Missao.parametros.maxErroConsecutivo++;
				TaCerto.Controladora.Jogo.Missao.parametros.tempoDoErro[TaCerto.Controladora.Jogo.Missao.parametros.tempoDoErro.length] = Date.now();

				TaCerto.Controladora.Jogo.Missao.parametros.acertoConsecutivo = 0;
			}

			TaCerto.Controladora.Jogo.Missao.parametros.cartaUsada = TaCerto.Controladora.Jogo.Geral.gameModel.cartaUsada;
		} if(!TaCerto.Controladora.Jogo.Missao.parametros.fimDeJogo) atualizarVars();

		var fase = isNaN(TaCerto.Controladora.Jogo.Missao.parametros.missao) ? [] : TaCerto.Estrutura.Fase[TaCerto.Controladora.Jogo.Missao.parametros.missao].funcObjetivos;
		for (var i = 0; i < fase.length; i++){
			if(!TaCerto.Controladora.Jogo.Missao.parametros.flagObjetivo[i]){
				var flag = TaCerto.Controladora.Jogo.Missao.objetivo[fase[i]](i);
				if (!TaCerto.Estrutura.Jogador.missoes[TaCerto.Controladora.Jogo.Missao.parametros.missao][i] && flag){
					TaCerto.Controladora.Jogo.Missao.parametros.flagObjetivo[i] = true;
					TaCerto.Estrutura.Jogador.xp += 100;
					TaCerto.Estrutura.Jogador.missoes[TaCerto.Controladora.Jogo.Missao.parametros.missao][i] = TaCerto.Estrutura.Jogador.missoes[TaCerto.Controladora.Jogo.Missao.parametros.missao][i] ? true : flag;
				}
			}
		}
		if(TaCerto.Controladora.Jogo.Missao.parametros.fimDeJogo) TaCerto.Controladora.Jogo.Missao.zerarVars();
	},
	start: function(nivelMissao){
		TaCerto.Controladora.Jogo.Geral.zerarVars();

		TaCerto.Controladora.Jogo.Missao.parametros.missao = nivelMissao;

		TaCerto.Controladora.Jogo.Missao.trocarBtn();
	},
};
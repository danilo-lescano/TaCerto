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
	},

	zerarVars: function(){
		this.parametros.acerto = 0;
		this.parametros.acertoConsecutivo = 0;
		this.maxAcertoConsecutivo = 0;
		this.erro = 0;
		this.erroConsecutivo = 0;
		this.maxErroConsecutivo = 0;

		this.parametros.moeda = 0;

		this.parametros.tempoDoAcerto = [];
		this.parametros.tempoDoErro = [];

		this.parametros.cartaUsada.cartaAzul = 0;
		this.parametros.cartaUsada.cartaVermelha = 0;
		this.parametros.cartaUsada.cartaAmarela = 0;
		this.parametros.cartaUsada.cartaVerde = 0;

		this.parametros.fimDeJogo = false;

		this.parametros.missao = undefined;
		this.parametros.flagObjetivo[0] = false;
		this.parametros.flagObjetivo[1] = false;
		this.parametros.flagObjetivo[2] = false;
	},

	objetivo: function(nome, objetivo){

		var acertoConsecutivo = (objetivo) => {
			var param = TaCerto.Estrutura.Fase[this.parametros.missao].param[objetivo];
			if(this.parametros.maxAcertoConsecutivo >= param.maxAcertoConsecutivo)
				return true;
			return false
		}; if(nome === "acertoConsecutivo") return acertoConsecutivo(objetivo);
		var acertoXtempo = (objetivo) => {
			var param = TaCerto.Estrutura.Fase[this.parametros.missao].param[objetivo];
			var tempoDoAcerto = this.parametros.tempoDoAcerto;
			for (var i = 0; i < tempoDoAcerto.length; i++) {
				var acerto = 1;
				for (var j = i+1; j < tempoDoAcerto.length; j++)
					if((tempoDoAcerto[j] - tempoDoAcerto[i]) <= param.acertoXtempo[1])
						if(++acerto >= param.acertoXtempo[0])
							return true;
			}
			return false;
		}; if(nome === "acertoXtempo") return acertoXtempo(objetivo);
		var acertoTotal = (objetivo) => {
			var param = TaCerto.Estrutura.Fase[this.parametros.missao].param[objetivo];	
			if (this.parametros.acerto >= param.acertoTotal)
				return true;
			return false;
		}; if(nome === "acertoTotal") return acertoTotal(objetivo);
		var erroConsecutivo = (objetivo) => {
			var param = TaCerto.Estrutura.Fase[this.parametros.missao].param[objetivo];
			if (this.parametros.fimDeJogo && this.parametros.maxErroConsecutivo <= param.maxErroConsecutivo)
				return true;
			return false;
		}; if(nome === "erroConsecutivo") return erroConsecutivo(objetivo);
		var usarMinimoCarta = (objetivo) => {
			var param = TaCerto.Estrutura.Fase[this.parametros.missao].param[objetivo];
			console.log(param);
			console.log(this.parametros.cartaUsada);

			if (this.parametros.cartaUsada.cartaAzul >= param.cartaUsada.azul &&
				this.parametros.cartaUsada.cartaVerde >= param.cartaUsada.verde &&
				this.parametros.cartaUsada.cartaAmarela >= param.cartaUsada.amarelo &&
				this.parametros.cartaUsada.cartaVermelha >= param.cartaUsada.vermelho)
				return true;

			return false;
		}; if(nome === "usarMinimoCarta") return usarMinimoCarta(objetivo);
		var usarExatamenteCarta = (objetivo) => {
			var param = TaCerto.Estrutura.Fase[this.parametros.missao].param[objetivo];
			if (this.parametros.fimDeJogo &&
				this.parametros.cartaUsada.cartaAzul === param.cartaUsada.azul &&
				this.parametros.cartaUsada.cartaVerde === param.cartaUsada.verde &&
				this.parametros.cartaUsada.cartaAmarela === param.cartaUsada.amarelo &&
				this.parametros.cartaUsada.cartaVermelha === param.cartaUsada.vermelho)
				return true;
			return false;
		}; if(nome === "usarExatamenteCarta") return usarExatamenteCarta(objetivo);
		var acertoXerro = (objetivo) => {
			var param = TaCerto.Estrutura.Fase[this.parametros.missao].param[objetivo];
			if (this.parametros.acerto >= param.acerto &&
				this.parametros.erro <= param.erro &&
				this.parametros.fimDeJogo)
				return true;
			return false;
		}; if(nome === "acertoXerro") return acertoXerro(objetivo);
		var moedasMinimas = (objetivo) => {
			var param = TaCerto.Estrutura.Fase[this.parametros.missao].param[objetivo];
			if (this.parametros.moeda >= param.moeda)
				return true;
			return false;
		}; if(nome === "moedasMinimas") return moedasMinimas(objetivo);
		var tempoMaximo = (objetivo) => {
			var param = TaCerto.Estrutura.Fase[this.parametros.missao].param[objetivo];
			if(this.parametros.fimDeJogo && TaCerto.Controladora.Jogo.Geral.gameModel.tempo <= param.tempoMaximo)
				return true;
			return false;
		}; if(nome === "tempoMaximo") return tempoMaximo(objetivo);
		var terminarFase = (objetivo) => {
			if (this.parametros.fimDeJogo)
				return true;
			return false;
		}; if(nome === "terminarFase") return terminarFase(objetivo);
	},
	
	checkObjetivo: function(){
		var atualizarVars = () => {
			if(this.parametros.acerto < TaCerto.Controladora.Jogo.Geral.gameModel.acerto){
				this.parametros.acerto++;
				if(++this.parametros.acertoConsecutivo > this.parametros.maxAcertoConsecutivo) this.parametros.maxAcertoConsecutivo++;
				this.parametros.tempoDoAcerto[this.parametros.tempoDoAcerto.length] = Date.now();

				this.parametros.moeda = TaCerto.Controladora.Jogo.Geral.gameModel.moeda;

				this.parametros.erroConsecutivo = 0;
			}
			else{
				this.parametros.erro++;
				if(++this.parametros.erroConsecutivo > this.parametros.maxErroConsecutivo) this.parametros.maxErroConsecutivo++;
				this.parametros.tempoDoErro[this.parametros.tempoDoErro.length] = Date.now();

				this.parametros.acertoConsecutivo = 0;
			}

			this.parametros.cartaUsada = TaCerto.Controladora.Jogo.Geral.gameModel.cartaUsada;
		} 
		
		if(!this.parametros.fimDeJogo)
			atualizarVars();

		var fase = this.parametros.missao !== null && !isNaN(this.parametros.missao) ? TaCerto.Estrutura.Fase[this.parametros.missao].funcObjetivos : [];
		for (var i = 0; i < fase.length; i++){
			if(!this.parametros.flagObjetivo[i]){
				var flag = this.objetivo(fase[i], i);
				if (!TaCerto.Estrutura.Jogador.missoes[this.parametros.missao][i] && flag){
					this.parametros.flagObjetivo[i] = true;
					TaCerto.Estrutura.Jogador.xp += 100;
					TaCerto.Estrutura.Jogador.missoes[this.parametros.missao][i] = TaCerto.Estrutura.Jogador.missoes[this.parametros.missao][i] ? true : flag;
				}
			}
		}
		if(this.parametros.fimDeJogo) this.zerarVars();
	},
	start: function(nivelMissao){
		TaCerto.Controladora.Jogo.Geral.zerarVars();

		this.parametros.missao = nivelMissao;
	},
};
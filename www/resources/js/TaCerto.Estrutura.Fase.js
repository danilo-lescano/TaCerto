var TaCerto = TaCerto || {};
TaCerto.Estrutura = TaCerto.Estrutura || {};
TaCerto.Estrutura.Fase = {
	0: {
		tipo: 'Normal',
		param:{
			0:{
			},
			1:{
				maxAcertoConsecutivo: 5,
			},
			2:{
				acertoXtempo: [5, 20000],
			},
		},
		funcObjetivos: ['terminarFase', 'acertoConsecutivo', 'acertoXtempo'],
		descricaoObjetivos: ['complete a fase até o fim para receber essa conquista','consiga 5 respostas corretas consecutivas','consiga 5 respostas corretas em 20s',],
	},
	1: {
		tipo: 'Lacuna',
		param:{
			0:{
				moeda: 20,
			},
			1:{
				cartaUsada:{
					azul: 0,
					vermelho: 1,
					amarelo: 0,
					verde: 0,
				}
			},
			2:{
				tempoMaximo:60000,
			},
		},
		funcObjetivos: ['moedasMinimas', 'usarMinimoCarta', 'tempoMaximo'],
		descricaoObjetivos: ['consiga 20 moedas ao fim do jogo','pule uma pergunta utilizando a carta vermelha','Termine o jogo com no máximo 60s',],
	},
	2: {
		tipo: 'Aleatorio',
		param:{
			0:{
				acertoTotal: 10,
			},
			1:{
				maxErroConsecutivo:3,
			},
			2:{
				cartaUsada:{
					azul: 1,
					vermelho: 0,
					amarelo: 0,
					verde: 0,
				}
			},
		},
		funcObjetivos: ['acertoTotal', 'erroConsecutivo', 'usarMinimoCarta'],
		descricaoObjetivos: ['consiga 10 respostas corretas no total','não erre mais do que 3 respostas consecutivas','utilize pelo menos uma carta azul',],
	},
	3: {
		tipo: 'Normal',
		param:{
			0:{
				moeda: 20,
			},
			1:{
				maxAcertoConsecutivo: 10,
			},
			2:{
				acertoXtempo: [7, 20000],
			},
		},
		funcObjetivos: ['moedasMinimas', 'acertoConsecutivo', 'acertoXtempo'],
		descricaoObjetivos: ['consiga 20 moedas ao fim do jogo','consiga 10 respostas corretas consecutivas','consiga 7 respostas corretas em 20s',],
	},
	4: {
		tipo: 'Lacuna',
		param:{
			0:{
				moeda: 25,
			},
			1:{
				cartaUsada:{
					azul: 0,
					vermelho: 1,
					amarelo: 0,
					verde: 0,
				}
			},
			2:{
				tempoMaximo:40000,
			},
		},
		funcObjetivos: ['moedasMinimas', 'usarMinimoCarta', 'tempoMaximo'],
		descricaoObjetivos: ['consiga 30 moedas ao fim do jogo','pule uma pergunta utilizando a carta vermelha','Termine o jogo com no máximo 40s',],
	},
	5: {
		tipo: 'Aleatorio',
		param:{
			0:{
				acertoTotal: 10,
			},
			1:{
				maxErroConsecutivo:3,
			},
			2:{
				cartaUsada:{
					azul: 1,
					vermelho: 0,
					amarelo: 0,
					verde: 0,
				}
			},
		},
		funcObjetivos: ['acertoTotal', 'erroConsecutivo', 'usarMinimoCarta'],
		descricaoObjetivos: ['consiga 10 respostas corretas no total','não erre mais do que 3 respostas consecutivas','utilize pelo menos uma carta azul',],
	},
	6: {
		tipo: 'Normal',
		param:{
			0:{
				moeda: 32,
			},
			1:{
				maxAcertoConsecutivo: 12,
			},
			2:{
				acertoXtempo: [10, 20000],
			},
		},
		funcObjetivos: ['moedasMinimas', 'acertoConsecutivo', 'acertoXtempo'],
		descricaoObjetivos: ['consiga 32 moedas ao fim do jogo','consiga 12 respostas corretas consecutivas','consiga 10 respostas corretas em 20s',],
	},
	7: {
		tipo: 'Lacuna',
		param:{
			0:{
				moeda: 32,
			},
			1:{
				acertoTotal: 10,
			},
			2:{
				tempoMaximo:40000,
			},
		},
		funcObjetivos: ['moedasMinimas', 'acertoTotal', 'tempoMaximo'],
		descricaoObjetivos: ['consiga 32 moedas ao fim do jogo','consiga 10 respostas corretas no total','termine o jogo com no máximo 40s',],
	},
	8: {
		tipo: 'Aleatorio',
		param:{
			0:{
				acertoTotal: 13,
			},
			1:{
				maxErroConsecutivo: 3,
			},
			2:{
				moeda: 32,
			},
		},
		funcObjetivos: ['acertoTotal', 'erroConsecutivo', 'moedasMinimas'],
		descricaoObjetivos: ['consiga 13 respostas corretas no total','não erre mais do que 3 respostas consecutivas','consiga 32 moedas ao fim do jogo',],
	},

};
/*
acertoConsecutivo
acertoXtempo
acertoTotal
erroConsecutivo
usarCarta
acertoXerro
moedasMinimas
tempoExato
*/
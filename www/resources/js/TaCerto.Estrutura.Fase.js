var TaCerto = TaCerto || {};
TaCerto.Estrutura = TaCerto.Estrutura || {};
TaCerto.Estrutura.Fase = {
	0: {
		tipo: 'Normal',
		param:{
			0:{
			},
			1:{
				maxAcertoConsecutivo: 3,
			},
			2:{
				acertoXtempo: [5, 20000],
			},
		},
		funcObjetivos: ['terminarFase', 'acertoConsecutivo', 'acertoXtempo'],
		descricaoObjetivos: ['complete a fase até o fim para receber essa conquista','consiga 3 respostas corretas consecutivas','consiga 5 respostas corretas em 20s',],
	},
	1: {
		tipo: 'Lacuna',
		param:{
			0:{
				
//consiga 30 moedas
			},
			1:{

			},
			2:{

			},
		},
		funcObjetivos: ['acertoConsecutivo', 'acertoTotal', 'acertoXtempo'],
		descricaoObjetivos: ['consiga 10 respostas corretas consecutivas','consiga 12 respostas corretas consecutivas','consiga 13 respostas corretas consecutivas',],
	},
	2: {
		tipo: 'Normal',
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
		tipo: 'Lacuna',
		param:{
			0:{

			},
			1:{

			},
			2:{

			},
		},
		funcObjetivos: ['acertoConsecutivo', 'acertoTotal', 'acertoXtempo'],
		descricaoObjetivos: ['consiga 30 respostas corretas consecutivas','consiga 31 respostas corretas consecutivas','consiga 32 respostas corretas consecutivas',],
	},
	4: {
		tipo: 'Normal',
		param:{
			0:{

			},
			1:{

			},
			2:{

			},
		},
		funcObjetivos: ['acertoConsecutivo', 'acertoTotal', 'acertoXtempo'],
		descricaoObjetivos: ['consiga 40 respostas corretas consecutivas','consiga 41 respostas corretas consecutivas','consiga 42 respostas corretas consecutivas',],
	},
	5: {
		tipo: 'Lacuna',
		param:{
			0:{

			},
			1:{

			},
			2:{

			},
		},
		funcObjetivos: ['acertoConsecutivo', 'acertoTotal', 'acertoXtempo'],
		descricaoObjetivos: ['consiga 50 respostas corretas consecutivas','consiga 51 respostas corretas consecutivas','consiga 52 respostas corretas consecutivas',],
	},
	6: {
		tipo: 'Aurelio',
		param:{
			0:{

			},
			1:{

			},
			2:{

			},
		},
		funcObjetivos: ['acertoConsecutivo', 'acertoTotal', 'acertoXtempo'],
		descricaoObjetivos: ['consiga 60 respostas corretas consecutivas','consiga 61 respostas corretas consecutivas','consiga 62 respostas corretas consecutivas',],
	},
	7: {
		tipo: 'Aurelio',
		param:{
			0:{

			},
			1:{

			},
			2:{

			},
		},
		funcObjetivos: ['acertoConsecutivo', 'acertoTotal', 'acertoXtempo'],
		descricaoObjetivos: ['consiga 70 respostas corretas consecutivas','consiga 71 respostas corretas consecutivas','consiga 72 respostas corretas consecutivas',],
	},
	8: {
		tipo: 'Aleatorio',
		param:{
			0:{

			},
			1:{

			},
			2:{

			},
		},
		funcObjetivos: ['acertoConsecutivo', 'acertoTotal', 'acertoXtempo'],
		descricaoObjetivos: ['consiga 80 respostas corretas consecutivas','consiga 81 respostas corretas consecutivas','consiga 82 respostas corretas consecutivas',],
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
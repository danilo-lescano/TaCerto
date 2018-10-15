var TaCerto = TaCerto || {};
TaCerto.Estrutura = TaCerto.Estrutura || {};
TaCerto.Estrutura.Jogador = {
	cartaVermelha: 5,
	cartaVermelhaUsadas: 0,
	cartaVerde: 5,
	cartaVerdeUsadas: 0,
	cartaAmarela: 5,
	cartaAmarelaUsadas: 0,
	cartaAzul: 5,
	cartaAzulUsadas: 0,

	totalAcertos: 0,
	totalEstrelas: 0,
	numDicas: 0,
	moeda: 0,
	xp: 0,

	missoes: {
		0:[false, false, false],
		1:[false, false, false],
		2:[false, false, false],
		3:[false, false, false],
		4:[false, false, false],
		5:[false, false, false],
		6:[false, false, false],
		7:[false, false, false],
		8:[false, false, false],
	},
	conquistas:[
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
		false,
	],

	dicas: [
	]

};
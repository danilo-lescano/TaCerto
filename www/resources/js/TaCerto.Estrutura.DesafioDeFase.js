var TaCerto = TaCerto || {};
TaCerto.Estrutura = TaCerto.Estrutura || {};
TaCerto.Estrutura.DesafioDeFase = {
	normal: [
		{palavra: "Adevogado",		flag: false,	nivel: 0},
		{palavra: "Ambíguo",		flag: true,		nivel: 0},
		{palavra: "Anciosa",		flag: false,	nivel: 0},
		{palavra: "Asterístico",	flag: false,	nivel: 0},

		{palavra: "Beneficiente",	flag: false,	nivel: 0},
		{palavra: "Bicabornato",	flag: false,	nivel: 0},

		{palavra: "Cabeleireiro",	flag: true,		nivel: 0},
		{palavra: "Cadarço",		flag: true,		nivel: 0},
		{palavra: "Cambito",		flag: true,		nivel: 0},
		{palavra: "Cardaço",		flag: false,	nivel: 0},
		{palavra: "Célebro",		flag: false,	nivel: 0},
		{palavra: "Cocrante",		flag: false,	nivel: 0},
		{palavra: "Coincidência",	flag: true,		nivel: 0},
		{palavra: "Compania",		flag: false,	nivel: 0},
		{palavra: "Concerteza",		flag: false,	nivel: 0},
		{palavra: "Conciliar",		flag: true,		nivel: 0},

		{palavra: "Derrepente",		flag: false,	nivel: 0},
		{palavra: "Digladiar",		flag: true,		nivel: 0},

		{palavra: "Empecilho",		flag: true,		nivel: 0},
		{palavra: "Empoderamento",	flag: true,		nivel: 0},
		{palavra: "Entretido",		flag: true,		nivel: 0},
		{palavra: "Enxer",			flag: false,	nivel: 0},
		{palavra: "Excessão",		flag: false,	nivel: 0},

		{palavra: "Filgo",			flag: false,	nivel: 0},
		{palavra: "Frustrado",		flag: true,		nivel: 0},

		{palavra: "Gratuíto",		flag: false,	nivel: 0},
		{palavra: "Guspe",			flag: false,	nivel: 0},

		{palavra: "Hesitar",		flag: true,		nivel: 0},

		{palavra: "Imbigo", 		flag: false,	nivel: 0},
		{palavra: "Intrevista",		flag: false,	nivel: 0},
		{palavra: "Iorgute",		flag: false,	nivel: 0},

		{palavra: "Largata",		flag: false,	nivel: 0},
		{palavra: "Losango",		flag: true,		nivel: 0},

		{palavra: "Madrasta",		flag: true,		nivel: 0},
		{palavra: "Mendigo",		flag: true,		nivel: 0},
		{palavra: "Metereologia",	flag: false,	nivel: 0},
		{palavra: "Mexer",			flag: true,		nivel: 0},
		{palavra: "Milhonário",		flag: false,	nivel: 0},
		{palavra: "Mortadela",		flag: true,		nivel: 0},

		{palavra: "Opnião",			flag: false,	nivel: 0},

		{palavra: "Padrasto",		flag: true,		nivel: 0},
		{palavra: "Pertubar",		flag: false,	nivel: 0},
		{palavra: "Preguiça",		flag: true,		nivel: 0},
		{palavra: "Prevalecer",		flag: true,		nivel: 0},
		{palavra: "Privilégio",		flag: true,		nivel: 0},
		{palavra: "Pobrema",		flag: false,	nivel: 0},
		{palavra: "Poliomielite",	flag: true,		nivel: 0},

		{palavra: "Reinvindicar",	flag: false,	nivel: 0},
		{palavra: "Ritmo",			flag: true,		nivel: 0},

		{palavra: "Salsicha",		flag: true,		nivel: 0},
		{palavra: "Sobrancelha",	flag: true,		nivel: 0},
		{palavra: "Sombrancelha",	flag: false,	nivel: 0},
		{palavra: "Supérfluo",		flag: true,		nivel: 0},

		{palavra: "Trabisseiro",	flag: false,	nivel: 0},
		{palavra: "Travesseiro",	flag: true,		nivel: 0},
		{palavra: "Triologia",		flag: false,	nivel: 0},
		{palavra: "Torácico",		flag: true,		nivel: 0},
	],
	lacuna: [
		{
			resposta: [
				{conteudo: "mais", position: 1},
				{conteudo: "mas", position: -1},
			],
			fraseXlacuna: [
				{frase: true, conteudo: "Eu sou"},
				{frase: false},
				{frase: true, conteudo: "inteligente do que você."},
			],
			nivel: 0,
		},
		{
			resposta: [
				{conteudo: "mais", position: -1},
				{conteudo: "mas", position: 1},
			],
			fraseXlacuna: [
				{frase: true, conteudo: "Você não vale nada,"},
				{frase: false},
				{frase: true, conteudo: "eu gosto de você."},
			],
			nivel: 0,
		},
		{
			resposta: [
				{conteudo: "mas", position: 1},
				{conteudo: "mais", position: -1},
			],
			fraseXlacuna: [
				{frase: true, conteudo: "Você não pediu,"},
				{frase: false},
				{frase: true, conteudo: "eu sou legal."},
			],
			nivel: 0,
		},
		{
			resposta: [
				{conteudo: "mau", position: -1},
				{conteudo: "mal", position: 1},
			],
			fraseXlacuna: [
				{frase: true, conteudo: "Você foi"},
				{frase: false},
				{frase: true, conteudo: "na prova."},
			],
			nivel: 0,
		},
		{
			resposta: [
				{conteudo: "mau!", position: 1},
				{conteudo: "mal!", position: -1},
			],
			fraseXlacuna: [
				{frase: true, conteudo: "Cachorro"},
				{frase: false},
			],
			nivel: 0,
		},
		{
			resposta: [
				{conteudo: "mau", position: -1},
				{conteudo: "mal", position: 1},
			],
			fraseXlacuna: [
				{frase: true, conteudo: "Você é"},
				{frase: false},
				{frase: true, conteudo: "educada."},
			],
			nivel: 0,
		},
		{
			resposta: [
				{conteudo: "mau.", position: 1},
				{conteudo: "mal.", position: -1},
			],
			fraseXlacuna: [
				{frase: true, conteudo: "Aquele gato tem cara de"},
				{frase: false},
			],
			nivel: 0,
		},
		{
			resposta: [
				{conteudo: "seção", position: -1},
				{conteudo: "sessão", position: 1},
				{conteudo: "cessão", position: -1},
			],
			fraseXlacuna: [
				{frase: true, conteudo: "A"},
				{frase: false},
				{frase: true, conteudo: "do cinema deve começar às 15h."},
			],
			nivel: 0,
		},
		{
			resposta: [
				{conteudo: "seção", position: 1},
				{conteudo: "sessão", position: -1},
				{conteudo: "cessão", position: -1},
			],
			fraseXlacuna: [
				{frase: true, conteudo: "A"},
				{frase: false},
				{frase: true, conteudo: "de trocas fica no final do corredor."},
			],
			nivel: 0,
		},
		{
			resposta: [
				{conteudo: "seção", position: -1},
				{conteudo: "sessão", position: -1},
				{conteudo: "cessão", position: 1},
			],
			fraseXlacuna: [
				{frase: true, conteudo: "O juiz determinou a"},
				{frase: false},
				{frase: true, conteudo: "da herança."},
			],
			nivel: 0,
		},
		{
			resposta: [
				{conteudo: "Fazem", position: -1},
				{conteudo: "Faz", position: 0},
				{conteudo: "Há", position: 0},
			],
			fraseXlacuna: [
				{frase: false},
				{frase: true, conteudo: "5 anos que não o vejo."},
			],
			nivel: 0,
		},
		{
			resposta: [
				{conteudo: "Houveram", position: -1},
				{conteudo: "Houve", position: 0},
			],
			fraseXlacuna: [
				{frase: false},
				{frase: true, conteudo: "muitos acidentes"},
			],
			nivel: 0,
		},
		{
			resposta: [
				{conteudo: "a", position: 1},
				{conteudo: "do que", position: -1},
			],
			fraseXlacuna: [
				{frase: true, conteudo: "Eu prefiro café"},
				{frase: false},
				{frase: true, conteudo: "leite."},
			],
			nivel: 0,
		},
		{
			resposta: [
				{conteudo: "Aonde", position: 0},
				{conteudo: "Onde", position: -1},
			],
			fraseXlacuna: [
				{frase: false},
				{frase: true, conteudo: "você vai?"},
			],
			nivel: 0,
		},
		{
			resposta: [
				{conteudo: "Aonde", position: -1},
				{conteudo: "Onde", position: 0},
			],
			fraseXlacuna: [
				{frase: false},
				{frase: true, conteudo: "você mora?"},
			],
			nivel: 0,
		},
		{
			resposta: [
				{conteudo: "há", position: 1},
				{conteudo: "a", position: -1},
				{conteudo: "à", position: -1},
			],
			fraseXlacuna: [
				{frase: true, conteudo: "Eu moro aqui"},
				{frase: false},
				{frase: true, conteudo: "muito tempo."},
			],
			nivel: 0,
		},
		{
			resposta: [
				{conteudo: "há", position: 1},
				{conteudo: "a", position: -1},
				{conteudo: "à", position: -1},
			],
			fraseXlacuna: [
				{frase: true, conteudo: "Jacinta chegou"},
				{frase: false},
				{frase: true, conteudo: "duas horas."},
			],
			nivel: 0,
		},
		{
			resposta: [
				{conteudo: "Vem", position: -1},
				{conteudo: "Vêm", position: 1},
				{conteudo: "Vêem", position: -1},
			],
			fraseXlacuna: [
				{frase: true, conteudo: "Rafael e Lucas"},
				{frase: false},
				{frase: true, conteudo: "aqui sempre"},
			],
			nivel: 0,
		},
		{
			resposta: [
				{conteudo: "Tem", position: -1},
				{conteudo: "Têm", position: 1},
				{conteudo: "Têns", position: 1},
			],
			fraseXlacuna: [
				{frase: true, conteudo: "Joana"},
				{frase: false},
				{frase: true, conteudo: "rinite"},
			],
			nivel: 0,
		},
		{
			resposta: [
				{conteudo: "Mesma", position: 1},
				{conteudo: "Mesmo", position: -1},
			],
			fraseXlacuna: [
				{frase: true, conteudo: "Isabella"},
				{frase: false},
				{frase: true, conteudo: "disse isso."},
			],
			nivel: 0,
		},
		{
			resposta: [
				{conteudo: "Em vez", position: -1},
				{conteudo: "Ao invés", position: 0},
			],
			fraseXlacuna: [
				{frase: false},
				{frase: true, conteudo: "de falar, poderia calar a boca."},
			],
			nivel: 0,
		},
		{
			resposta: [
				{conteudo: "Em vez", position: 0},
				{conteudo: "Ao invés", position: -1},
			],
			fraseXlacuna: [
				{frase: true, conteudo: "Não trabalhe hoje, se está doente."},
				{frase: false},
				{frase: true, conteudo: "disso, vá ao médico."},
			],
			nivel: 0,
		},
		{
			resposta: [
				{conteudo: "viagem", position: 0},
				{conteudo: "viajem", position: -1},
			],
			fraseXlacuna: [
				{frase: true, conteudo: "A"},
				{frase: false},
				{frase: true, conteudo: "de Chihiro é um filme estranho."},
			],
			nivel: 0,
		},
		{
			resposta: [
				{conteudo: "traz", position: 1},
				{conteudo: "trás", position: -1},
			],
			fraseXlacuna: [
				{frase: true, conteudo: "Me"},
				{frase: false},
				{frase: true, conteudo: "uma água."},
			],
			nivel: 0,
		},
		{
			resposta: [
				{conteudo: "traz", position: -1},
				{conteudo: "trás", position: 1},
			],
			fraseXlacuna: [
				{frase: true, conteudo: "Crianças no banco de"},
				{frase: false},
				{frase: true, conteudo: "sempre."},
			],
			nivel: 0,
		},
		{
			resposta: [
				{conteudo: "demais", position: 1},
				{conteudo: "de mais", position: -1},
			],
			fraseXlacuna: [
				{frase: true, conteudo: "O guri gritou"},
				{frase: false},
			],
			nivel: 0,
		},
		{
			resposta: [
				{conteudo: "demais", position: -1},
				{conteudo: "de mais", position: 1},
			],
			fraseXlacuna: [
				{frase: true, conteudo: "Eu tenho dinheiro"},
				{frase: false},
			],
			nivel: 0,
		},
	],

};
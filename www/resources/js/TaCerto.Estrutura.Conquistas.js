var TaCerto = TaCerto || {};
TaCerto.Estrutura = TaCerto.Estrutura || {};
TaCerto.Estrutura.Conquistas = {
	conquistas: {
		// Nome da Consquista, Descrição da Conquista, Money da Conquista, Nome da imagem
		0:["PRIMEIRA ESTRELA", "Obtenha uma estrela completa", 25, "olocomeu", "trofeu-ouro"],
		1:["NomeLegal1", "Obtenha 3 estrelas completas", 75, "olocomeu", "trofeu-ouro"],
		2:["NomeLegal2", "Obtenha 5 estrelas completas", 125, "olocomeu", "trofeu-ouro"],
		3:["NomeLegal3", "Acerte 10 questões no total", 25, "olocomeu", "trofeu-ouro"],
		4:["NomeLegal4", "Acerte 50 questões no total", 100, "olocomeu", "trofeu-ouro"],
		5:["NomeLegal5", "Acerte 100 questões no total", 200, "olocomeu", "trofeu-ouro"],
		6:["NomeLegal6", "Consiga 25 moedas no total", 10, "olocomeu", "trofeu-ouro"],
		7:["NomeLegal7", "Consiga 50 moedas no total", 25, "olocomeu", "trofeu-ouro"],
		8:["NomeLegal8", "Consiga 100 moedas no total", 50, "olocomeu", "trofeu-ouro"],
		9:["NomeLegal9", "Consiga 1000 moedas no total", 200, "olocomeu", "trofeu-ouro"],
		10:["PRIMEIRA CARTA", "Use uma carta de poder", 200, "olocomeu", "trofeu-ouro"],
		11:["CARTAS PRA QUE TE QUERO", "Use 10 cartas de poder", 200, "olocomeu", "trofeu-ouro"],
		12:["MESTRE DAS CARTAS", "Use 100 cartas de poder", 200, "olocomeu", "trofeu-ouro"],
	},
	lengthConquista: function() {
		var totalLength;
		for(totalLength = 0; this.conquistas[totalLength]; totalLength++);

		return totalLength;
	}
};
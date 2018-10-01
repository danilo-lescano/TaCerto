var TaCerto = TaCerto || {};
TaCerto.Estrutura = TaCerto.Estrutura || {};
TaCerto.Estrutura.Conquistas = {
	conquistas: {
		// Nome da Consquista, Descrição da Conquista, Money da Conquista, Nome da imagem
		0:["NomeLegal0", "Obtenha uma estrela completa", 25, "olocomeu"],
		1:["NomeLegal1", "Obtenha 3 estrelas completas", 75, "olocomeu"],
		2:["NomeLegal2", "Obtenha 5 estrelas completas", 125, "olocomeu"],
		3:["NomeLegal3", "Acerte 10 questões no total", 25, "olocomeu"],
		4:["NomeLegal4", "Acerte 50 questões no total", 100, "olocomeu"],
		5:["NomeLegal5", "Acerte 100 questões no total", 200, "olocomeu"],
		6:["NomeLegal6", "Consiga 25 moedas no total", 10, "olocomeu"],
		7:["NomeLegal7", "Consiga 50 moedas no total", 25, "olocomeu"],
		8:["NomeLegal8", "Consiga 100 moedas no total", 50, "olocomeu"],
		9:["NomeLegal9", "Consiga 1000 moedas no total", 200, "olocomeu"],
	},
	lengthConquista: function() {
		var totalLength;
		for(totalLength = 0; this.conquistas[totalLength]; totalLength++)
			;
		
		return totalLength;
	}
};
CREATE TABLE Usuario(
	idUsuario int NOT NULL AUTO_INCREMENT,
	uNome varchar(255) NOT NULL,
	pNome varchar(255) NOT NULL,
	email varchar(255) NOT NULL,
	senha varchar(255) NOT NULL,
	PRIMARY KEY (idUsuario)
);
INSERT INTO Usuario (idUsuario, uNome, pNome, email, senha) VALUES
(1, 'nobody', 'nobody', 'admin', 'd033e22ae348aeb5660fc2140aec35850c4da997');
CREATE TABLE Confirmacao(
	idConfirmacao varchar(255) NOT NULL,
	uNome varchar(255) NOT NULL,
	pNome varchar(255) NOT NULL,
	email varchar(255) NOT NULL,
	senha varchar(255) NOT NULL,
	PRIMARY KEY (idConfirmacao)
);
CREATE TABLE Sessao(
	idSessao varchar(255) NOT NULL,
	idUsuario int NOT NULL,
	PRIMARY KEY (idSessao),
	FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario)
);
CREATE TABLE NivelAcesso(
	idNivelAcesso int NOT NULL AUTO_INCREMENT,
	descricaoNivelAcesso varchar(255) NOT NULL,
	PRIMARY KEY (idNivelAcesso)
);

CREATE TABLE TaCerto_JogadorInventario(
	idJogadorInventario int NOT NULL AUTO_INCREMENT,
	idUsuario int NOT NULL,
	xp int DEFAULT 0,
	nivel int DEFAULT 1,
	moeda int DEFAULT 0,
	cartaVermelha int DEFAULT 0,
	cartaVerde int DEFAULT 0,
	cartaAzul int DEFAULT 0,
	cartaAmarela int DEFAULT 0,
	PRIMARY KEY (idJogadorInventario),
	FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario)
);

CREATE TABLE TaCerto_Nivel(
	idNivel int NOT NULL AUTO_INCREMENT,
	xpValor int NOT NULL,
	nome varchar(255) NOT NULL,
	nivelFase int NOT NULL,
	quantidadeSelo int,
	PRIMARY KEY (idNivel)
);
CREATE TABLE TaCerto_SeloDeNivel(
	idSeloDeNivel int NOT NULL AUTO_INCREMENT,
	descricaoSelo varchar(255) NOT NULL,
	idNivel int NOT NULL,
	PRIMARY KEY (idSeloDeNivel),
	FOREIGN KEY (idNivel) REFERENCES TaCerto_Nivel(idNivel)
);
CREATE TABLE TaCerto_Missao(
	idMissao int NOT NULL AUTO_INCREMENT,
	moedasPremio int NOT NULL,
	xpPremio int NOT NULL,
	descricaoMissao varchar(255) NOT NULL,
	idNivel int NOT NULL,
	conquistada boolean NOT NULL,
	PRIMARY KEY (idMissao),
	FOREIGN KEY (idNivel) REFERENCES TaCerto_Nivel(idNivel)
);

CREATE TABLE TaCerto_Conquista(
	idNivel int NOT NULL,
	idUsuario int NOT NULL,
	FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario),
	FOREIGN KEY (idNivel) REFERENCES TaCerto_Nivel(idNivel),
	PRIMARY KEY (idNivel, idUsuario)
);

CREATE TABLE TaCerto_DesafioDeFasePalavra(
	idDesafioDeFasePalavra int NOT NULL AUTO_INCREMENT,
	tipoDeFase varchar(100) NOT NULL,
	palavra varchar(100) NOT NULL,
	nivelFase int NOT NULL,
	PRIMARY KEY (idDesafioDeFasePalavra)
);
CREATE TABLE TaCerto_DesafioDeFaseLacuna(
	idDesafioDeFaseLacuna int NOT NULL AUTO_INCREMENT,
	idDesafioDeFasePalavra int NOT NULL,
	fraseParteUm varchar(255) NOT NULL,
	fraseParteDois varchar(255),
	lugarPalavra int NOT NULL,
	palavraErradaUm varchar(100) NOT NULL,
	palavraErradaDOIS varchar(100) NOT NULL,
	palavra varchar(100) NOT NULL,
	PRIMARY KEY (idDesafioDeFaseLacuna),
	FOREIGN KEY (idDesafioDeFasePalavra) REFERENCES TaCerto_DesafioDeFasePalavra(idDesafioDeFasePalavra)
);

CREATE TABLE TaCerto_Carta(
	idCarta int NOT NULL AUTO_INCREMENT,
	descricaoCarta varchar(255) NOT NULL,
	PRIMARY KEY (idCarta)
);






















CREATE TABLE tabela(
	id int NOT NULL AUTO_INCREMENT,

	PRIMARY KEY (id)
);
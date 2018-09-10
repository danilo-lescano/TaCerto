var TaCerto = TaCerto || {};
TaCerto.Controladora = TaCerto.Controladora || {};
TaCerto.Controladora.MenuMissao = {
	modoTipo: '',
	modoNivel: 0,
	load: function(){
		TaCerto.Controladora.CarregarPagina.htmlCorpo("menuMissao");
		document.getElementById('moedas').innerHTML = TaCerto.Estrutura.Jogador.moeda;

		function calculaLvl(xp){
			var level = 1;
			xp-=200;
			while(xp !== 0)
				xp -= xp > 0 ? ++level * 100 : level-- * 0 + xp;
			return level;
		}

		function moveXPBar(nivel, maxNivel, nextLevelXp){
			var xpTotal = document.getElementById('xpTotal');
			var xpNextLevel =document.getElementById('xpNextLevel');
			if (nivel < maxNivel) {
				var xpBar = document.getElementsByClassName('back_xpBar')[0];
				if(xpBar){
					document.getElementById('xpNextLevel').innerHTML = nextLevelXp;
					xpBar.classList.remove("transition00", "transition03");
					xpBar.classList.add("transition00");
					xpBar.style.width = "0";
					setTimeout(function(){
						xpBar.classList.remove("transition00", "transition03");
						xpBar.classList.add("transition03");
						xpBar.style.width = "100%";
						nextLevelXp += (++nivel + 1)* 100;
						setTimeout(function(){
							moveXPBar(nivel, maxNivel, nextLevelXp);
						}, 320);
					}, 10);
				}
			}
			else{
				var xpBar = document.getElementsByClassName('back_xpBar')[0];
				if(xpBar){
					var deltaXp = parseInt(document.getElementById('xpNextLevel').innerHTML);
					deltaXp = ((TaCerto.Estrutura.Jogador.xp - deltaXp)/(nextLevelXp - deltaXp))*100;
					document.getElementById('xpNextLevel').innerHTML = nextLevelXp;
					xpBar.classList.remove("transition00", "transition03");
					xpBar.classList.add("transition00");
					xpBar.style.width = "0";
					setTimeout(function(){
						xpBar.classList.remove("transition00", "transition03");
						xpBar.classList.add("transition03");
						xpBar.style.width = deltaXp === 0 ? 0 : deltaXp > 10 ? deltaXp + "%" : "10%";
					}, 10);
				}
				var intervalo = setInterval(function(){
					var next = document.getElementById('xpTotal');
					if (next){
						if(parseInt(next.innerHTML) < TaCerto.Estrutura.Jogador.xp)
							next.innerHTML = (parseInt(next.innerHTML) + 100);
						else{
							clearInterval(intervalo);
							next.innerHTML = TaCerto.Estrutura.Jogador.xp;
						}
					}
				}, 100);
			}
		} moveXPBar(0, calculaLvl(TaCerto.Estrutura.Jogador.xp), 200);

		function displayMissao(){
			var level = calculaLvl(TaCerto.Estrutura.Jogador.xp);
			for (var i = 0; i < level+3 && i < 9; i++) {
				let aux = TaCerto.Estrutura.Jogador.missoes[i];
				if(document.getElementById('imgMissa'+(i+1))){
					if (aux[0] && aux[1] && aux[2])
						document.getElementById('imgMissa'+(i+1)).src = "resources/media/image/missao" + (i+1) + ".png";
					else
						document.getElementById('imgMissa'+(i+1)).src = "resources/media/image/missao" + (i+1) + "SE.png";
				}
			}
		} displayMissao();
	},

	clickMissao: function(mission){
		var missao = document.getElementById('imgMissa' + (mission+1));
		if (!missao.src.includes("resources/media/image/lock.png")){
			
			TaCerto.GenFunc.fadeInBtnClick(missao, function(){
				TaCerto.Controladora.MenuMissao.modalOpenClose(true);

				document.getElementById('objetivoP1').innerHTML = TaCerto.Estrutura.Fase[mission].descricaoObjetivos[0];
				document.getElementById('objetivoP2').innerHTML = TaCerto.Estrutura.Fase[mission].descricaoObjetivos[1];
				document.getElementById('objetivoP3').innerHTML = TaCerto.Estrutura.Fase[mission].descricaoObjetivos[2];
				TaCerto.Controladora.MenuMissao.modoTipo = document.getElementById('modoTipo').innerHTML = TaCerto.Estrutura.Fase[mission].tipo;
				TaCerto.Controladora.MenuMissao.modoNivel = mission;

				var aux = TaCerto.Estrutura.Jogador.missoes[mission];
				if (aux[0]) document.getElementById('modalImgMissao1').src = "resources/media/image/checkedbox.png";
				else document.getElementById('modalImgMissao1').src = "resources/media/image/uncheckedbox.png";
				if (aux[1]) document.getElementById('modalImgMissao2').src = "resources/media/image/checkedbox.png";
				else document.getElementById('modalImgMissao2').src = "resources/media/image/uncheckedbox.png";
				if (aux[2]) document.getElementById('modalImgMissao3').src = "resources/media/image/checkedbox.png";
				else document.getElementById('modalImgMissao3').src = "resources/media/image/uncheckedbox.png";
			});				
		}
		else{
			missao.classList.add("animated"); missao.classList.add("flash"); 
			setTimeout(function () {missao.classList.remove("animated", "flash");}, 1000);
		}
	},
	modalClick: function(el, botao){
		TaCerto.GenFunc.pressClick(el,
		function(){
			if(botao)
				TaCerto.Controladora.MenuMissao.modalOpenClose(false);
			if(botao === "play"){
				TaCerto.Controladora.Jogo.Load(TaCerto.Controladora.MenuMissao.modoTipo, TaCerto.Controladora.MenuMissao.modoNivel);
			}
		});

		var e = window.event;
		e.cancelBubble = true;
		if (e.stopPropagation) e.stopPropagation();
	},
	modalOpenClose: function(flag){
		//find and display block the modal
		var modal = document.getElementById("missaoModal");
		modal.style.display = flag ? "block" : "none";
		//blur game blend
		var blurThis = [document.getElementsByClassName('gameBlend')[0], document.getElementsByClassName('menuMissao_wrapper')[0]];
		for (var i = 0; i < blurThis.length; i++) {
			blurThis[i].style.filter = flag ? "blur(5px)" : "none";
		}
	},
	homebtn: function(el){
		TaCerto.GenFunc.fadeInBtnClick(el,
		function(){
			TaCerto.Controladora.CarregarPagina.htmlCorpo('menuInicial');
		});
	},
	lojabtn: function(el){
		TaCerto.GenFunc.fadeInBtnClick(el,
		function(){
			TaCerto.Controladora.Loja.display();
		});
	},
};
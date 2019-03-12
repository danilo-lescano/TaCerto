var TaCerto = TaCerto || {};
TaCerto.Controladora = TaCerto.Controladora || {};
TaCerto.Controladora.MenuMissao = {
	modoTipo: '',
	modoNivel: 0,
	tamanho: 0,
	load: function(){
		TaCerto.Controladora.CarregarPagina.htmlCorpo("menuMissao",["dica"],["dica"]);
		document.getElementById('moedas').innerHTML = TaCerto.Estrutura.Jogador.moeda;

		function calculaLvl(xp){
			var level = 1;
			while(xp > 0){
				xp -= level > 1 ? level * 100 : 200;
				if(xp >= 0)
					level++;
			}
			return level;
		}
		var resolveAnimationXpBar = (async ()=>{
			var nextLevel = calculaLvl(TaCerto.Estrutura.Jogador.xp) + 1;
			var xpBar = document.getElementsByClassName('back_xpBar')[0];
			var nextXp = document.getElementById('xpNextLevel');
			var nextLevelXp;
			
			for (let i = 1; i < nextLevel - 1; i++) {
				if(nextLevelXp === undefined) nextLevelXp = 100;
				nextLevelXp += i * 100;

				nextXp.innerHTML = nextLevelXp;
				xpBar.style.transition = "width 0s";
				xpBar.style.width = "0";
				//primeiro ele desenha e depois conta as mudanças que eu fiz em cima por isso ele precisa ser chamado duas vezes
				await promiseRequestAnimationFrame();
				await promiseRequestAnimationFrame();

				xpBar.style.transition = "width 0.3s";
				xpBar.style.width = "100%";
				await delay(300);
			}
			xpBar.style.transition = "width 0s";
			xpBar.style.width = "0";
			await promiseRequestAnimationFrame();
			await promiseRequestAnimationFrame();
			xpBar.style.transition = "width 0.3s";

			for (let i = 1; i < nextLevel; i++) {
				if(nextLevelXp === undefined) nextLevelXp = 100;
					nextLevelXp += i * 100;
			}
			nextXp.innerHTML = nextLevelXp;
			var deltaXp = nextLevelXp - (nextLevel * 100);
			deltaXp = ((TaCerto.Estrutura.Jogador.xp - deltaXp)/(nextLevelXp - deltaXp))*100;
			xpBar.style.width = deltaXp === 0 ? 0 : deltaXp > 10 ? deltaXp + "%" : "10%";
		})();
		var resolveAnimationXpNumero = (async ()=>{
			var xpTotal = document.getElementById('xpTotal');
			var xp = 0;
			while(TaCerto.Estrutura.Jogador.xp >= xp){
				xpTotal.innerHTML = xp;
				if(TaCerto.Estrutura.Jogador.xp == xp)
					xp++;
				else if(xp + 100 <= TaCerto.Estrutura.Jogador.xp)
					xp += 100;
				else
					xp = TaCerto.Estrutura.Jogador.xp;

				await promiseRequestAnimationFrame();
				await promiseRequestAnimationFrame();
				await delay(100);
			}
		})();

		var resolveMissionsDisplay = (()=>{
			var level = calculaLvl(TaCerto.Estrutura.Jogador.xp);
			for (var i = 1; i < level+3 && i < 9; i++) {
				let aux = TaCerto.Estrutura.Jogador.missoes[i];
				if(document.getElementById('imgMissa'+i)){
					if (aux[0] && aux[1] && aux[2])
						document.getElementById('imgMissa'+i).src = "resources/media/image/missao" + i + ".png";
					else
						document.getElementById('imgMissa'+i).src = "resources/media/image/missao" + i + "SE.png";
				}
			}
		})();
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
				TaCerto.Controladora.MenuMissao.tamanho = ((mission % 3) + 1) * 30;

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
			if(botao === "play")
				TaCerto.Controladora.Jogo.Load(TaCerto.Controladora.MenuMissao.modoTipo, TaCerto.Controladora.MenuMissao.modoNivel, TaCerto.Controladora.MenuMissao.tamanho);
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
			if(flag)
				blurThis[i].style.filter = "blur(5px)";
			else
				blurThis[i].style.removeProperty("filter");
		}
	},
	homebtn: function(el){
		TaCerto.GenFunc.fadeInBtnClick(el,
		function(){
			//TaCerto.Controladora.CarregarPagina.htmlCorpo('menuInicial');
			TaCerto.Controladora.MenuInicial.load();
		});
	},
	lojabtn: function(el){
		TaCerto.GenFunc.fadeInBtnClick(el,
		function(){
			TaCerto.Controladora.Loja.display();
		});
	},
};
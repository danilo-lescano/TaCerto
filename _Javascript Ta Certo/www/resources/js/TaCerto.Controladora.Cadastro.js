var TaCerto = TaCerto || {};
TaCerto.Controladora = TaCerto.Controladora || {};
TaCerto.Controladora.Cadastro = {
	pNome: '',
	uNome: '',
	email: '',
	senha: '',
	postRegister: function(){
            		TaCerto.Carregar("errou");
		// this.pNome = document.getElementsByName("pNome")[0].value;
		// this.uNome = document.getElementsByName("uNome")[0].value;
		// this.email = document.getElementsByName("email")[0].value;
		// this.senha = document.getElementsByName("senha")[0].value;
		// var http = new XMLHttpRequest();
		// var params = {"pNome": this.pNome, "uNome": this.uNome, "email":this.email, "senha":this.senha};
  //       http.open('POST', '/cadastroform');
  //       http.setRequestHeader('Content-type', 'application/json');
  //       http.send(JSON.stringify(params)); // Make sure to stringify
  //       http.onload = function() {
  //           console.log(http.responseText);
  //           if (http.responseText === this.email) {
  //           	alert("Olhe o link no seu email: " + this.email + ".\nPode ser que ele tenha ido pra caixa de spam ;)");
  //           	sessao = http.responseText;
  //           	TaCerto.Carregar("login");
  //           }
  //           else if(http.responseText === "email ja existe") alert("email ja existe");
  //           else{
  //           	alert("Algum campo nao foi preenchido corretamento!");
  //           }
  //       }
	}
};
var TaCerto = TaCerto || {};
TaCerto.Controladora = TaCerto.Controladora || {};
TaCerto.Controladora.Login = {
	email: '',
	senha: '',
	postAcess: function() {
		this.email = document.getElementsByName("email")[0].value;
		this.senha = document.getElementsByName("senha")[0].value;
		var http = new XMLHttpRequest();
		var params = {"email":this.email, "senha":this.senha};
		http.open('POST', '/loginform');
		http.setRequestHeader('Content-type', 'application/json');
		http.send(JSON.stringify(params)); // Make sure to stringify
		http.onload = function() {
			console.log(http.responseText);
			if (http.responseText) {
				TaCerto.idSessao = http.responseText;
				if(confirm("Você está conectado!"))
					TaCerto.Carregar("menuInicial");
			}
			else
				alert("Por favor digite login e senha validos!");
		}
	}
};
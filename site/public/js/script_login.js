function Focus(id_input, alerta){
    alerta.innerHTML = null;
}

function keyUp(event,id_input, alerta) {
    Focus(id_input, alerta);
    if (event.keyCode == 13) {
        entrar();
    }    
}

function entrar(){
    const email = input_email.value;
    const senha = input_senha.value;

    var invalid_date = false;

    if (email != "teste@teste.com"){
        alerta_email.innerHTML = "E-mail inválido";
        invalid_date = true;
    }

    if (senha != "123"){
        alerta_senha.innerHTML = "Senha inválida";
        invalid_date = true;
    }
    
    if (!invalid_date) {        
        login();
    }
}

function login() {
    alert("Login realizado");
    location.reload();
}
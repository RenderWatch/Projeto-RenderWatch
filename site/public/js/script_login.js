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

    // var invalid_date = false;

    // if (email != "teste@teste.com"){
    //     alerta_email.innerHTML = "E-mail inválido";
    //     invalid_date = true;
    // }

    // if (senha != "123"){
    //     alerta_senha.innerHTML = "Senha inválida";
    //     invalid_date = true;
    // }
    
    // if (!invalid_date) {        
    //     login();
    // }

    login()
}

// function login() {
//     alert("Login realizado");
//     location.reload();
// }


function login() {

    var emailVar = input_email.value;
    var senhaVar = input_senha.value;

    console.log("FORM LOGIN: ", emailVar);
    console.log("FORM SENHA: ", senhaVar);

    fetch("/usuario/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));

                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.ID_USUARIO = json.id;

                setTimeout(function () {
                    window.location = "./teste.html";
                }, 1000); // apenas para exibir o loading

            });

        } else {

            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);
                finalizarAguardar(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}
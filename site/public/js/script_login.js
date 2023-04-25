function Focus(id_input, alerta){
    alerta.innerHTML = null;
}

function keyUp(event,id_input, alerta) {
    Focus(id_input, alerta);
    if (event.keyCode == 13) {
        entrar();
    }    
}

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
                sessionStorage.SOBRENOME_USUARIO = json.sobrenome;
                sessionStorage.TELEFONE_USUARIO = json.telefone;
                sessionStorage.SENHA_USUARIO = json.senha;
                sessionStorage.ID_USUARIO = json.id;
                sessionStorage.ID_EMPRESA = json.empresa_id;

                setTimeout(function () {
                    window.location = "./perfil-empresa.html";
                }, 1000); 

            });

        } else {

            console.log("Houve um erro ao tentar realizar o login!");

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Autenticação inválida!',
              })
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}
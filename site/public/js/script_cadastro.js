function Focus(id_input, alerta){
    alerta.innerHTML = null;
}

function FocusTelefone(){
    alerta_telefone.innerHTML = null;
}

function keyUp(event,id_input, alerta) {
    Focus(id_input, alerta);
    if (event.keyCode == 13) {
        cadastrar();
    }    
}

function invalidEmailChar(email) {
    const valid_chars = [".","-","_","@","0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    var invalid_char = false;
    for (let index = 0; index < email.length; index++) {
        const char_email = email[index];
        if (valid_chars.indexOf(char_email) == -1) {
            invalid_char = true;
        }
    }
    if (invalid_char) {
        return true;
    }
    return false;
}

function MaskNumber(id_input) {
    const value = id_input.value
    if (value[value.length-1] != '0' &&
        value[value.length-1] != '1' &&
        value[value.length-1] != '2' &&
        value[value.length-1] != '3' &&
        value[value.length-1] != '4' &&
        value[value.length-1] != '5' &&
        value[value.length-1] != '6' &&
        value[value.length-1] != '7' &&
        value[value.length-1] != '8' &&
        value[value.length-1] != '9') {
        id_input.value = value.substr(0,value.length-1);        
    }
}

function validarCadastro(){
    const nome = input_nome.value;
    const sobrenome = input_sobrenome.value;
    const email = input_email.value;
    const ddd = input_ddd.value;
    const telefone = input_telefone.value;
    const cpf = input_cpf.value;
    const senha = input_senha.value;
    const confirmacao_senha = input_confirmacao_senha.value;

    var dadosValidos = true;


    if (nome == "" ){
        alerta_nome.innerHTML = "Este campo é obrigatório";
        title_box.scrollIntoView();
        dadosValidos = false;
    }   else if (nome.length < 2) {
        alerta_nome.innerHTML = "Nome inválido";
        title_box.scrollIntoView();
        dadosValidos = false;
    } 

    if (sobrenome == "" ){
        alerta_sobrenome.innerHTML = "Este campo é obrigatório";
        title_box.scrollIntoView();
        dadosValidos = false;
    }   else if (sobrenome.length < 2) {
        alerta_sobrenome.innerHTML = "sobrenome inválido";
        title_box.scrollIntoView();
        dadosValidos = false;
    } 

    if (email == ""){
        alerta_email.innerHTML = "Este campo é obrigatório";
        title_box.scrollIntoView();
        dadosValidos = false;
    } else if (email.indexOf("@") < 3 || (email.lastIndexOf(".") - email.indexOf("@")) < 2 || (email.length - email.lastIndexOf(".")) < 2 || invalidEmailChar(email)) {
        alerta_email.innerHTML = "Email inválido";
        title_box.scrollIntoView();
        dadosValidos = false;
    }

    if (telefone == "" || ddd == ""){
        alerta_email.innerHTML = "Este campo é obrigatório";
        title_box.scrollIntoView();
        dadosValidos = false;
    } else if ((ddd.length < 2) || (telefone.length < 8)){
        alerta_telefone.innerHTML = "Telefone inválido";
        title_box.scrollIntoView();
        dadosValidos = false;
    }

    if (cpf == ""){
        alerta_cpf.innerHTML = "Este campo é obrigatório";
        title_box.scrollIntoView();
        dadosValidos = false;
    } else if (cpf.length < 11) {
        alerta_cpf.innerHTML = "CPF inválido";
        title_box.scrollIntoView();
        dadosValidos = false;
    }

    if (senha == ""){
        alerta_senha.innerHTML = "Este campo é obrigatório";
        title_box.scrollIntoView();
        dadosValidos = false;
    } else if (senha.length < 6 || senha.search(/[a-z]/) == -1 || senha.search(/[A-Z]/) == -1 || senha.search(/[0-9]/) == -1) {
        alerta_senha.innerHTML = "Digite 6 caracteres, um número, letra maiúscula e minúscula";
        title_box.scrollIntoView();
        dadosValidos = false;
    }

    if (confirmacao_senha == ""){
        alerta_confirmacao_senha.innerHTML = "Este campo é obrigatório";
        title_box.scrollIntoView();
        dadosValidos = false;
    } else if (senha != "" && (senha != confirmacao_senha)){
        alerta_confirmacao_senha.innerHTML = "As senhas se divergem";
        title_box.scrollIntoView();
        dadosValidos = false;
    }

    if (!dadosValidos) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Houve um erro ao tentar realizar o cadastro!'
          })
    }
    else{        
        cadastrar();
    }
}

function cadastrar() {
    
    var nomeVar = input_nome.value;
    var sobrenomeVar = input_sobrenome.value;
    var emailVar = input_email.value;
    var telefoneVar = input_ddd.value + input_telefone.value;
    var cpfVar = input_cpf.value;
    var senhaVar = input_senha.value;
    
    fetch("/usuario/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeServer: nomeVar,
            sobrenomeServer: sobrenomeVar,
            emailServer: emailVar,
            telefoneServer: telefoneVar,
            cpfServer: cpfVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {
        
        console.log("resposta: ", resposta);
        
        if (resposta.ok) {
            setTimeout(() => {
                window.location = "login.html";
            }, "2000")
            
            limparFormulario();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Houve um erro ao tentar realizar o cadastro!',
          })
  
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
  
    return false;
  }
  
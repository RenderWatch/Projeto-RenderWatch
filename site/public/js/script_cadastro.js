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

function cadastrar(){
    const nome = input_nome.value;
    const sobrenome = input_sobrenome.value;
    const email = input_email.value;
    const ddd = input_ddd.value;
    const telefone = input_telefone.value;
    const cpf = input_cpf.value;
    const senha = input_senha.value;
    const confirmacao_senha = input_confirmacao_senha.value;

    var invalid_date = false;

    if (nome == "" || nome[0] == " " || nome.length < 3){
        alerta_nome.innerHTML = "Este campo é obrigatório";
        title_box.scrollIntoView();
        invalid_date = true;
    }    

    if (sobrenome == "" || sobrenome[0] == " " || sobrenome.length < 3){
        alerta_sobrenome.innerHTML = "Este campo é obrigatório";
        title_box.scrollIntoView();
        invalid_date = true;
    } 

    if (email == ""){
        alerta_email.innerHTML = "Este campo é obrigatório";
        title_box.scrollIntoView();
        invalid_date = true;
    } else if (email.indexOf("@") < 3 || (email.lastIndexOf(".") - email.indexOf("@")) < 4 || (email.length - email.lastIndexOf(".")) < 3 || invalidEmailChar(email)) {
        alerta_email.innerHTML = "Email inválido";
        title_box.scrollIntoView();
        invalid_date = true;
    }

    if ((ddd != "" && ddd.length < 2) || (telefone != "" && telefone.length < 8) || (ddd == "" && telefone != "") || (ddd != "" && telefone == "")){
        alerta_telefone.innerHTML = "Telefone inválido";
        title_box.scrollIntoView();
        invalid_date = true;
    }

    if (cpf == ""){
        alerta_cpf.innerHTML = "Este campo é obrigatório";
        title_box.scrollIntoView();
        invalid_date = true;
    } else if (cpf.length < 11) {
        alerta_cpf.innerHTML = "CPF inválido";
        title_box.scrollIntoView();
        invalid_date = true;
    }

    if (senha == ""){
        alerta_senha.innerHTML = "Este campo é obrigatório";
        title_box.scrollIntoView();
        invalid_date = true;
    } else if (senha.length < 5) {
        alerta_senha.innerHTML = "Digite pelo menos 5 caracteres";
        title_box.scrollIntoView();
        invalid_date = true;
    }

    if (confirmacao_senha == ""){
        alerta_confirmacao_senha.innerHTML = "Este campo é obrigatório";
        title_box.scrollIntoView();
        invalid_date = true;
    } else if (senha != "" && (senha != confirmacao_senha)){
        alerta_confirmacao_senha.innerHTML = "As senhas se divergem";
        title_box.scrollIntoView();
        invalid_date = true;
    }

    if (!invalid_date) {        
        efetuarCadastro();
    }
}

function efetuarCadastro() {
    alert("Cadastro realizado");
    location.reload();
}
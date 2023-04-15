
function dadosUsuario() {

        //Nome do Usuario
        spanNome.innerHTML = sessionStorage.NOME_USUARIO;

        //Sobrenome do Usuario
        spanSobrenome.innerHTML = sessionStorage.SOBRENOME_USUARIO;

        //Senha do usuario

        var tamanhoSenha = sessionStorage.SENHA_USUARIO;

        //Telefone do usuario
        spanTelefone.innerHTML = sessionStorage.TELEFONE_USUARIO;

        var visualSenha = "";

        for (var a = 0; a < tamanhoSenha.length; a++) {
            visualSenha += '*'
        }

        spanSenha.innerHTML = visualSenha;

}

function alterarNome() {
  btnEditNome.remove();

  divContainerNome.innerHTML += `
    <div id="divChangeNome" class="div-input">
        <label for="change-user"></label>
        <input class="input-user-pass-telefone" id="inputNome" type="text">
        <button onclick="confirmarNome()" class="btn-user-pass-telefone">Confirmar</button>
        <button onclick="cancelarNome()" class="btn-user-pass-telefone-remove">Cancelar</button>
    </div>
    `;
}


function cancelarNome() {
  divChangeNome.remove();

  divContainerNome.innerHTML += `
    <button onclick="alterarNome()" id="btnEditNome" class="btn-edit">
        Editar
    </button>
    `;
}


function confirmarNome() {
var tamanhoNome = inputNome.value;

  if(tamanhoNome.length > 2 && tamanhoNome.length < 45){
  sessionStorage.setItem("NOME_USUARIO", inputNome.value);
  fetch(`/usuario/confirmarNome/${sessionStorage.getItem("NOME_USUARIO")}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      nome: inputNome.value,
      id: sessionStorage.ID_USUARIO
    })
  }).then(function (resposta) {

    if (resposta.ok) {
      Swal.fire({
        icon: 'success',
        title: 'Parabéns',
        text: 'Nome atualizado com sucesso!',
      })

    } else if (resposta.status == 404) {
      Swal.fire({
        icon: 'error',
        title: 'Ops...',
        text: 'Deu 404!',
      })
    } else {
      throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
    }
  }).catch(function (resposta) {
    console.log(`#ERRO: ${resposta}`);
  })

  spanNome.innerHTML = inputNome.value;
  divChangeNome.remove();

  divContainerNome.innerHTML += ` 
    <button onclick="alterarNome()" id="btnEditNome" class="btn-edit">
      Editar
    </button>
    `;
} else {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Houve um erro ao tentar alterar o nome! Certifique-se que o nome está entre 2 e 45 caracteres válidos e tente novamente.'
  })
}
}

function alterarSobrenome() {
  btnEditSobrenome.remove();

  divContainerSobrenome.innerHTML += `
    <div id="divChangeSobrenome" class="div-input">
        <label for="change-sobrenome"></label>
        <input class="input-user-pass-telefone" id="inputSobrenome" type="text">
        <button onclick="confirmarSobrenome()" class="btn-user-pass-telefone">Confirmar</button>
        <button onclick="cancelarSobrenome()" class="btn-user-pass-telefone-remove">Cancelar</button>
    </div>
    `;
}


function cancelarSobrenome() {
  divChangeSobrenome.remove();

  divContainerSobrenome.innerHTML += `
    <button onclick="alterarSobrenome()" id="btnEditSobrenome" class="btn-edit">
        Editar
    </button>
    `;
}


function confirmarSobrenome() {
var tamanhoSobrenome = inputSobrenome.value;

  if(tamanhoSobrenome.length > 2 && tamanhoSobrenome.length < 45){
  sessionStorage.setItem("SOBRENOME_USUARIO", inputSobrenome.value);
  fetch(`/usuario/confirmarSobrenome/${sessionStorage.getItem("SOBRENOME_USUARIO")}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      sobrenome: inputSobrenome.value,
      id: sessionStorage.ID_USUARIO
    })
  }).then(function (resposta) {

    if (resposta.ok) {
      Swal.fire({
        icon: 'success',
        title: 'Parabéns',
        text: 'Sobrenome atualizado com sucesso!',
      })

    } else if (resposta.status == 404) {
      Swal.fire({
        icon: 'error',
        title: 'Ops...',
        text: 'Deu 404!',
      })
    } else {
      throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
    }
  }).catch(function (resposta) {
    console.log(`#ERRO: ${resposta}`);
  })

  spanSobrenome.innerHTML = inputSobrenome.value;
  divChangeSobrenome.remove();

  divContainerSobrenome.innerHTML += ` 
    <button onclick="alterarSobrenome()" id="btnEditSobrenome" class="btn-edit">
      Editar
    </button>
    `;
} else {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Houve um erro ao tentar alterar o sobrenome! Certifique-se que o sobrenome está entre 2 e 45 caracteres válidos e tente novamente.'
  })
}
}

function alterarTelefone() {
  btnEditTelefone.remove();

  divContainerTelefone.innerHTML += `
    <div id="divChangeTelefone" class="div-input">
        <label for="change-telefone"></label>
        <input class="input-user-pass-telefone" id="inputTelefone" type="number">
        <button onclick="confirmarTelefone()" class="btn-user-pass-telefone">Confirmar</button>
        <button onclick="cancelarTelefone()" class="btn-user-pass-telefone-remove">Cancelar</button>
    </div>
    `;
}


function cancelarTelefone() {
  divChangeTelefone.remove();

  divContainerTelefone.innerHTML += `
    <button onclick="alterarTelefone()" id="btnEditTelefone" class="btn-edit">
        Editar
    </button>
    `;
}


function confirmarTelefone() {
var tamanhoTelefone = inputTelefone.value;

  if(tamanhoTelefone.length > 9 && tamanhoTelefone.length < 12){
  sessionStorage.setItem("TELEFONE_USUARIO", inputTelefone.value);
  fetch(`/usuario/confirmarTelefone/${sessionStorage.getItem("TELEFONE_USUARIO")}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      telefone: inputTelefone.value,
      id: sessionStorage.ID_USUARIO
    })
  }).then(function (resposta) {

    if (resposta.ok) {
      Swal.fire({
        icon: 'success',
        title: 'Parabéns',
        text: 'Telefone atualizado com sucesso!',
      })

    } else if (resposta.status == 404) {
      Swal.fire({
        icon: 'error',
        title: 'Ops...',
        text: 'Deu 404!',
      })
    } else {
      throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
    }
  }).catch(function (resposta) {
    console.log(`#ERRO: ${resposta}`);
  })

  spanTelefone.innerHTML = inputTelefone.value;
  divChangeTelefone.remove();

  divContainerTelefone.innerHTML += ` 
    <button onclick="alterarTelefone()" id="btnEditTelefone" class="btn-edit">
      Editar
    </button>
    `;
} else {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Houve um erro ao tentar alterar o Telefone! Certifique-se que o telefone tem o DDD em seguida do número correto.'
  })
}
}

function alterarSenha() {
  btnEditSenha.remove();

  divContainerSenha.innerHTML += `
    <div id="divChangeSenha" class="div-input">
        <label for="change-senha"></label>
        <input class="input-user-pass-telefone" id="inputSenha" type="text">
        <button onclick="confirmarSenha()" class="btn-user-pass-telefone">Confirmar</button>
        <button onclick="cancelarSenha()" class="btn-user-pass-telefone-remove">Cancelar</button>
    </div>
    `;
}


function cancelarSenha() {
  divChangeSenha.remove();

  divContainerSenha.innerHTML += `
    <button onclick="alterarSenha()" id="btnEditSenha" class="btn-edit">
        Editar
    </button>
    `;
}


function confirmarSenha() {
var novaSenha = inputSenha.value;

  if(novaSenha.length >= 6 && novaSenha.search(/[a-z]/) != -1 && novaSenha.search(/[A-Z]/) != -1 && novaSenha.search(/[0-9]/) != -1){
  sessionStorage.setItem("SENHA_USUARIO", inputSenha.value);
  fetch(`/usuario/confirmarSenha/${sessionStorage.getItem("SENHA_USUARIO")}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      senha: inputSenha.value,
      id: sessionStorage.ID_USUARIO
    })
  }).then(function (resposta) {

    if (resposta.ok) {
      Swal.fire({
        icon: 'success',
        title: 'Parabéns',
        text: 'Senha atualizada com sucesso!',
      })

    } else if (resposta.status == 404) {
      Swal.fire({
        icon: 'error',
        title: 'Ops...',
        text: 'Deu 404!',
      })
    } else {
      throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
    }
  }).catch(function (resposta) {
    console.log(`#ERRO: ${resposta}`);
  })

  var visualSenha = "";

  for (var a = 0; a < novaSenha.length; a++) {
      visualSenha += '*'
  }

  spanSenha.innerHTML = visualSenha;

  divChangeSenha.remove();

  divContainerSenha.innerHTML += ` 
    <button onclick="alterarSenha()" id="btnEditSenha" class="btn-edit">
      Editar
    </button>
    `;
} else {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Houve um erro ao tentar alterar a senha! Certifique-se de que a senha tenha pelo menos 6 caracteres, uma letra maiúscula, uma letra minúscula e um número.'
  })
}
}

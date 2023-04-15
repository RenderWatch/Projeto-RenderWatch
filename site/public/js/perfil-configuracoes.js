
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


// Busca os dados do cliente assim que a página carrega


//   var validar_user = false;
// function validarNome() {
//   var usuario = inputUsuario.value;
//   /* Verifica se o usuario tem mais de 6 caractéres */
//   if (usuario.length < 6) {
//     inputUsuario.classList.add("red");
//     inputUsuario.classList.remove("green");
//     validar_user = false;
//   } else {
//     inputUsuario.classList.remove("red");
//     inputUsuario.classList.add("green");
//     validar_user = true;
//   }
// }
// //Validando Senha do Usuario
// var validar_senha = false;
// function validarSenha() {
//   var senha = inputSenha.value;
//   var fortificador =
//     /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!$*&@#])([0-9a-zA-Z!$*&@#]){8,}$/;
//   /*

//   (?=.*\d)         // deve conter ao menos um dígito
//   (?=.*[a-z])      // deve conter ao menos uma letra minúscula
//   (?=.*[A-Z])      // deve conter ao menos uma letra maiúscula
//   (?=.*[$*&@#!])    // deve conter ao menos um caractere especial

//   ([0-9a-zA-Z$*&@#]): é uma classe de caracteres contendo números, 
//   letras e os caracteres especiais que você está considerando. 
//   Eles estão dentro de parênteses para formar um grupo de captura

// */
//   /* Verifica se a senha está com as requisições acima */
//   if (fortificador.test(senha)) {
//     inputSenha.classList.remove("red");
//     inputSenha.classList.add("green");
//     validar_senha = true;
//   } else {
//     inputSenha.classList.add("red");
//     inputSenha.classList.remove("green");
//     validar_senha = false;
//   }
// }

// //Validando Contato do Usuario
// var validar_contato = false;
// function validarContato() {
//   var contato = inputContato.value;
//   if (contato.length <= 7 || contato.length >= 12){
//     // Valida números telefones celulares para contato
//     inputContato.classList.add("red");
//     inputContato.classList.remove("green");
//     validar_contato = false;
//   } else {
//     inputContato.classList.remove("red");
//     inputContato.classList.add("green");
//     validar_contato = true;
//   }
// }


// function validar_atualizacao_func_user() {
//   if (validar_user) {
//     confirmar_user();
//   } else {
//     Swal.fire({
//       icon: 'error',
//       title: 'Ops...',
//       text: 'Usuário inválido. Deve conter mais de 6 letras!',
//       })
//   }
// }
// function validar_atualizacao_func_senha() {
//   if (validar_senha) {
//     confirmar_senha();
//   } else {
//     Swal.fire({
//       icon: 'error',
//       title: 'Ops...',
//       text: 'Senha inválida. Deve conter no mínimo 1 letra maiúscula, 1 caracter especial e 1 número!',
//       })
//   }
// }
// function validar_atualizacao_func_contato() {
//   if (validar_contato) {
//     confirmar_telefone();
//   } else {
//     Swal.fire({
//       icon: 'error',
//       title: 'Ops...',
//       text: 'Telefone inválido. Deve conter de 8 a 11 dígitos!',
//       })
//   }
// }

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
  divChangeNome.remove();

  divContainerNome.innerHTML += `
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
        <input class="input-user-pass-telefone" id="inputTelefone" type="text">
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

// function alterar_senha() {
//   btn_edit_pass.remove();

//   div_content_pass.innerHTML += `
//     <div id="div_change_pass" class="div_input">
//         <label for="change_pass"></label>
//         <input class="input_user_pass_telefone" id="inputSenha" onkeyup="validarSenha()" type="text">
//         <button onclick="validar_atualizacao_func_senha()" class="btn_user_pass_telefone">Confirmar</button>
//         <button onclick="cancelar_senha()" class="btn_user_pass_telefone_remove">Cancelar</button>
//     </div>
//     `;
// }
// function cancelar_senha() {
//   div_change_pass.remove();

//   div_content_pass.innerHTML += `
//     <button onclick="alterar_senha()" id="btn_edit_pass" class="btn_edit">
//         Editar
//     </button>
//     `;
// }
// //ATRIBUIR FETCH AO EVENTO PARA ALTERAR DADOS NO BANCO COM METODO PUT

// function confirmar_senha() {
//   fetch(`/usuarios/confirmar_senha/${sessionStorage.getItem("USER_USUARIO")}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//       senha: btoa(inputSenha.value),
//       idPerfil: sessionStorage.ID_PERFIL
//     })
//   }).then(function (resposta) {

//     if (resposta.ok) {
//       Swal.fire({
//         icon: 'success',
//         title: 'Parabéns',
//         text: 'Senha atualizado com sucesso!',
//       })

//     } else if (resposta.status == 404) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Ops...',
//         text: 'Deu 404!',
//       })
//     } else {
//       throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
//     }
//   }).catch(function (resposta) {
//     console.log(`#ERRO: ${resposta}`);
//   })

//   var senha = inputSenha.value
//   var visualSenha = ""

//   for (var a = 0; a < senha.length; a++) {
//     visualSenha += '*'
//   }

//   span_senha.innerHTML = visualSenha;

//   div_change_pass.remove();

//   div_content_pass.innerHTML += `
//     <button onclick="alterar_senha()" id="btn_edit_pass" class="btn_edit">
//         Editar
//     </button>
//     `;
// }

// function alterar_telefone() {
//   btn_edit_telefone.remove();

//   div_content_telefone.innerHTML += `
//     <div id="div_change_telefone" class="div_input">
//         <label for="change_telefone"></label>
//         <input class="input_user_pass_telefone" id="inputContato" onkeyup="validarContato()" type="number">
//         <button onclick="validar_atualizacao_func_contato()" class="btn_user_pass_telefone">Confirmar</button>
//         <button onclick="cancelar_telefone()" class="btn_user_pass_telefone_remove">Cancelar</button>
//     </div>
//     `;
// }
// function cancelar_telefone() {
//   div_change_telefone.remove();

//   div_content_telefone.innerHTML += `
//     <button onclick="alterar_telefone()" id="btn_edit_telefone" class="btn_edit">
//         Editar
//     </button>
//     `;
// }

// //ATRIBUIR FETCH AO EVENTO PARA ALTERAR DADOS NO BANCO COM METODO PUT
// function confirmarTelefone() {
//   fetch(`/usuarios/confirmarTelefone/${sessionStorage.getItem("USER_USUARIO")}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//       telefone: Number(inputContato.value),
//       idPerfil: sessionStorage.ID_PERFIL
//     })
//   }).then(function (resposta) {

//     if (resposta.ok) {
//       Swal.fire({
//         icon: 'success',
//         title: 'Parabéns',
//         text: 'Telefone atualizado com sucesso!',
//       })

//     } else if (resposta.status == 404) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Ops...',
//         text: 'Deu 404!',
//       })
//     } else {
//       throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
//     }
//   }).catch(function (resposta) {
//     console.log(`#ERRO: ${resposta}`);
//   })
//   span_telefone.innerHTML = Number(inputContato.value);

//   div_change_telefone.remove();

//   div_content_telefone.innerHTML += `
//     <button onclick="alterar_telefone()" id="btn_edit_telefone" class="btn_edit">
//         Editar
//     </button>
//     `;
// }

// function logout() {

//   Swal.fire({
//     title: 'Você deseja sair?',
//     text: "",
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonColor: '#3085d6',
//     cancelButtonColor: '#d33',
//     confirmButtonText: 'Sim, desejo sair!'
//   }).then((result) => {
//     if (result.isConfirmed) {
//       Swal.fire(
//         'Logout',
//         'Você deslogou com sucesso!',
//         'success'
//       )
//     }
//     setTimeout(() => sessionStorage.clear(), link_login(), 15000)
//   })
// }
// 
// //link para página do login, quando fazer o logout
// function link_login() {
//   setTimeout(() => window.location.href = "index.html", 4000);
// }

// function link_index() {
//   window.location.href = "index.html";
// }


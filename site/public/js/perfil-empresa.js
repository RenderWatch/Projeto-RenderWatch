
var idUser = sessionStorage.ID_USUARIO;

function dadosEmpresa() {
    if (sessionStorage.ID_EMPRESA > 0) {
        mostrarDadosEmpresa();
    }
}

function mostrarDadosEmpresa() {
    
    fetch(`/empresa/mostrarDadosEmpresa/${idUser}`).then(function (resposta) {
        if (resposta.ok) {
            
            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                
                    var dados = resposta[0];
                    sessionStorage.ID_EMPRESA = dados.id;

                    
                containerInfoEmpresa.innerHTML = `
                <div id="divContainerRazaoSocial" class="info-empresa container-info-empresa">
                            <div id="divRazaoSocial" class="div-content">
                                <h4 class="titulo">Razão Social: </h4>
                                <h4 class="info"><span id="spanRazaoSocial">${dados.razao_social}</span></h4>
                            </div>
                            <button onclick="alterarRazaoSocial()" id="btnEditRazaoSocial" class="btn-edit">
                                Editar
                            </button>
                        </div>
                        <div id="divContainerCnpj" class="info-empresa">
                            <div id="divCnpj" class="div-content">
                                <h4 class="titulo">CNPJ: </h4>
                                <h4 class="info"><span id="spanCnpj">${dados.cnpj}</span></h4>
                            </div>
                            <button onclick="alterarCnpj()" id="btnEditCnpj" class="btn-edit">
                                Editar
                            </button>
                        </div>
                        <div id="divContainerTelefone" class="info-empresa">
                            <div id="divTelefone" class="div-content">
                                <h4 class="titulo">Telefone: </h4>
                                <h4 class="info"><span id="spanTelefone">${dados.telefone}</span></h4>
                            </div>
                            <button onclick="alterarTelefone()" id="btnEditTelefone" class="btn-edit">
                                Editar
                            </button>
                        </div>
                        <div id="divContainerLogradouro" class="info-empresa">
                            <div id="divLogradouro" class="div-content">
                                <h4 class="titulo">Logradouro: </h4>
                                <h4 class="info"><span id="spanLogradouro">${dados.logradouro}</span></h4>
                            </div>
                            <button onclick="alterarLogradouro()" id="btnEditLogradouro" class="btn-edit">
                                Editar
                            </button>
                        </div>
                        <div id="divContainerNumero" class="info-empresa">
                            <div id="divNumero" class="div-content">
                                <h4 class="titulo">Número: </h4>
                                <h4 class="info"><span id="spanNumero">${dados.numero}</span></h4>
                            </div>
                            <button onclick="alterarNumero()" id="btnEditNumero" class="btn-edit">
                                Editar
                            </button>
                        </div>
                        <div id="divContainerBairro" class="info-empresa">
                            <div id="divBairro" class="div-content">
                                <h4 class="titulo">Bairro: </h4>
                                <h4 class="info"><span id="spanBairro">${dados.bairro}</span></h4>
                            </div>
                            <button onclick="alterarBairro()" id="btnEditBairro" class="btn-edit">
                                Editar
                            </button>
                        </div>
                        <div id="divContainerComplemento" class="info-empresa">
                            <div id="divComplemento" class="div-content">
                                <h4 class="titulo">Complemento: </h4>
                                <h4 class="info"><span id="spanComplemento">${dados.complemento}</span></h4>
                            </div>
                            <button onclick="alterarComplemento()" id="btnEditComplemento" class="btn-edit">
                                Editar
                            </button>
                        </div>
                        <div id="divContainerCidade" class="info-empresa">
                            <div id="divCidade" class="div-content">
                                <h4 class="titulo">Cidade: </h4>
                                <h4 class="info"><span id="spanCidade">${dados.cidade}</span></h4>
                            </div>
                            <button onclick="alterarCidade()" id="btnEditCidade" class="btn-edit">
                                Editar
                            </button>
                        </div>
                        <div id="divContainerEstado" class="info-empresa">
                            <div id="divEstado" class="div-content">
                                <h4 class="titulo">Estado: </h4>
                                <h4 class="info"><span id="spanEstado">${dados.estado}</span></h4>
                            </div>
                            <button onclick="alterarEstado()" id="btnEditEstado" class="btn-edit">
                                Editar
                            </button>
                        </div>
                        <div id="divContainerCep" class="info-empresa">
                            <div id="divCep" class="div-content">
                                <h4 class="titulo">CEP: </h4>
                                <h4 class="info"><span id="spanCep">${dados.cep}</span></h4>
                            </div>
                            <button onclick="alterarCep()" id="btnEditCep" class="btn-edit">
                                Editar
                            </button>
                        </div>
                    </div>
                    <div class="div-btn-excluir">
                        <button onclick="deletarConta()" class="btn-excluir">Excluir Conta</button>
                    </div>
                `

            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });

}

var cnpj;
function validacoesDadosEmpresa() {
    var razaoSocial = inputRazaoSocial.value;
    cnpj = inputCnpj.value;
    var telefone = inputTelefone.value;
    var cep = inputCep.value;
    var logradouro = inputLogradouro.value;
    var numero = inputNumero.value;
    var complemento = inputComplemento.value;
    var bairro = inputBairro.value;
    var cidade = inputCidade.value;
    var estado = inputEstado.value;

    var dadosValidos = true;
    var listaDadosInvalidos = []

    cnpj = cnpj.replace(/\D/g, "");
    telefone = telefone.replace(/\D/g, "");
    cep = cep.replace(/\D/g, "");

    if (razaoSocial.length < 3 || razaoSocial.length > 100) {
        dadosValidos = false;
        listaDadosInvalidos.push('Razao Social')
    }
    if (cnpj.length != 14) {
        dadosValidos = false;
        listaDadosInvalidos.push('CNPJ')
    }
    if (telefone.length < 8 || telefone.length > 15) {
        dadosValidos = false;
        listaDadosInvalidos.push('Telefone')
    }
    if (cep.length != 9) {
        dadosValidos = false;
        listaDadosInvalidos.push('CEP')
    }
    if (logradouro.length < 6) {
        dadosValidos = false;
        listaDadosInvalidos.push('Logradouro')
    }
    if (/^\d{3,}$/.test(numero) == false) {
        dadosValidos = false;
        listaDadosInvalidos.push('Número')
    }
    if (/^[a-zA-Z\s-ãáéíóúçñ]+$/.test(bairro) == false || bairro.length < 3) {
        dadosValidos = false;
        listaDadosInvalidos.push('Bairro')
    }
    if (cidade.length < 2 || /^[a-zA-Z\s-ãáéíóúçñ]+$/.test(cidade) == false) {
        dadosValidos = false;
        listaDadosInvalidos.push('Cidade')
    }

    if (dadosValidos == true) {
        cadastrarEmpresa();
    } else {
        var fraseDadosInvalidos = "";
        for (var i = 0; i < listaDadosInvalidos.length; i++) {
            if (i == listaDadosInvalidos.length - 1) {
                fraseDadosInvalidos += listaDadosInvalidos[i] + "."
            } else {
                fraseDadosInvalidos += listaDadosInvalidos[i] + ", "
            }
        }

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Houve um erro ao cadastrar a empresa! Dados inválidos: ${fraseDadosInvalidos}`
        })
    }
}

function cadastrarEmpresa() {
    var razaoSocial = inputRazaoSocial.value;
    cnpj = inputCnpj.value;
    var telefone = inputTelefone.value;
    var cep = inputCep.value;
    var logradouro = inputLogradouro.value;
    var numero = inputNumero.value;
    var complemento = inputComplemento.value;
    var bairro = inputBairro.value;
    var cidade = inputCidade.value;
    var estado = inputEstado.value;

    fetch("/empresa/cadastrarEmpresa", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            razaoSocial,
            cnpj,
            telefone,
            cep,
            logradouro,
            numero,
            complemento,
            bairro,
            cidade,
            estado
        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {

            atualizarEmpresaUsuario();

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

function atualizarEmpresaUsuario() {

    cnpj = inputCnpj.value;

    fetch(`/empresa/atualizarEmpresaUsuario/${idUser}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          cnpj,
          idUser,
        })
      }).then(function (resposta) {
    
        if (resposta.ok) {
          Swal.fire({
            icon: 'success',
            title: 'Parabéns',
            text: 'Cadastro realizado com sucesso!',
          })
          
        //   setTimeout(mostrarDadosEmpresa, 3000);
        mostrarDadosEmpresa();
    
        } else if (resposta.status == 404) {
          Swal.fire({
            icon: 'error',
            title: 'Ops...',
            text: 'Deu 404!',
          })
        } else {
          throw ("Houve um erro ao tentar atualizar a empresa do usuário! Código da resposta: " + resposta.status);
        }
      }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
      })
    
    }


    function alterarRazaoSocial() {
        btnEditRazaoSocial.remove();
      
        divContainerRazaoSocial.innerHTML += `
          <div id="divChangeRazaoSocial" class="div-input">
              <label for="change-user"></label>
              <input class="input-empresa-info" id="inputRazaoSocial" type="text">
              <button onclick="confirmarRazaoSocial()" class="btn-empresa-info">Confirmar</button>
              <button onclick="cancelarRazaoSocial()" class="btn-empresa-info-cancelar">Cancelar</button>
          </div>
          `;
      }
      
      
      function cancelarRazaoSocial() {
        divChangeRazaoSocial.remove();
      
        divContainerRazaoSocial.innerHTML += `
          <button onclick="alterarRazaoSocial()" id="btnEditRazaoSocial" class="btn-edit">
              Editar
          </button>
          `;
      }
      
      
      function confirmarRazaoSocial() {
      var newRazaoSocial = inputRazaoSocial.value;
      var idEmpresa = sessionStorage.ID_EMPRESA;
      
      if (newRazaoSocial.length >= 3 && newRazaoSocial.length <= 100) {
        fetch(`/empresa/confirmarRazaoSocial/${idEmpresa}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            razao_social: newRazaoSocial,
            id: sessionStorage.ID_EMPRESA
          })
        }).then(function (resposta) {
      
          if (resposta.ok) {
            Swal.fire({
              icon: 'success',
              title: 'Parabéns',
              text: 'Razão social atualizado com sucesso!',
            })
      
          } else if (resposta.status == 404) {
            Swal.fire({
              icon: 'error',
              title: 'Ops...',
              text: 'Deu 404!',
            })
          } else {
            throw ("Houve um erro ao tentar realizar a alteração! Código da resposta: " + resposta.status);
          }
        }).catch(function (resposta) {
          console.log(`#ERRO: ${resposta}`);
        })
      
        spanRazaoSocial.innerHTML = inputRazaoSocial.value;
        divChangeRazaoSocial.remove();
      
        divContainerRazaoSocial.innerHTML += ` 
          <button onclick="alterarRazaoSocial()" id="btnEditRazaoSocial" class="btn-edit">
            Editar
          </button>
          `;
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Houve um erro ao tentar alterar a razão social! Certifique-se que o texto está entre 3 e 100 caracteres válidos e tente novamente.'
        })
      }
      }
      


    function alterarCnpj() {
        btnEditCnpj.remove();
      
        divContainerCnpj.innerHTML += `
          <div id="divChangeCnpj" class="div-input">
              <label for="change-user"></label>
              <input class="input-empresa-info" id="inputCnpj" type="text">
              <button onclick="confirmarCnpj()" class="btn-empresa-info">Confirmar</button>
              <button onclick="cancelarCnpj()" class="btn-empresa-info-cancelar">Cancelar</button>
          </div>
          `;
      }
      
      
      function cancelarCnpj() {
        divChangeCnpj.remove();
      
        divContainerCnpj.innerHTML += `
          <button onclick="alterarCnpj()" id="btnEditCnpj" class="btn-edit">
              Editar
          </button>
          `;
      }
      
      
      function confirmarCnpj() {
      
      var newCnpj = inputCnpj.value;
      var idEmpresa = sessionStorage.ID_EMPRESA;
      
      if (newCnpj.length == 14) {
        fetch(`/empresa/confirmarCnpj/${idEmpresa}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            cnpj: newCnpj,
            id: sessionStorage.ID_EMPRESA
          })
        }).then(function (resposta) {
      
          if (resposta.ok) {
            Swal.fire({
              icon: 'success',
              title: 'Parabéns',
              text: 'CNPJ atualizado com sucesso!',
            })
      
          } else if (resposta.status == 404) {
            Swal.fire({
              icon: 'error',
              title: 'Ops...',
              text: 'Deu 404!',
            })
          } else {
            throw ("Houve um erro ao tentar realizar a alteração! Código da resposta: " + resposta.status);
          }
        }).catch(function (resposta) {
          console.log(`#ERRO: ${resposta}`);
        })
      
        spanCnpj.innerHTML = inputCnpj.value;
        divChangeCnpj.remove();
      
        divContainerCnpj.innerHTML += ` 
          <button onclick="alterarCnpj()" id="btnEditCnpj" class="btn-edit">
            Editar
          </button>
          `;
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Houve um erro ao tentar alterar o CNPJ! Certifique-se que o CNPJ é composto por 14 digitos.'
        })
      }
      }
      


    function alterarTelefone() {
        btnEditTelefone.remove();
      
        divContainerTelefone.innerHTML += `
          <div id="divChangeTelefone" class="div-input">
              <label for="change-user"></label>
              <input class="input-empresa-info" id="inputTelefone" type="text">
              <button onclick="confirmarTelefone()" class="btn-empresa-info">Confirmar</button>
              <button onclick="cancelarTelefone()" class="btn-empresa-info-cancelar">Cancelar</button>
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
      var newTelefone = inputTelefone.value;
      var idEmpresa = sessionStorage.ID_EMPRESA;
      
      if (newTelefone.length > 8 && newTelefone.length < 15) {
        fetch(`/empresa/confirmarTelefone/${idEmpresa}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            telefone: newTelefone,
            id: sessionStorage.ID_EMPRESA
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
            throw ("Houve um erro ao tentar realizar a alteração! Código da resposta: " + resposta.status);
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
          text: 'Houve um erro ao tentar alterar o telefone! Certifique-se que o telefone tem o DDD na frente.'
        })
      }
      }
      


    function alterarLogradouro() {
        btnEditLogradouro.remove();
      
        divContainerLogradouro.innerHTML += `
          <div id="divChangeLogradouro" class="div-input">
              <label for="change-user"></label>
              <input class="input-empresa-info" id="inputLogradouro" type="text">
              <button onclick="confirmarLogradouro()" class="btn-empresa-info">Confirmar</button>
              <button onclick="cancelarLogradouro()" class="btn-empresa-info-cancelar">Cancelar</button>
          </div>
          `;
      }
      
      
      function cancelarLogradouro() {
        divChangeLogradouro.remove();
      
        divContainerLogradouro.innerHTML += `
          <button onclick="alterarLogradouro()" id="btnEditLogradouro" class="btn-edit">
              Editar
          </button>
          `;
      }
      
      
      function confirmarLogradouro() {
      var newLogradouro = inputLogradouro.value;
      var idEmpresa = sessionStorage.ID_EMPRESA;
      
      if (newLogradouro.length >= 6) {
        fetch(`/empresa/confirmarLogradouro/${idEmpresa}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            logradouro: newLogradouro,
            id: sessionStorage.ID_EMPRESA
          })
        }).then(function (resposta) {
      
          if (resposta.ok) {
            Swal.fire({
              icon: 'success',
              title: 'Parabéns',
              text: 'Logradouro atualizado com sucesso!',
            })
      
          } else if (resposta.status == 404) {
            Swal.fire({
              icon: 'error',
              title: 'Ops...',
              text: 'Deu 404!',
            })
          } else {
            throw ("Houve um erro ao tentar realizar a alteração! Código da resposta: " + resposta.status);
          }
        }).catch(function (resposta) {
          console.log(`#ERRO: ${resposta}`);
        })
      
        spanLogradouro.innerHTML = inputLogradouro.value;
        divChangeLogradouro.remove();
      
        divContainerLogradouro.innerHTML += ` 
          <button onclick="alterarLogradouro()" id="btnEditLogradouro" class="btn-edit">
            Editar
          </button>
          `;
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Houve um erro ao tentar alterar o logradouro! Certifique-se que o texto está correto, tendo no mínimo 6 caracteres.'
        })
      }
      }
      


    function alterarNumero() {
        btnEditNumero.remove();
      
        divContainerNumero.innerHTML += `
          <div id="divChangeNumero" class="div-input">
              <label for="change-user"></label>
              <input class="input-empresa-info" id="inputNumero" type="text">
              <button onclick="confirmarNumero()" class="btn-empresa-info">Confirmar</button>
              <button onclick="cancelarNumero()" class="btn-empresa-info-cancelar">Cancelar</button>
          </div>
          `;
      }
      
      
      function cancelarNumero() {
        divChangeNumero.remove();
      
        divContainerNumero.innerHTML += `
          <button onclick="alterarNumero()" id="btnEditNumero" class="btn-edit">
              Editar
          </button>
          `;
      }
      
      
      function confirmarNumero() {
      var newNumero = inputNumero.value;
      var idEmpresa = sessionStorage.ID_EMPRESA;
      
      if (/^\d{3,}$/.test(newNumero)) {
        fetch(`/empresa/confirmarNumero/${idEmpresa}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            numero: newNumero,
            id: sessionStorage.ID_EMPRESA
          })
        }).then(function (resposta) {
      
          if (resposta.ok) {
            Swal.fire({
              icon: 'success',
              title: 'Parabéns',
              text: 'Número atualizado com sucesso!',
            })
      
          } else if (resposta.status == 404) {
            Swal.fire({
              icon: 'error',
              title: 'Ops...',
              text: 'Deu 404!',
            })
          } else {
            throw ("Houve um erro ao tentar realizar a alteração! Código da resposta: " + resposta.status);
          }
        }).catch(function (resposta) {
          console.log(`#ERRO: ${resposta}`);
        })
      
        spanNumero.innerHTML = inputNumero.value;
        divChangeNumero.remove();
      
        divContainerNumero.innerHTML += ` 
          <button onclick="alterarNumero()" id="btnEditNumero" class="btn-edit">
            Editar
          </button>
          `;
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Houve um erro ao tentar alterar o número! Certifique-se que o número tem no mínimo 2 digitos.'
        })
      }
      }
      


    function alterarBairro() {
        btnEditBairro.remove();
      
        divContainerBairro.innerHTML += `
          <div id="divChangeBairro" class="div-input">
              <label for="change-user"></label>
              <input class="input-empresa-info" id="inputBairro" type="text">
              <button onclick="confirmarBairro()" class="btn-empresa-info">Confirmar</button>
              <button onclick="cancelarBairro()" class="btn-empresa-info-cancelar">Cancelar</button>
          </div>
          `;
      }
      
      
      function cancelarBairro() {
        divChangeBairro.remove();
      
        divContainerBairro.innerHTML += `
          <button onclick="alterarBairro()" id="btnEditBairro" class="btn-edit">
              Editar
          </button>
          `;
      }
      
      
      function confirmarBairro() {
      var newBairro = inputBairro.value;
      var idEmpresa = sessionStorage.ID_EMPRESA;
      
      if (/^[a-zA-Z\s-ãáéíóúçñ]+$/.test(newBairro) && newBairro.length >= 3) {
        fetch(`/empresa/confirmarBairro/${idEmpresa}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            bairro: newBairro,
            id: sessionStorage.ID_EMPRESA
          })
        }).then(function (resposta) {
      
          if (resposta.ok) {
            Swal.fire({
              icon: 'success',
              title: 'Parabéns',
              text: 'Bairro atualizado com sucesso!',
            })
      
          } else if (resposta.status == 404) {
            Swal.fire({
              icon: 'error',
              title: 'Ops...',
              text: 'Deu 404!',
            })
          } else {
            throw ("Houve um erro ao tentar realizar a alteração! Código da resposta: " + resposta.status);
          }
        }).catch(function (resposta) {
          console.log(`#ERRO: ${resposta}`);
        })
      
        spanBairro.innerHTML = inputBairro.value;
        divChangeBairro.remove();
      
        divContainerBairro.innerHTML += ` 
          <button onclick="alterarBairro()" id="btnEditBairro" class="btn-edit">
            Editar
          </button>
          `;
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Houve um erro ao tentar alterar o bairro! Certifique-se que o bairro é válido e tem pelo menos 3 caracteres.'
        })
      }
      }
      


    function alterarComplemento() {
        btnEditComplemento.remove();
      
        divContainerComplemento.innerHTML += `
          <div id="divChangeComplemento" class="div-input">
              <label for="change-user"></label>
              <input class="input-empresa-info" id="inputComplemento" type="text">
              <button onclick="confirmarComplemento()" class="btn-empresa-info">Confirmar</button>
              <button onclick="cancelarComplemento()" class="btn-empresa-info-cancelar">Cancelar</button>
          </div>
          `;
      }
      
      
      function cancelarComplemento() {
        divChangeComplemento.remove();
      
        divContainerComplemento.innerHTML += `
          <button onclick="alterarComplemento()" id="btnEditComplemento" class="btn-edit">
              Editar
          </button>
          `;
      }
      
      
      function confirmarComplemento() {
      var newComplemento = inputComplemento.value;
      var idEmpresa = sessionStorage.ID_EMPRESA;
      
      if (newComplemento.length >= 3 && newComplemento.length <= 100) {
        fetch(`/empresa/confirmarComplemento/${idEmpresa}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            complemento: newComplemento,
            id: sessionStorage.ID_EMPRESA
          })
        }).then(function (resposta) {
      
          if (resposta.ok) {
            Swal.fire({
              icon: 'success',
              title: 'Parabéns',
              text: 'Complemento atualizado com sucesso!',
            })
      
          } else if (resposta.status == 404) {
            Swal.fire({
              icon: 'error',
              title: 'Ops...',
              text: 'Deu 404!',
            })
          } else {
            throw ("Houve um erro ao tentar realizar a alteração! Código da resposta: " + resposta.status);
          }
        }).catch(function (resposta) {
          console.log(`#ERRO: ${resposta}`);
        })
      
        spanComplemento.innerHTML = inputComplemento.value;
        divChangeComplemento.remove();
      
        divContainerComplemento.innerHTML += ` 
          <button onclick="alterarComplemento()" id="btnEditComplemento" class="btn-edit">
            Editar
          </button>
          `;
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Houve um erro ao tentar alterar o complemento! Certifique-se que o texto está correto.'
        })
      }
      }
      


    function alterarCidade() {
        btnEditCidade.remove();
      
        divContainerCidade.innerHTML += `
          <div id="divChangeCidade" class="div-input">
              <label for="change-user"></label>
              <input class="input-empresa-info" id="inputCidade" type="text">
              <button onclick="confirmarCidade()" class="btn-empresa-info">Confirmar</button>
              <button onclick="cancelarCidade()" class="btn-empresa-info-cancelar">Cancelar</button>
          </div>
          `;
      }
      
      
      function cancelarCidade() {
        divChangeCidade.remove();
      
        divContainerCidade.innerHTML += `
          <button onclick="alterarCidade()" id="btnEditCidade" class="btn-edit">
              Editar
          </button>
          `;
      }
      
      
      function confirmarCidade() {
      var newCidade = inputCidade.value;
      var idEmpresa = sessionStorage.ID_EMPRESA;
      
      if (newCidade.length >= 2 && /^[a-zA-Z\s-ãáéíóúçñ]+$/.test(newCidade)) {
        fetch(`/empresa/confirmarCidade/${idEmpresa}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            cidade: newCidade,
            id: sessionStorage.ID_EMPRESA
          })
        }).then(function (resposta) {
      
          if (resposta.ok) {
            Swal.fire({
              icon: 'success',
              title: 'Parabéns',
              text: 'Razão social atualizado com sucesso!',
            })
      
          } else if (resposta.status == 404) {
            Swal.fire({
              icon: 'error',
              title: 'Ops...',
              text: 'Deu 404!',
            })
          } else {
            throw ("Houve um erro ao tentar realizar a alteração! Código da resposta: " + resposta.status);
          }
        }).catch(function (resposta) {
          console.log(`#ERRO: ${resposta}`);
        })
      
        spanCidade.innerHTML = inputCidade.value;
        divChangeCidade.remove();
      
        divContainerCidade.innerHTML += ` 
          <button onclick="alterarCidade()" id="btnEditCidade" class="btn-edit">
            Editar
          </button>
          `;
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Houve um erro ao tentar alterar a cidade! Certifique-se que o texto está correto.'
        })
      }
      }
      


    function alterarEstado() {
        btnEditEstado.remove();
      
        divContainerEstado.innerHTML += `
          <div id="divChangeEstado" class="div-input">
              <label for="change-user"></label>
              <input class="input-empresa-info" id="inputEstado" type="text">
              <button onclick="confirmarEstado()" class="btn-empresa-info">Confirmar</button>
              <button onclick="cancelarEstado()" class="btn-empresa-info-cancelar">Cancelar</button>
          </div>
          `;
      }
      
      
      function cancelarEstado() {
        divChangeEstado.remove();
      
        divContainerEstado.innerHTML += `
          <button onclick="alterarEstado()" id="btnEditEstado" class="btn-edit">
              Editar
          </button>
          `;
      }
      
      
      function confirmarEstado() {
      var newEstado = inputEstado.value;
      var idEmpresa = sessionStorage.ID_EMPRESA;
      
      if (newEstado.length >= 2 && newEstado.length <= 100) {
        fetch(`/empresa/confirmarEstado/${idEmpresa}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            estado: newEstado,
            id: sessionStorage.ID_EMPRESA
          })
        }).then(function (resposta) {
      
          if (resposta.ok) {
            Swal.fire({
              icon: 'success',
              title: 'Parabéns',
              text: 'Estado atualizado com sucesso!',
            })
      
          } else if (resposta.status == 404) {
            Swal.fire({
              icon: 'error',
              title: 'Ops...',
              text: 'Deu 404!',
            })
          } else {
            throw ("Houve um erro ao tentar realizar a alteração! Código da resposta: " + resposta.status);
          }
        }).catch(function (resposta) {
          console.log(`#ERRO: ${resposta}`);
        })
      
        spanEstado.innerHTML = inputEstado.value;
        divChangeEstado.remove();
      
        divContainerEstado.innerHTML += ` 
          <button onclick="alterarEstado()" id="btnEditEstado" class="btn-edit">
            Editar
          </button>
          `;
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Houve um erro ao tentar alterar o Estado!'
        })
      }
      }
      


    function alterarCep() {
        btnEditCep.remove();
      
        divContainerCep.innerHTML += `
          <div id="divChangeCep" class="div-input">
              <label for="change-user"></label>
              <input class="input-empresa-info" id="inputCep" type="text">
              <button onclick="confirmarCep()" class="btn-empresa-info">Confirmar</button>
              <button onclick="cancelarCep()" class="btn-empresa-info-cancelar">Cancelar</button>
          </div>
          `;
      }
      
      
      function cancelarCep() {
        divChangeCep.remove();
      
        divContainerCep.innerHTML += `
          <button onclick="alterarCep()" id="btnEditCep" class="btn-edit">
              Editar
          </button>
          `;
      }
      
      
      function confirmarCep() {
      var newCep = inputCep.value;
      var idEmpresa = sessionStorage.ID_EMPRESA;
      
      if (newCep.length == 9) {
        fetch(`/empresa/confirmarCep/${idEmpresa}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            cep: newCep,
            id: sessionStorage.ID_EMPRESA
          })
        }).then(function (resposta) {
      
          if (resposta.ok) {
            Swal.fire({
              icon: 'success',
              title: 'Parabéns',
              text: 'CEP atualizado com sucesso!',
            })
      
          } else if (resposta.status == 404) {
            Swal.fire({
              icon: 'error',
              title: 'Ops...',
              text: 'Deu 404!',
            })
          } else {
            throw ("Houve um erro ao tentar realizar a alteração! Código da resposta: " + resposta.status);
          }
        }).catch(function (resposta) {
          console.log(`#ERRO: ${resposta}`);
        })
      
        spanCep.innerHTML = inputCep.value;
        divChangeCep.remove();
      
        divContainerCep.innerHTML += ` 
          <button onclick="alterarCep()" id="btnEditCep" class="btn-edit">
            Editar
          </button>
          `;
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Houve um erro ao tentar alterar o CEP! Certifique-se que o CEP tem 9 digitos e é válido.'
        })
      }
      }

      function deletarConta(){
        Swal.fire({
            title: 'Você tem certeza?',
            text: "Você não poderá desfazer essa ação!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, excluir!'
          }).then((result) => {
            if (result.isConfirmed) {
              fetch(`/empresa/deletarEmpresa/${sessionStorage.ID_EMPRESA}`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  id: sessionStorage.ID_EMPRESA
                })
              }).then(function (resposta) {
        
                if (resposta.ok) {
                  Swal.fire({
                    icon: 'success',
                    title: 'Parabéns',
                    text: 'Conta excluída com sucesso!',
                  })

                  window.location.href = "./index.html";
        
                } else if (resposta.status == 404) {
                  Swal.fire({
                    icon: 'error',
                    title: 'Ops...',
                    text: 'Deu 404!',
                  })
                } else {
                  throw ("Houve um erro! Código da resposta: " + resposta.status);
                }
              }).catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
              })
        
              sessionStorage.clear('ID_EMPRESA');
            }
          })
      }
      


    dadosEmpresa();
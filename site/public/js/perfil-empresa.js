
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
                                <h4 class="info"><span id="spanRazaoSocial">${dados.razaoSocial}</span></h4>
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
    if (telefone.length < 8 && telefone.length > 15) {
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

    dadosEmpresa();
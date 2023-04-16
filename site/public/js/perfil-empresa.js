
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

                containerInfoEmpresa.innerHTML = 'hi'

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
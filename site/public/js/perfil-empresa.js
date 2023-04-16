
function dadosEmpresa() {
    if (sessionStorage.ID_EMPRESA) {
        var containerInfoEmpresa = document.getElementById("containerInfoEmpresa");
        containerInfoEmpresa.innerHTML = "Hello"
        mostrarDadosEmpresa();
    } 
}

function mostrarDadosEmpresa() {

}


function cadastrarEmpresa() {
    var razaoSocial = inputRazaoSocial.value;
    var cnpj = inputCnpj.value;
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
            mostrarDadosEmpresa();
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
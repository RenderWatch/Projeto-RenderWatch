var idEmpresa = sessionStorage.ID_EMPRESA;

function buscarMetricasRede() {
    if (sessionStorage.METRICA_BYTES_ENVIADOS >= 0 && sessionStorage.METRICA_BYTES_RECEBIDOS >= 0) {
        fetch(`/rede/buscarMetricasRede/${idEmpresa}`).then(function (resposta) {
            if (resposta.ok) {
                if (resposta.status == 200) {
                    resposta.json().then(function (resposta) {
                        console.log("Dados recebidos: ", JSON.stringify(resposta));

                        var metricas = document.getElementById('trMetricasRede');

                        metricas.innerHTML = `
                <td>${resposta.metrica_bytes_enviados}</td>
                <td>${resposta.metrica_bytes_recebidos}</td>               
                `

                        sessionStorage.METRICA_BYTES_ENVIADOS = resposta.metrica_bytes_enviados;
                        sessionStorage.METRICA_BYTES_RECEBIDOS = resposta.metrica_bytes_recebidos;

                    });

                }
            }
        });
    } else {
        primeiraMetrica();
    }

}

function primeiraMetrica() {
    fetch(`/rede/inserirPrimeiraMetricasRede/${idEmpresa}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
        })
    }).then(function (resposta) {

        if (resposta.ok) {
            sessionStorage.METRICA_BYTES_ENVIADOS = 0;
            sessionStorage.METRICA_BYTES_RECEBIDOS = 0;

            buscarMetricasRede();

        } else {
            throw ("Houve um erro ao tentar realizar a alteração! Código da resposta: " + resposta.status);
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });

}


function alterarInfoMetricaRede() {
    var metricas = document.getElementById('trMetricasRede');
    var btns = document.getElementById('containerEditarMetricaRede');

    metricas.innerHTML = `
            <td><input id="inputMetricaEnviados" class="input-rede" type="number"></td>
            <td><input  id="inputMetricaRecebidos" class="input-rede" type="number"></td>
    `
    btns.innerHTML = `
            <button onclick="confirmarAlteracaoMetricaRede()" id="btnConfirmarMetricaRede" class="btn-edit-rede-verde">
                Confirmar
            </button>
            <button onclick="cancelarAlteracaoMetricaRede()" id="btnCancelarMetricaRede" class="btn-edit-rede-vermelho">
                Cancelar
            </button>
    `

}

function cancelarAlteracaoMetricaRede() {

    buscarMetricasRede()
    var btns = document.getElementById('containerEditarMetricaRede');

    btns.innerHTML = `
    <button onclick="alterarInfoMetricaRede()" id="btnEditMetricaRede" class="btn-edit-rede">
        Editar
    </button>
    `

}

function confirmarAlteracaoMetricaRede() {
    var inputEnviados = inputMetricaEnviados.value;
    var inputRecebidos = inputMetricaRecebidos.value;

    console.log(inputEnviados, inputRecebidos, idEmpresa)

    fetch(`/rede/confirmarMetricasRede`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            inputEnviados,
            inputRecebidos,
            idEmpresa
        })
    }).then(function (resposta) {

        if (resposta.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Parabéns',
                text: 'Métricas atualizadas com sucesso!',
            })

            setTimeout(function() {
                location.reload();
              }, 1500);

        } else if (resposta.status == 404) {
            Swal.fire({
                icon: 'error',
                title: 'Ops...',
                text: 'Houve um erro ao tentar alterar o as métricas de rede!',
            })
        } else {
            throw ("Houve um erro ao tentar realizar a alteração! Código da resposta: " + resposta.status);
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });

    // location.reload();


}


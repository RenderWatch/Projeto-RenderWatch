

var idEmpresa = sessionStorage.ID_EMPRESA;

function buscarDadosCluster() {
    fetch(`/cluster/buscarDadosCluster/${idEmpresa}`).then(function (resposta) {
        if (resposta.ok) {

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));

                for (let i = 0; i < resposta.length; i++) {

                    tabelaContainer.innerHTML += `
                    <div id='nomeCluster${i+1}' class='nome-cluster'>
                        ${resposta[i].nome}
                    </div>
                    <div id="containerCluster${i + 1}">
                        <table id='tabelaCluster${i + 1}' class='"tabela-cluster"'>
                            <tr>
                                <th>ID</th>
                                <th>Máquina</th>
                                <th>Métrica CPU</th>
                                <th>Métrica Disco</th>
                                <th>Métrica Memória</th>
                            </tr>
                        </table>
                        <button id='btnAddMaquinaCluster${i+1}' class='btn-add-maquina' onclick='adicionarMaquina(${resposta[i].id})'>Adicionar Máquina</button>
                    </div>
                                    `
                    var idCluster = resposta[i].id
                    var idTable = i + 1

                    buscarDadosMaquina(idCluster, idTable);
                }
            });


        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });

}


function buscarDadosMaquina(idCluster, idTable) {
    fetch(`/cluster/buscarDadosMaquina/${idCluster}`).then(function (resposta) {
        if (resposta.ok) {

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));

                for (let i = 0; i < resposta.length; i++) {

                    document.getElementById(`tabelaCluster${idTable}`).innerHTML += `
                    <tr>
                        <td>${resposta[i].id}</td>
                        <td>${resposta[i].nome}</td>
                        <td>${resposta[i].metrica_cpu}%</td>
                        <td>${resposta[i].metrica_disco}%</td>
                        <td>${resposta[i].metrica_memoria}%</td>
                    </tr>
                    `
                }
            });

        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}



function adicionarCluster() {

    fetch("/cluster/adicionarCluster", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        idEmpresa: idEmpresa
    })
}).then(function (resposta) {

    console.log("resposta: ", resposta);
    
    if (resposta.ok) {
        
        location.reload();
        
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

function adicionarMaquina(clusterId) {
    fetch("/cluster/adicionarMaquina", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: clusterId
        })
    }).then(function (resposta) {
    
        console.log("resposta: ", resposta);
        
        if (resposta.ok) {
            
            location.reload();
            
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

function excluirTabela(numero) {
    // var container = document.getElementById("tabelaContainer");
    // var tabela = document.getElementById(`tabela${numero}`);
    // var btnAdicionarMaquina = document.getElementById(`btnAdicionarMaquina${numero}`);
    // var btnExcluir = document.getElementById(`btnExcluir${numero}`);
    // container.removeChild(tabela);
    // container.removeChild(btnAdicionarMaquina);
    // container.removeChild(btnExcluir);
}

buscarDadosCluster();


var idEmpresa = sessionStorage.ID_EMPRESA;

function buscarDadosCluster() {
    fetch(`/cluster/buscarDadosCluster/${idEmpresa}`).then(function (resposta) {
        if (resposta.ok) {

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));

                for (let i = 0; i < resposta.length; i++) {

                    tabelaContainer.innerHTML += `
                    <div id='nomeCluster${resposta[i].id}' class='nome-cluster'>
                        ${resposta[i].nome}
                    </div>
                    <span id='containerBtn${resposta[i].id}'>
                    <button onclick="alterarNomeCluster(${resposta[i].id})" id="btnEditNomeCluster${resposta[i].id}" class="btn-edit">
                    Editar Nome
                    </button>
                    <button onclick="deletarCluster(${resposta[i].id})" id="btnDeletarCluster${resposta[i].id}" class="btn-edit">
                    Deletar Cluster
                    </button>
                    </span>
                    <div id="containerCluster${resposta[i].id}">
                        <table id='tabelaCluster${resposta[i].id}' class="tabela-cluster">
                            <tr>
                                <th>ID</th>
                                <th>Máquina</th>
                                <th>Métrica CPU</th>
                                <th>Métrica Disco</th>
                                <th>Métrica Memória</th>
                            </tr>
                        </table>
                        <button id='btnAddMaquinaCluster${i + 1}' class='btn-add-maquina' onclick='adicionarMaquina(${resposta[i].id})'>Adicionar Máquina</button>
                    </div>
                                    `
                    var idCluster = resposta[i].id

                    buscarDadosMaquina(idCluster);
                }
            });


        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });

}


function buscarDadosMaquina(idCluster) {
    console.log(idCluster)
    fetch(`/cluster/buscarDadosMaquina/${idCluster}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status !== 204) { // Verifica se a resposta não está vazia
                resposta.json().then(function (resposta) {
                    console.log("Dados recebidos: ", JSON.stringify(resposta));

                    for (let i = 0; i < resposta.length; i++) {


                        document.getElementById(`tabelaCluster${idCluster}`).innerHTML += `
                            <tr id="trEditInfoMaquina${resposta[i].id}">
                                <td>${resposta[i].id}</td>
                                <td>${resposta[i].nome}</td>
                                <td>${resposta[i].metrica_cpu}%</td>
                                <td>${resposta[i].metrica_disco}%</td>
                                <td>${resposta[i].metrica_memoria}%</td>
                            </tr>
                            <span id="containerEditInfoMaquina${resposta[i].id}">
                                <button onclick="alterarInfoMaquina(
                                    ${resposta[i].id},
                                    '${resposta[i].nome}',
                                      ${resposta[i].metrica_cpu},
                                       ${resposta[i].metrica_disco},
                                        ${resposta[i].metrica_memoria}
                                    )
                                        " id="btnEditInfoMaquina${resposta[i].id}" class="btn-edit">
                                    Editar
                                </button>
                                <button onclick="deletarMaquina(
                                    ${resposta[i].id}
                                    )
                                        " id="btnDeleteMaquina${resposta[i].id}" class="btn-edit">
                                    Deletar
                                </button>
                            </span>
                        `
                    }
                });
            }
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}

function alterarInfoMaquina(idMaquina, nome, metrica_cpu, metrica_disco, metrica_memoria) {

    document.getElementById(`trEditInfoMaquina${idMaquina}`).innerHTML = `
    <td>${idMaquina}</td>
    <td><input id="inputNomeMaquina${idMaquina}" class="input-maquina-info" type="text" value="${nome}" maxlength="20"></td>
    <td><input id="inputMetricaCpuMaquina${idMaquina}" class="input-maquina-info" type="number" value="${metrica_cpu}" oninput="if (this.value.length > 2) this.value = this.value.slice(0, 2);"></td>
    <td><input id="inputMetricaDiscoMaquina${idMaquina}" class="input-maquina-info" type="number" value="${metrica_disco}" oninput="if (this.value.length > 2) this.value = this.value.slice(0, 2);"></td>
    <td><input id="inputMetricaMemoriaMaquina${idMaquina}" class="input-maquina-info" type="number" value="${metrica_memoria}" oninput="if (this.value.length > 2) this.value = this.value.slice(0, 2);"></td>
    `
    document.getElementById(`containerEditInfoMaquina${idMaquina}`).innerHTML = `
    <button onclick="confirmarAlteracaoInfoMaquina(${idMaquina})" class="btn-maquina-info">Confirmar</button>
    <button onclick="cancelaAlteracaoInfoMaquina( ${idMaquina},
        '${nome}',
          ${metrica_cpu},
           ${metrica_disco},
            ${metrica_memoria})" class="btn-maquina-info-cancelar">Cancelar</button>
    `
}


function cancelaAlteracaoInfoMaquina(idMaquina, nome, metrica_cpu, metrica_disco, metrica_memoria) {

    document.getElementById(`trEditInfoMaquina${idMaquina}`).innerHTML = `
                                <td>${idMaquina}</td>
                                <td>${nome}</td>
                                <td>${metrica_cpu}%</td>
                                <td>${metrica_disco}%</td>
                                <td>${metrica_memoria}%</td>
    `

    document.getElementById(`containerEditInfoMaquina${idMaquina}`).innerHTML = `
    <button onclick="alterarInfoMaquina(
        ${idMaquina},
        '${nome}',
          ${metrica_cpu},
           ${metrica_disco},
            ${metrica_memoria}
        )
            " id="btnEditInfoMaquina${idMaquina}" class="btn-edit">
        Editar
    </button>
    `

}

function confirmarAlteracaoInfoMaquina(idMaquina) {

    var inputNome = document.getElementById(`inputNomeMaquina${idMaquina}`).value;
    var inputCpu = document.getElementById(`inputMetricaCpuMaquina${idMaquina}`).value;
    var inputDisco = document.getElementById(`inputMetricaDiscoMaquina${idMaquina}`).value;
    var inputMemoria = document.getElementById(`inputMetricaMemoriaMaquina${idMaquina}`).value;

    if (inputNome.length >= 3 && inputNome.length <= 45 && inputCpu.length >= 1 && inputDisco.length >= 1 && inputMemoria.length >= 1) {
        fetch(`/cluster/confirmarAlteracaoInfoMaquina/${idMaquina}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idMaquina,
                inputNome,
                inputCpu,
                inputDisco,
                inputMemoria
            })
        }).then(function (resposta) {

            if (resposta.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Parabéns',
                    text: 'Informações da máquina atualizadas com sucesso!',
                })

                location.reload();

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

        // document.getElementById(`nomeCluster${clusterId}`).innerHTML = inputNomeCluster;

        document.getElementById(`containerBtn${clusterId}`).innerHTML = ` 
      <button onclick="alterarNomeCluster(${clusterId})" id="btnEditNomeCluster${clusterId}" class="btn-edit">
        Editar
      </button>
      `;

        location.reload();

    }
    else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Houve um erro ao tentar alterar os dados da máquina! Certifique-se de que os dados são válidos! O nome da máquina pode ser no máximo 20 caracteres e os dados de CPU, Disco e Memória podem ser no máximo 2 digitos!'
        })
    }
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


function alterarNomeCluster(clusterId) {
    document.getElementById(`containerBtn${clusterId}`).innerHTML = `
      <div id="divChangeNomeCluster" class="div-input">
          <input class="input-cluster-info" id="inputNomeCluster${clusterId}" type="text">
          <button onclick="confirmarNomeCluster(${clusterId}, inputNomeCluster${clusterId})" class="btn-cluster-info">Confirmar</button>
          <button onclick="cancelarNomeCluster(${clusterId})" class="btn-cluster-info-cancelar">Cancelar</button>
      </div>
      `;
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

function alterarNomeCluster(clusterId) {
    document.getElementById(`containerBtn${clusterId}`).innerHTML = `
      <div id="divChangeNomeCluster" class="div-input">
          <input class="input-cluster-info" id="inputNomeCluster${clusterId}" type="text">
          <button onclick="confirmarNomeCluster(${clusterId}, inputNomeCluster${clusterId})" class="btn-cluster-info">Confirmar</button>
          <button onclick="cancelarNomeCluster(${clusterId})" class="btn-cluster-info-cancelar">Cancelar</button>
      </div>
      `;
}


function cancelarNomeCluster(clusterId) {

    document.getElementById(`containerBtn${clusterId}`).innerHTML = `
      <button onclick="alterarNomeCluster(${clusterId})" id="btnEditNomeCluster${clusterId}" class="btn-edit">
          Editar
      </button>
      `;
}


function confirmarNomeCluster(clusterId, inputNome) {
    var inputNomeCluster = inputNome.value;
    console.log(inputNomeCluster)

    if (inputNomeCluster.length >= 3 && inputNomeCluster.length <= 45) {
        fetch(`/cluster/confirmarNomeCluster/${clusterId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idCluster: clusterId,
                nome: inputNomeCluster
            })
        }).then(function (resposta) {

            if (resposta.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Parabéns',
                    text: 'Nome do cluster atualizado com sucesso!',
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

        // document.getElementById(`nomeCluster${clusterId}`).innerHTML = inputNomeCluster;

        document.getElementById(`containerBtn${clusterId}`).innerHTML = ` 
      <button onclick="alterarNomeCluster(${clusterId})" id="btnEditNomeCluster${clusterId}" class="btn-edit">
        Editar
      </button>
      `;

        location.reload();

    }
    else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Houve um erro ao tentar alterar o nome do cluster! Certifique-se que o texto está entre 3 e 45 caracteres válidos e tente novamente.'
        })
    }
}


function deletarClusterComMaquina(clusterId) {
    fetch(`/cluster/deletarClusterComMaquina/${clusterId}`, {
        method: "DELETE",
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
                text: 'Houve um erro!',
            })

        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });

    return false;
}

function deletarMaquinaDoCluster(clusterId) {
    fetch(`/cluster/deletarMaquinaDoCluster/${clusterId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: clusterId
        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {

            deletarClusterComMaquina(clusterId);

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Houve um erro!',
            })

        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });

    return false;
}

function deletarClusterSemMaquina(clusterId) {
    fetch(`/cluster/deletarClusterSemMaquina/${clusterId}`, {
        method: "DELETE",
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
                text: 'Houve um erro!',
            })

        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });

    return false;
}

function deletarCluster(clusterId) {
    fetch(`/cluster/deletarCluster/${clusterId}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 200) {
                deletarMaquinaDoCluster(clusterId);
                console.log('deu 200')
            } else {
                deletarClusterSemMaquina(clusterId);
            }
            
            
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
    
}

function deletarMaquina(idMaquina) {
    fetch(`/cluster/deletarMaquina/${idMaquina}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idMaquina
        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {

            location.reload();

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Houve um erro!',
            })

        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });

    return false;
}

buscarDadosCluster();
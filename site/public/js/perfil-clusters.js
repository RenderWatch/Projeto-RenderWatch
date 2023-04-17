

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
                        <button id='btnAddMaquinaCluster${i+1}' class='btn-add-maquina' onclick='adicionarMaquina(${resposta[i].id})'>Adicionar Máquina</button>
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
            }
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
        idCluster:clusterId,
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
  

function deletarClusterComMaquina(clusterId){
    fetch(`/cluster/deletarClusterComMaquina/${clusterId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            clusterId: clusterId
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

function deletarClusterSemMaquina(clusterId){
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
            if(resposta.status !== 204){
                deletarClusterComMaquina(clusterId);
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

buscarDadosCluster();
var idCluster = sessionStorage.CLUSTER;
var razaoSocial = sessionStorage.RAZAO_SOCIAL;

var idCluster;
let intervalIds = [];
let exibirProcessos = true;

const ram = document.getElementById('myChart');
const ramChart = new Chart(ram, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      type: 'line',
      label: 'Uso de memória RAM',
      data: [],
      borderColor: 'rgba(0, 123, 255, 1)',
      backgroundColor: 'rgba(0, 123, 255, 0.3)',
      borderWidth: 1,
      fill: 'start'
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return value + '%';
          }
        }
      },
    },
    plugins: {
      legend: {
        display: false
      },
    },
    elements: {
      point: {
        radius: 0
      }
    },
    plugins: {
      filler: {
        propagate: true
      }
    }
  }
});

const disco = document.getElementById('myChart2');
const discoChart = new Chart(disco, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Uso de disco',
      data: [],
      borderColor: 'rgba(255, 99, 132, 1)',
      backgroundColor: 'rgba(255, 99, 132, 0.3)',
      borderWidth: 1,
      fill: 'start'
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return value + '%';
          }
        }
      },
    },
    plugins: {
      legend: {
        display: false
      }
    },
    elements: {
      point: {
        radius: 0
      }
    },
    plugins: {
      filler: {
        propagate: true
      }
    }
  }
});

const cpu = document.getElementById('myChart3');
const cpuChart = new Chart(cpu, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Uso de CPU',
      data: [],
      borderColor: 'rgba(40, 167, 69, 1)',
      backgroundColor: 'rgba(40, 167, 69, 0.3)',
      borderWidth: 1,
      fill: 'start'
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return value + '%';
          }
        }
      },
    },
    plugins: {
      legend: {
        display: false
      }
    },
    elements: {
      point: {
        radius: 0
      }
    },
    plugins: {
      filler: {
        propagate: true
      }
    }
  }
});

/* ------------------------------------------- DADOS DOS GRÁFICOS ------------------------------------------- */

function atualizarDados(idMaquina) {
  fetch(`/dashboard/listar/${idMaquina}`)
    .then(function (resposta) {
      if (resposta.ok) {
        if (resposta.status == 204) {
          throw "Nenhum resultado encontrado!";
        }

        resposta.json().then(function (resposta) {
          //console.log("Dados recebidos: ", JSON.stringify(resposta));

          // Limpar os dados e labels dos gráficos antes de atualizá-los
          cpuChart.data.datasets[0].data = [];
          cpuChart.data.labels = [];
          const metricaCpu = resposta[0].metrica_cpu;

          // Atualizar os dados dos gráficos existentes com os novos valores
          for (let i = 0; i < resposta.length; i++) {
            let dados = resposta[i];
            const componenteNome = dados.componente_nome.toLowerCase();
            const componenteDescricao = dados.componente_descricao;
            const componenteIdentificador = dados.componente_identificador;

            if (componenteNome === "cpu") {
              cpuChart.data.datasets[0].data.push(dados.em_uso);
              cpuChart.data.labels.push(dados.dt_hora_formatada);
              document.getElementById("nome-componente").innerText = componenteDescricao;
              document.getElementById("identificador-componente").innerHTML = componenteIdentificador;
              document.getElementById("porcentCPU").innerHTML = `${parseInt(dados.em_uso)}%`;

              if (dados.em_uso > metricaCpu) {
                porcentCPU.style.color = "orange";
                cardProcessoCPU.style.borderTop = "15px solid orange";
              } else {
                porcentCPU.style.color = "";
                cardProcessoCPU.style.borderTop = "";
              }
            }
          }
          cpuChart.data.labels.reverse();

          // Atualizar os gráficos
          cpuChart.update();

          // finalizarAguardar();
        });
      } else {
        throw "Houve um erro na API!";
      }
    })
    .catch(function (resposta) {
      console.error(resposta);
      // finalizarAguardar();
    });
}



function atualizarDadosRam(idMaquina) {
  fetch(`/dashboard/listarRam/${idMaquina}`)
    .then(function (resposta) {
      if (resposta.ok) {
        if (resposta.status == 204) {
          throw "Nenhum resultado encontrado!";
        }

        resposta.json().then(function (resposta) {
          //console.log("Dados recebidos: ", JSON.stringify(resposta));

          // Limpar os dados e labels dos gráficos antes de atualizá-los
          ramChart.data.datasets[0].data = [];
          ramChart.data.labels = [];
          const metricaRam = resposta[0].metrica_memoria;

          // Atualizar os dados dos gráficos existentes com os novos valores
          for (let i = 0; i < resposta.length; i++) {
            let dados = resposta[i];
            const componenteNome = dados.componente_nome.toLowerCase();

            if (componenteNome === "memoria") {
              ramChart.data.datasets[0].data.push(dados.em_uso);
              ramChart.data.labels.push(dados.dt_hora_formatada);
              document.getElementById("porcentRAM").innerHTML = `${parseInt(dados.em_uso)}%`;

              if (dados.em_uso > metricaRam) {
                porcentRAM.style.color = "orange";
                cardProcessoRam.style.borderTop = "15px solid orange";
              } else {
                porcentRAM.style.color = "";
                cardProcessoRam.style.borderTop = "";
              }
            }
          }

          ramChart.data.labels.reverse();

          // Atualizar os gráficos
          ramChart.update();

          // finalizarAguardar();

        });
      } else {
        throw "Houve um erro na API!";
      }
    })
    .catch(function (resposta) {
      console.error(resposta);
      // finalizarAguardar();
    });
}

function atualizarDadosDisco(idMaquina) {
  fetch(`/dashboard/listarDisco/${idMaquina}`)
    .then(function (resposta) {
      if (resposta.ok) {
        if (resposta.status == 204) {
          throw "Nenhum resultado encontrado!";
        }

        resposta.json().then(function (resposta) {
          //console.log("Dados recebidos: ", JSON.stringify(resposta));

          // Limpar os dados e labels dos gráficos antes de atualizá-los
          discoChart.data.datasets[0].data = [];
          discoChart.data.labels = [];
          const metricaDisco = resposta[0].metrica_disco;

          // Atualizar os dados dos gráficos existentes com os novos valores
          for (let i = 0; i < resposta.length; i++) {
            let dados = resposta[i];
            const componenteNome = dados.componente_nome.toLowerCase();

            if (componenteNome === "disco") {
              discoChart.data.datasets[0].data.push(dados.em_uso);
              discoChart.data.labels.push(dados.dt_hora_formatada);
              document.getElementById("porcentHD").innerHTML = `${parseInt(dados.em_uso)}%`;

              if (dados.em_uso > metricaDisco) {
                porcentHD.style.color = "orange";
                cardProcessoHD.style.borderTop = "15px solid orange";
              } else {
                porcentHD.style.color = "";
                cardProcessoHD.style.borderTop = "";
              }
            }
          }

          discoChart.data.labels.reverse();

          // Atualizar os gráficos
          discoChart.update();
          // finalizarAguardar();
        });
      } else {
        throw "Houve um erro na API!";
      }
    })
    .catch(function (resposta) {
      console.error(resposta);


      // finalizarAguardar();
    });
}


function atualizarDadosProcesso(idMaquina) {
  fetch(`/kpiProcesso/listarProcessos/${idMaquina}`)
    .then(function (resposta) {
      if (resposta.ok) {
        resposta.json().then(function (resposta) {
          console.log("Dados recebidos GRUPO PROCESSOS: ", JSON.stringify(resposta));

          if (resposta.length > 0) {
            console.log("GRUPO PROCESSOS " + resposta)
            divListaProcessos = document.getElementById("div-lista-processos")

            let processos = resposta[0].lista_processos;
            let processosFormatados = processos.replace(/PID:/g, '<br>PID:');

            document.getElementById("total-processos").innerHTML = `<span>${resposta[0].total_processos}</span>`;
            document.getElementById("data-hora").innerHTML = `<span>${resposta[0].dataHoraFormatada}</span>`;
            document.getElementById("total-threads").innerHTML = `<span>${resposta[0].total_threads}</span>`;
            divListaProcessos.innerHTML = `<span style="white-space: pre-line; margin-left: 1vw;"><br>  ${processosFormatados}</span>`;


          } else {
            throw "Nenhum resultado encontrado!";
          }
        });
      } else {
        throw "Houve um erro na API!";
      }
    })
    .catch(function (resposta) {
      console.error(resposta);
    });
}

/* ------------------------------------------- DADOS DAS KPIS ------------------------------------------- */

function listarAlertaCluster(idCluster) {
  fetch(`/kpiProcesso/listarAlertaCluster/${idCluster}`)
    .then(function (resposta) {
      if (resposta.ok) {
        resposta.json().then(function (resposta) {
          //console.log("Dados recebidos: ", JSON.stringify(resposta));

          if (resposta.length > 0) {
            for (let i = 0; i < resposta.length; i++) {
              const dados = resposta[i];
              const quantidade_alertas = dados.quantidade_alertas;
              listarMaquinaMaiorAlertas(idCluster);

              // Inserir os valores nos elementos HTML correspondentes
              document.getElementById("span_alertas_cluster").innerHTML = `<span>${quantidade_alertas}</span>`;
            }
          } else {
            throw "Nenhum resultado encontrado!";
          }

        });
      } else {
        throw "Houve um erro na API!";
      }
    })
    .catch(function (resposta) {
      console.error(resposta);
    });
}

function listarAlertaMaquina(idMaquina) {
  fetch(`/kpiProcesso/listarAlertaMaquina/${idMaquina}`)
    .then(function (resposta) {
      if (resposta.ok) {
        resposta.json().then(function (resposta) {
          //console.log("Dados recebidos: ", JSON.stringify(resposta));

          if (resposta.length > 0) {
            for (let i = 0; i < resposta.length; i++) {
              const dados = resposta[i];
              const quantidade_alertas = dados.quantidade_alertas;

              // Inserir os valores nos elementos HTML correspondentes
              document.getElementById("span_alertas_maquina").innerHTML = `<span>${quantidade_alertas}</span>`;
            }
          } else {
            throw "Nenhum resultado encontrado!";
          }

        });
      } else {
        throw "Houve um erro na API!";
      }
    })
    .catch(function (resposta) {
      console.error(resposta);
    });
}

function listarAlertaComponenteMaquina(idMaquina) {
  fetch(`/kpiProcesso/listarAlertaComponenteMaquina/${idMaquina}`)
    .then(function (resposta) {
      if (resposta.ok) {
        resposta.text().then(function (texto) {
          if (texto) {
            const jsonResposta = JSON.parse(texto);
            console.log("COMPONENTE ALERTA -> Dados recebidos: ", JSON.stringify(jsonResposta));
            
            if (jsonResposta.length > 0) {
              document.getElementById("componente_alerta").innerHTML = `<span>${jsonResposta[0].nome_componente}</span>`;
            } else {
              document.getElementById("componente_alerta").innerHTML = 'Sem alertas';
            }
          } else {
            document.getElementById("componente_alerta").innerHTML = 'Sem alertas';
          }
        });
      } else {
        throw "Houve um erro na API!";
      }
    })
    .catch(function (resposta) {
      console.error(resposta);
    });
}



function listarMaquinaMaiorAlertas(idCluster) {
  fetch(`/kpiProcesso/listarMaquinaMaiorAlertas/${idCluster}`)
    .then(function (resposta) {
      if (resposta.ok) {
        resposta.json().then(function (resposta) {
          console.log("Dados recebidos: ", JSON.stringify(resposta));
          console.log("NUMERO DO CLUSTER EM QUESTAO:" + idCluster)
          console.log("NUMERO DO CLUSTER EM QUESTAO NOME MAQUINA:" + resposta[0].maquinaNome)

          if (resposta.length > 0) {

            console.log("Maquina com maior número de alertas " + resposta[0])
            if (resposta[0].maquinaNome != null) {
              // Inserir os valores nos elementos HTML correspondentes
              document.getElementById("maior_alertas_maquina").innerHTML = `<span>${resposta[0].maquinaNome}</span>`;
            } else {
              document.getElementById("maior_alertas_maquina").innerHTML = 'Sem alertas'
            }

          } else {
            throw "Nenhum resultado encontrado!";
          }

        });
      } else {
        throw "Houve um erro na API!";
      }
    })
    .catch(function (resposta) {
      console.error(resposta);
    });
}

/* ------------------------------------------- DADOS GERAIS ------------------------------------------- */

function atualizarDadosCluster() {
  fetch(`/redeMaquina/listarCluster/${razaoSocial}`)
    .then(function (resposta) {
      if (resposta.ok) {
        if (resposta.status == 204) {
          throw "Nenhum resultado encontrado!";
        }

        resposta.json().then(function (resposta) {
          console.log("Dados recebidos: ", JSON.stringify(resposta));

          const dados = resposta[0];
          idCluster = dados.id;
          sessionStorage.CLUSTER = dados.id;

          if (resposta.length > 0) {
            const clusterContainer = document.querySelector('.selecao-cluster ul');

            for (let i = 0; i < resposta.length; i++) {
              const button = document.createElement('button');
              button.id = `cluster${i + 1}`;
              button.value = `cluster${i + 1}`;
              button.textContent = `Cluster ${i + 1}`;
              button.addEventListener('click', async function () {
                const clusterId = resposta[i].id;

                listarAlertaCluster(clusterId);

                var idPrimeiraMaquina = await buscarIdPrimeiraMaquinaCluster(clusterId);

                atualizarDadosMaquina(clusterId, idPrimeiraMaquina);

                console.log("ID PRIMEIRA MAQUINA NO CLUSTER: " + idPrimeiraMaquina);

                listarAlertaMaquina(idPrimeiraMaquina);
                listarAlertaComponenteMaquina(idPrimeiraMaquina);

                sessionStorage.MAQUINA_ID = idPrimeiraMaquina;

                document.getElementById(`cluster1`).style.backgroundColor = "";

                const clusterButtons = document.querySelectorAll('.selecao-cluster .cluster-button');
                clusterButtons.forEach(btn => btn.classList.remove('active'));

                this.classList.add('active');


                atualizarDadosRede(idPrimeiraMaquina);
                atualizarDados(idPrimeiraMaquina);
                atualizarDadosRam(idPrimeiraMaquina);
                atualizarDadosDisco(idPrimeiraMaquina);

                listarAlertaMaquina(idPrimeiraMaquina);
                listarAlertaComponenteMaquina(idPrimeiraMaquina);


                // Limpa os intervalos anteriores, se existirem
                intervalIds.forEach(intervalId => clearInterval(intervalId));
                intervalIds = [];

                // Define os novos intervalos de atualização
                const intervalIdDados = setInterval(function () {
                  atualizarDados(idPrimeiraMaquina);
                }, 1000);
                intervalIds.push(intervalIdDados);

                const intervalIdRam = setInterval(function () {
                  atualizarDadosRam(idPrimeiraMaquina);
                }, 1000);
                intervalIds.push(intervalIdRam);

                const intervalIdDisco = setInterval(function () {
                  atualizarDadosDisco(idPrimeiraMaquina);
                }, 1000);
                intervalIds.push(intervalIdDisco);

                const intervalIdProcesso = setInterval(function () {
                  atualizarDadosProcesso(idPrimeiraMaquina);
                }, 5000);
                intervalIds.push(intervalIdProcesso);

                // Remover a classe "active" de todos os botões de Cluster
                const maquinaButtons = document.querySelectorAll('.selecao-maquina .maquina-button');
                maquinaButtons.forEach(btn => btn.classList.remove('active'));

                // Adicionar a classe "active" apenas ao botão clicado
                this.classList.add('active');


              });
              button.classList.add('cluster-button');
              const listItem = document.createElement('li');
              listItem.appendChild(button);
              clusterContainer.appendChild(listItem);
            }

            document.getElementById(`cluster1`).style.backgroundColor = "rgb(83, 142, 245)";
          } else {
            var mensagem = document.createElement("span");
            mensagem.innerHTML = "Nenhum resultado encontrado.";
            throw "Nenhum resultado encontrado!";
          }

          atualizarDadosMaquina(resposta[0].id);
        });
      } else {
        throw "Houve um erro na API!";
      }
    })
    .catch(function (resposta) {
      console.error(resposta);
    });
}

async function buscarIdPrimeiraMaquinaCluster(idCluster) {
  return fetch(`/redeMaquina/buscarIdPrimeiraMaquinaCluster/${idCluster}`)
    .then(function (resposta) {
      if (resposta.ok) {
        return resposta.json().then(function (resposta) {
          console.log("DADO SOBRE O ID DA PRIMEIRA MAQUINA NO CLUSTER: ", JSON.stringify(resposta));

          var idMaquina = resposta[0].idMaquina;

          console.log("ID DA MAQUINA AQUI!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! " + idMaquina)
          return idMaquina;
        });
      } else {
        throw "Houve um erro na API!";
      }
    })
    .catch(function (resposta) {
      console.error(resposta);
    });
}


function atualizarDadosMaquina(idCluster, idMaquina) {
  fetch(`/redeMaquina/listarMaquina/${idCluster}`)
    .then(function (resposta) {
      if (resposta.ok) {
        if (resposta.status == 204) {
          throw "Nenhum resultado encontrado!";
        }

        resposta.json().then(function (resposta) {
          console.log("Dados recebidos: ", JSON.stringify(resposta));

          if (resposta.length > 0) {
            const maquinaContainer = document.querySelector('.selecao-maquina ul');
            maquinaContainer.innerHTML = "";
            for (let i = 0; i < resposta.length; i++) {
              const button = document.createElement('button');
              button.value = `maquina${i + 1}`;
              button.textContent = `Máquina ${i + 1}`;
              button.setAttribute('data-id', resposta[i].id);
              button.addEventListener('click', function () {

                const idMaquina = this.getAttribute('data-id');
                atualizarDadosMaquina(idCluster, idMaquina);
                console.log(idMaquina);

                sessionStorage.MAQUINA_ID = resposta[i].id;

                atualizarDadosRede(idMaquina);
                atualizarDados(idMaquina);
                atualizarDadosRam(idMaquina);
                atualizarDadosDisco(idMaquina);

                listarAlertaMaquina(idMaquina);
                listarAlertaComponenteMaquina(idMaquina);


                // Limpa os intervalos anteriores, se existirem
                intervalIds.forEach(intervalId => clearInterval(intervalId));
                intervalIds = [];

                // Define os novos intervalos de atualização
                const intervalIdDados = setInterval(function () {
                  atualizarDados(idMaquina);
                }, 1000);
                intervalIds.push(intervalIdDados);

                const intervalIdRam = setInterval(function () {
                  atualizarDadosRam(idMaquina);
                }, 1000);
                intervalIds.push(intervalIdRam);

                const intervalIdDisco = setInterval(function () {
                  atualizarDadosDisco(idMaquina);
                }, 1000);
                intervalIds.push(intervalIdDisco);

                const intervalIdProcesso = setInterval(function () {
                  atualizarDadosProcesso(idMaquina);
                }, 5000);
                intervalIds.push(intervalIdProcesso);

                // Remover a classe "active" de todos os botões de Cluster
                const maquinaButtons = document.querySelectorAll('.selecao-maquina .maquina-button');
                maquinaButtons.forEach(btn => btn.classList.remove('active'));

                // Adicionar a classe "active" apenas ao botão clicado
                this.classList.add('active');

              });
              button.classList.add('maquina-button');
              const listItem = document.createElement('li');
              listItem.appendChild(button);
              maquinaContainer.appendChild(listItem);
            }

            const dados = resposta.find(maquina => maquina.id == idMaquina);
            if (dados) {
              const nomeMaquina = dados.nome;
              const sistemaOperacional = dados.sistema_operacional;
              const fabricante = dados.fabricante;
              const arquitetura = dados.arquitetura;
              const metricaCpu = dados.metrica_cpu;
              const metricaDisco = dados.metrica_disco;
              const metricaMemoria = dados.metrica_memoria;

              document.getElementById("maquina").innerHTML = nomeMaquina;
              document.getElementById("sistema").innerHTML = sistemaOperacional;
              document.getElementById("fabricante").innerHTML = fabricante;
              document.getElementById("arquitetura").innerHTML = arquitetura;
              document.getElementById("metrica_cpu").innerHTML = `${metricaCpu}%`;
              document.getElementById("metrica_hd").innerHTML = `${metricaDisco}%`;
              document.getElementById("metrica_ram").innerHTML = `${metricaMemoria}%`;

              idMaquina = dados.id;
              atualizarDadosRede();

            } else {
              var mensagem = document.createElement("span");
              mensagem.innerHTML = "Nenhum resultado encontrado.";
              throw "Nenhum resultado encontrado!";
            }
          } else {
            var mensagem = document.createElement("span");
            mensagem.innerHTML = "Nenhum resultado encontrado.";
            throw "Nenhum resultado encontrado!";
          }

        });
      } else {
        throw "Houve um erro na API!";
      }
    })
    .catch(function (resposta) {
      console.error(resposta);
    });
}


function atualizarDadosRede(idMaquina) {
  fetch(`/redeMaquina/listarRede/${idMaquina}`)
    .then(function (resposta) {
      if (resposta.ok) {
        resposta.json().then(function (resposta) {
          console.log("Dados recebidos: ", JSON.stringify(resposta));

          if (resposta.length > 0) {
            for (let i = 0; i < resposta.length; i++) {
              const dados = resposta[i];
              const nomeRede = dados.nome;
              const ipv4 = dados.ipv4;
              const ipv6 = dados.ipv6;
              const nomeDominio = dados.nome_dominio;

              // Inserir os valores nos elementos HTML correspondentes
              document.getElementById("nome_rede").innerHTML = `<span>${nomeRede}</span>`;
              document.getElementById("ipv4").innerHTML = ipv4;
              document.getElementById("ipv6").innerHTML = ipv6;
              document.getElementById("dns").innerHTML = nomeDominio;
            }
          } else {
            throw "Nenhum resultado encontrado!";
          }

        });
      } else {
        throw "Houve um erro na API!";
      }
    })
    .catch(function (resposta) {
      console.error(resposta);
    });
}

function exibirListaProcessos() {
  var listaProcessos = document.getElementById("div-lista-processos");
  if (listaProcessos.style.display === "flex") {
    listaProcessos.style.display = "none";
    iconeListaProcessos.classList.remove("fa-caret-up");
    iconeListaProcessos.classList.add("fa-caret-down");
  } else {
    listaProcessos.style.display = "flex";
    iconeListaProcessos.classList.remove("fa-caret-down");
    iconeListaProcessos.classList.add("fa-caret-up");
  }
}

// Seleciona os elementos necessários
const lista = document.querySelector('.lista');
const containerLista = document.querySelector('.container-lista-processos');

atualizarDadosCluster();
atualizarDadosMaquina(1, 1);
atualizarDadosRede(1);
atualizarDados(1);
atualizarDadosRam(1);
atualizarDadosDisco(1);
atualizarDadosProcesso(1);
listarAlertaMaquina(1);
listarAlertaComponenteMaquina(1);
listarAlertaCluster(idCluster);
listarMaquinaMaiorAlertas(idCluster);


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
          callback: function(value) {
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
          callback: function(value) {
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
          callback: function(value) {
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

var idMaquina = sessionStorage.MAQUINA;

function atualizarDados() {
  fetch(`/dashboard/listar/${idMaquina}`)
    .then(function (resposta) {
      if (resposta.ok) {
        if (resposta.status == 204) {
          var feed = document.getElementById("feed_container");
          var mensagem = document.createElement("span");
          mensagem.innerHTML = "Nenhum resultado encontrado.";
          feed.appendChild(mensagem);
          throw "Nenhum resultado encontrado!";
        }

        resposta.json().then(function (resposta) {
          console.log("Dados recebidos: ", JSON.stringify(resposta));

          var feed = document.getElementById("feed_container");
          feed.innerHTML = "";

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


  
function atualizarDadosRam() {
  fetch(`/dashboard/listarRam/${idMaquina}`)
    .then(function (resposta) {
      if (resposta.ok) {
        if (resposta.status == 204) {
          var feed = document.getElementById("feed_container");
          var mensagem = document.createElement("span");
          mensagem.innerHTML = "Nenhum resultado encontrado.";
          feed.appendChild(mensagem);
          throw "Nenhum resultado encontrado!";
        }

        resposta.json().then(function (resposta) {
          console.log("Dados recebidos: ", JSON.stringify(resposta));

          var feed = document.getElementById("feed_container");
          feed.innerHTML = "";

          
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

function atualizarDadosDisco() {
  fetch(`/dashboard/listarDisco/${idMaquina}`)
    .then(function (resposta) {
      if (resposta.ok) {
        if (resposta.status == 204) {
          var feed = document.getElementById("feed_container");
          var mensagem = document.createElement("span");
          mensagem.innerHTML = "Nenhum resultado encontrado.";
          feed.appendChild(mensagem);
          throw "Nenhum resultado encontrado!";
        }

        resposta.json().then(function (resposta) {
          console.log("Dados recebidos: ", JSON.stringify(resposta));

          var feed = document.getElementById("feed_container");
          feed.innerHTML = "";

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


setInterval(function () {
  atualizarDados();
}, 5000);

setInterval(function () {;
  atualizarDadosRam();
}, 5000);

setInterval(function () {
  atualizarDadosDisco();
}, 5000);
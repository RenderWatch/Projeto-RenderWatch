const ram = document.getElementById('myChart');
const ramChart = new Chart(ram, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      type: 'line',
      label: 'Uso de memoria RAM',
      data: [],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
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
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
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
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
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

          let countCPU = 0;

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
              document.getElementById("identificador-componente").innerHTML = `Identificador: <span>${componenteIdentificador}</span>`;
              document.getElementById("porcentCPU").innerHTML = `${parseInt(dados.em_uso)}%`;

              if (dados.em_uso > metricaCpu) {
                porcentCPU.style.color = "orange";
                cardProcessoCPU.style.borderTop = "15px solid orange";

                countCPU++;
              }
            }
          }

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

          let countRam = 0;

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

                countRam++;
              } 
            }
          }

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

          let countHD = 0;

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

                countHD++;
              } 
            }
          }

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
  const idMaquina = 1; // Substitua pelo ID da máquina desejada
  atualizarDados(idMaquina);
}, 5000);

setInterval(function () {
  const idMaquina = 1; // Substitua pelo ID da máquina desejada
  atualizarDadosRam(idMaquina);
}, 5000);

setInterval(function () {
  const idMaquina = 1; // Substitua pelo ID da máquina desejada
  atualizarDadosDisco(idMaquina);
}, 5000);
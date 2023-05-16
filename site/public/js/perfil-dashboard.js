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

function atualizarDados(idMaquina) {
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
          discoChart.data.datasets[0].data = [];
          discoChart.data.labels = [];
          ramChart.data.datasets[0].data = [];
          ramChart.data.labels = [];

          // Atualizar os dados dos gráficos existentes com os novos valores
          for (let i = 0; i < resposta.length; i++) {
            const dados = resposta[i];
            const componenteNome = dados.componente_nome.toLowerCase();

            if (componenteNome === "cpu") {
              cpuChart.data.datasets[0].data.push(dados.em_uso);
              cpuChart.data.labels.push(dados.dt_hora_formatada);
            } else if (componenteNome === "disco") {
              discoChart.data.datasets[0].data.push(dados.em_uso);
              discoChart.data.labels.push(dados.dt_hora_formatada);
            } else if (componenteNome === "memoria") {
              ramChart.data.datasets[0].data.push(dados.em_uso);
              ramChart.data.labels.push(dados.dt_hora_formatada);
            }
          }

          // Atualizar os gráficos
          cpuChart.update();
          discoChart.update();
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

setInterval(function () {
  atualizarDados();
}, 5000);

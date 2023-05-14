const ram = document.getElementById('myChart');
const disco = document.getElementById('myChart2');
const cpu = document.getElementById('myChart3');
const rede = document.getElementById('myChart4');

// Gerar valores aleatórios para o gráfico de RAM
const ramData = [5, 8, 6, 7, 9, 4, 6, 8, 7, 6, 5];

// Criar o gráfico de RAM com os dados aleatórios
const ramChart = new Chart(ram, {
  type: 'line',
  data: {
    labels: ['13:00:15', '13:00:30', '13:00:45', '13:01:00', '13:01:15', '13:01:30', '13:01:45', '13:02:00', '13:02:15', '13:02:30', '13:02:45'],
    datasets: [{
      type: 'line',
      label: 'Uso de memoria RAM',
      data: ramData,
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

const discoData = [5, 8, 6, 7, 9, 4, 6, 8, 7, 6, 5];

const discoChart = new Chart(disco, {
  type: 'line',
  data: {
    labels: ['13:00:15', '13:00:30', '13:00:45', '13:01:00', '13:01:15', '13:01:30', '13:01:45', '13:02:00', '13:02:15', '13:02:30', '13:02:45'],
    datasets: [{
      label: 'Uso de disco',
      data: discoData,
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

const cpuData = [3, 5, 7, 6, 4, 5, 6, 8, 9, 6, 7];

const cpuChart = new Chart(cpu, {
  type: 'line',
  data: {
    labels: ['13:00:15', '13:00:30', '13:00:45', '13:01:00', '13:01:15', '13:01:30', '13:01:45', '13:02:00', '13:02:15', '13:02:30', '13:02:45'],
    datasets: [{
      label: 'Uso de CPU',
      data: cpuData,
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

          // Atualizar os dados dos gráficos existentes com os novos valores
          for (let i = 0; i < resposta.length; i++) {
            const dados = resposta[i];

            if (dados.componente_nome === "cpu") {
              cpuChart.data.datasets[0].data = dados.em_uso;
              cpuChart.data.labels[i] = dados.dt_hora_formatada; // Incluindo a hora formatada
            }
            if (dados.componente_nome === "disco") {
              discoChart.data.datasets[0].data = dados.em_uso;
              discoChart.data.labels[i] = dados.dt_hora_formatada; // Incluindo a hora formatada
            }
            if (dados.componente_nome === "memoria") {
              ramChart.data.datasets[0].data = dados.em_uso;
              ramChart.data.labels[i] = dados.dt_hora_formatada; // Incluindo a hora formatada
            }
          }

          // Atualizar os gráficos
          cpuChart.update();
          discoChart.update();
          ramChart.update();

          finalizarAguardar();
        });
      } else {
        throw "Houve um erro na API!";
      }
    })
    .catch(function (resposta) {
      console.error(resposta);
      finalizarAguardar();
    });
}

atualizarDados();

setInterval(atualizarDados, 5000);
  

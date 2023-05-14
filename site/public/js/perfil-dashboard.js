const ram = document.getElementById('myChart');
const disco = document.getElementById('myChart2');
const cpu = document.getElementById('myChart3');

// Gerar valores aleatórios para o gráfico de RAM
const ramData = Array.from({ length: 11 }, () => Math.floor(Math.random() * 10) + 1);

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

const discoData = Array.from({ length: 11 }, () => Math.floor(Math.random() * 10) + 1);

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

const cpuData = Array.from({ length: 11 }, () => Math.floor(Math.random() * 10) + 1);

const cpuChart = new Chart(cpu, {
    type: 'line',
    data: {
        labels: ['13:00:15', '13:00:30', '13:00:45', '13:01:00', '13:01:15', '13:01:30', '13:01:45', '13:02:00', '13:02:15', '13:02:30', '13:02:45'],
        datasets: [{
            label: 'Uso de CPU',
            data: cpuData,
            borderWidth: 1
        },]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

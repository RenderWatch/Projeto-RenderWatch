const ram = document.getElementById('myChart');
const disco = document.getElementById('myChart2');
const cpu = document.getElementById('myChart3');
const temperatura = document.getElementById('myChart4');

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

new Chart(disco, {
    type: 'line',
    data: {
        labels: ['13:00:15', '13:00:30', '13:00:45', '13:01:00', '13:01:15', '13:01:30', '13:01:45', '13:02:00', '13:02:15', '13:02:30', '13:02:45'],
        datasets: [{
            label: 'Uso de disco',
            data: [0, 100, 20, 20, 20, 70, 20, 10, 80, 40, 20],
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

new Chart(cpu, {
    type: 'line',
    data: {
        labels: ['13:00:15', '13:00:30', '13:00:45', '13:01:00', '13:01:15', '13:01:30', '13:01:45', '13:02:00', '13:02:15', '13:02:30', '13:02:45'],
        datasets: [{
            label: 'Uso de CPU',
            data: [0, 100, 20, 20, 20, 70, 20, 10, 80, 40, 20],
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

new Chart(temperatura, {
    data: {
        labels: ['13:00:15', '13:00:30', '13:00:45', '13:01:00', '13:01:15', '13:01:30', '13:01:45', '13:02:00', '13:02:15', '13:02:30', '13:02:45'],
        datasets: [{
            type: 'line',
            label: 'Rede',
            data: [0, 60, 100, 60, 40, 20, 70, 30, 80 , 10, 40],
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

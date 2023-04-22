const ram = document.getElementById('myChart');
const disco = document.getElementById('myChart2');
const cpu = document.getElementById('myChart3');
const rede = document.getElementById('myChart4');

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
                beginAtZero: true,
                ticks: {
                    callback: function (value, index, values) {
                        return value + ' GB';
                    }
                }
            }
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return context.dataset.label + ': ' + context.parsed.y + ' GB';
                    }
                }
            }
        },
        animation: {
            duration: 2000, // duração da animação em milissegundos
            easing: 'easeInOutQuart' // curva de animação
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
        },
        animation: {
            duration: 2000, // duração da animação em milissegundos
            easing: 'easeInOutQuart' // curva de animação
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
        },
        animation: {
            duration: 2000, // duração da animação em milissegundos
            easing: 'easeInOutQuart' // curva de animação
        }
    }
});

const redeData = Array.from({ length: 11 }, () => Math.floor(Math.random() * 10) + 1);

const redeChart = new Chart(rede, {
    data: {
        labels: ['13:00:15', '13:00:30', '13:00:45', '13:01:00', '13:01:15', '13:01:30', '13:01:45', '13:02:00', '13:02:15', '13:02:30', '13:02:45'],
        datasets: [{
            type: 'line',
            label: 'Rede',
            data: redeData,
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        animation: {
            duration: 2000, // duração da animação em milissegundos
            easing: 'easeInOutQuart' // curva de animação
        }
    }
});


function atualizarDados() {
    // Gerar novos valores aleatórios para cada gráfico
    const novoRamData = Array.from({ length: 11 }, () => Math.floor(Math.random() * 10) + 1);
    const novoDiscoData = Array.from({ length: 11 }, () => Math.floor(Math.random() * 10) + 1);
    const novoCpuData = Array.from({ length: 11 }, () => Math.floor(Math.random() * 10) + 1);
    const novoRedeData = Array.from({ length: 11 }, () => Math.floor(Math.random() * 10) + 1);

    // Atualizar os dados dos gráficos existentes com os novos valores
    ramChart.data.datasets[0].data = novoRamData;
    ramChart.update();
    discoChart.data.datasets[0].data = novoDiscoData;
    discoChart.update();
    cpuChart.data.datasets[0].data = novoCpuData;
    cpuChart.update();
    redeChart.data.datasets[0].data = novoRedeData;
    redeChart.update();
}

// Atualizar os dados a cada 5 segundos
setInterval(atualizarDados, 15000);

// Adiciona um event listener para o botão de gerar relatório
const botaoGerarRelatorio = document.getElementById('botao-gerar-relatorio');
botaoGerarRelatorio.addEventListener('click', gerarRelatorio);

// Função para gerar o relatório
function gerarRelatorio() {
    // Cria um novo documento PDF
    const doc = new jsPDF();

    // Adiciona os gráficos ao documento
    doc.addImage(ramChart.toBase64Image(), 'JPEG', 15, 15, 80, 40);
    doc.addImage(discoChart.toBase64Image(), 'JPEG', 15, 70, 80, 40);
    doc.addImage(cpuChart.toBase64Image(), 'JPEG', 15, 125, 80, 40);
    doc.addImage(redeChart.toBase64Image(), 'JPEG', 15, 180, 80, 40);

    // Salva o PDF
    doc.save('relatorio.pdf');
}
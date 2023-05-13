// Seleciona os elementos necessários
const lista = document.querySelector('.lista');
const containerLista = document.querySelector('.container-lista-processos');

let exibirProcessos = false;

function toggleProcessos() {
    if (exibirProcessos) {
        containerLista.querySelectorAll('.processo').forEach(el => el.remove());
        exibirProcessos = false;
    } else {
        const totalProcessos = 10;
        for (let i = 1; i <= totalProcessos; i++) {
            const container = document.createElement('div');
            container.classList.add('processo');
            container.innerHTML = ` <div class="lista">
        <span class="span_processo">Processo ${i} </span>
    </div>`;
            containerLista.appendChild(container);
        }
        exibirProcessos = true;
    }
}

lista.addEventListener('click', toggleProcessos)

// Para criar novos botões de cluster e de máquina :D
const clusterContainer = document.querySelector('.selecao-cluster ul');

for (let i = 1; i <= 5; i++) {
    const button = document.createElement('button');
    button.value = `cluster${i}`;
    button.textContent = `Cluster ${i}`;
    const listItem = document.createElement('li');
    listItem.appendChild(button);
    clusterContainer.appendChild(listItem);
}

const maquinaContainer = document.querySelector('.selecao-maquina ul');

for (let i = 1; i <= 5; i++) {
    const button = document.createElement('button');
    button.value = `maquina${i}`;
    button.textContent = `Máquina ${i}`;
    const listItem = document.createElement('li');
    listItem.appendChild(button);
    maquinaContainer.appendChild(listItem);
}

// Para mudar a corzinha dos cards de acordo com a porcentagem de uso :D
const porcentagemRAM = Math.floor(Math.random() * 100);
const porcentagemHD = Math.floor(Math.random() * 100);
const porcentagemCPU = Math.floor(Math.random() * 100);
const porcentagemRede = Math.floor(Math.random() * 100);
porcentRAM.innerHTML = `${porcentagemRAM}%`;
porcentHD.innerHTML = `${porcentagemHD}%`;
porcentCPU.innerHTML = `${porcentagemCPU}%`;
porcentRede.innerHTML = `${porcentagemRede}%`;

if (porcentagemRAM > 70) {
    porcentRAM.style.color = "red";
    cardProcessoRam.style.borderTop = "15px solid red";
} else if (porcentagemRAM > 60) {
    porcentRAM.style.color = "orange";
    cardProcessoRam.style.borderTop = "15px solid orange";
}

if (porcentagemHD > 70) {
    porcentHD.style.color = "red";
    cardProcessoHD.style.borderTop = "15px solid red";
} else if (porcentagemHD > 60) {
    porcentHD.style.color = "orange";
    cardProcessoHD.style.borderTop = "15px solid orange";
}

if (porcentagemCPU > 70) {
    porcentCPU.style.color = "red";
    cardProcessoCPU.style.borderTop = "15px solid red";
} else if (porcentagemCPU > 60) {
    porcentCPU.style.color = "orange";
    cardProcessoCPU.style.borderTop = "15px solid orange";
}

if (porcentagemRede > 70) {
    porcentRede.style.color = "red";
    cardProcessoRede.style.borderTop = "15px solid red";
} else if (porcentagemRede > 60) {
    porcentRede.style.color = "orange";
    cardProcessoRede.style.borderTop = "15px solid orange";
}


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
const ram = document.getElementById('myChart');
const disco = document.getElementById('myChart2');
const cpu = document.getElementById('myChart3');
const temperatura = document.getElementById('myChart4');
const mensal = document.getElementById('myChart5');

new Chart(ram, {
    data: {
        labels: ['13:00:15', '13:00:30', '13:00:45', '13:01:00', '13:01:15', '13:01:30', '13:01:45', '13:02:00', '13:02:15', '13:02:30', '13:02:45'],
        datasets: [{
            type: 'bar',
            label: 'Uso de memoria RAM',
            data: [1.5, 2.0, 1.0, 3.5, 6.4, 2.3, 1.5, 1.8, 5.5, 7.8, 4.0],
            borderWidth: 1
        },
        {
            type: 'line',
            label: 'Uso adequado',
            data: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
            borderWidth: 1
        }
    ]
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

new Chart(mensal, {
    data: {
        labels: ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'],
        datasets: [{
            type: 'bar',
            label: 'Falhas mensais',
            data: [5, 9, 1, 5, 10, 15, 19, 2, 21 , 6, 3, 1],
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
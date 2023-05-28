
var idEmpresa = sessionStorage.ID_EMPRESA;

var dados = `
<style>
body {
    font-family: Arial, sans-serif;
    background-color: rgb(242, 242, 242)
}
ul {
    font-size: 15px;
    line-height: 1.0;
}
h2 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
}
</style>
<div>
    <h2>Relatório de Uso de Máquinas</h2>
</div>`

var dadosAdaptados = `
<style>
body {
    font-family: Arial, sans-serif;
    background-color: rgb(242, 242, 242)
}
ul {
    font-size: 15px;
    line-height: 1.0;
}
h2 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
}
</style>
<div>
    <h2>Relatório de Uso de Máquinas</h2>
</div>`

function getDataAtual() {
    const DataAtual = new Date();
    const ano = DataAtual.getFullYear();
    const mes = String(DataAtual.getMonth() + 1).padStart(2, '0');
    const dia = String(DataAtual.getDate()).padStart(2, '0');
    return `${dia}/${mes}/${ano}`;
}

function getHoraAtual() {
    const HoraAtual = new Date();
    const hora = String(HoraAtual.getHours()).padStart(2, '0');
    const minuto = String(HoraAtual.getMinutes()).padStart(2, '0');
    return `${hora}:${minuto}`;
}

function getMesAnoAtual() {
    const MesAtual = new Date();
    const mes = MesAtual.getMonth();
    const ano = MesAtual.getFullYear();

    const meses = [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro'
    ];

    const data = meses[mes] + " de " + ano;

    return data;
}


let dadosAlertas;
let qtdAlertas;
let clusterComMaisAlertas;
let componenteEmMaisAlertas;
let dadosPorMaquina;
let qtdCluster;
let qtdMaquina;
let dadosCluster;
let dadosClusterMaquina;
let dadosRede;


async function montarDadosRelatorio() {
    await getAlertas();
    await getQtdAlertas();
    await getClusterComMaisAlertas();
    await getComponenteEmMaisAlertas();
    await getDadosPorMaquina();
    await getQtdMaquinas();
    await getQtdClusters();
    await getDadosCluster();
    await getDadosRede();

    dados = `
    <style>
    body {
        font-family: Arial, sans-serif;
        background-color: rgb(242, 242, 242)
    }
    ul {
        font-size: 15px;
        line-height: 1.0;
    }
    h2 {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 10px;
    } 
    .color-pdf-data{
        color: #979797;
    }
    .maior-alerta-cluster{
        color: rgb(83, 142, 245)
    }
    </style>
    <div>
        <h4>Relatório de Uso de Máquinas - ${getMesAnoAtual()}</h4>
        <br> <br>
        <ul>
            <ul>
            <ul>
            <h2>Valores Totais</h2>
            <li>Quantidade de clusters: ${qtdCluster}</li>
            <li>Quantidade de máquinas: ${qtdMaquina}</li>
            <li>Quantidade total de alertas em todos os cluster: ${qtdAlertas}</li>
            ${componenteEmMaisAlertas}
            </ul>
            <ul>
            <h2>Análises Por Cluster</h2>
            ${clusterComMaisAlertas}
            ${dadosCluster}
            </ul>
            <ul>
            <h2>Análises Por Máquina</h2>
            ${dadosPorMaquina}
            </ul>
            <h2>Maquinas que emitiram alerta no mês</h2>
            <ul>
            ${dadosAlertas}
            </ul>
            <h2>Uso de Rede</h2>
            ${dadosRede}
        </ul>
    </div>
    <span>Data e hora da emissão do relatório: ${getDataAtual()} - ${getHoraAtual()}</span>
            `
    return dados;
}

async function gerarPdf() {

    await montarDadosRelatorio();

    var doc = new jsPDF();

    doc.setFontSize(16);
    doc.setTextColor('blue');
    doc.text('Relatório de Alertas', 60, 30);
    doc.line(20, 20, 190, 20)
    doc.setLineWidth(0.5);
    doc.setDrawColor(83, 142, 245);
    doc.line(10, 10, 10, 280);
    doc.setFillColor(242, 242, 242) // Define a cor de fundo 
    doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F') // Desenha um retângulo com a cor de fundo definida
    doc.fromHTML(`<div class="header" style="background-color: blue; padding: 20px;" style="font-size: 14px; line-height: 1.5;"> 
        <h1 style="color: rgb(83, 142, 245);background-color: black; text-align: center;">Relatório Técnico</h1>
        </div>
        <div>
        ${dados}</div>`, 10, 10)
    doc.save('relatório.pdf')

}

async function montarDadosRelatorioAdaptado() {
    await getQtdAlertas();
    await getClusterComMaisAlertas();
    await getComponenteEmMaisAlertas();
    await getQtdMaquinas();
    await getQtdClusters();
    await getDadosClusterMaquinas();

    dadosAdaptados = `
    <style>
    body {
        font-family: Arial, sans-serif;
        background-color: rgb(242, 242, 242)
    }
    ul {
        font-size: 15px;
        line-height: 1.0;
    }
    h2 {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 10px;
    } 
    .color-pdf-data{
        color: #979797;
    }
    .maior-alerta-cluster{
        color: rgb(214, 91, 162)
    }
    </style>
    <div>
        <h4>Relatório de Uso de Máquinas - ${getMesAnoAtual()}</h4>
        <br> <br>
        <ul>
            <ul>
            <ul>
            <h2>Valores Totais</h2>
            <li>Quantidade de clusters: ${qtdCluster}</li>
            <li>Quantidade de máquinas: ${qtdMaquina}</li>
            <li>Quantidade total de alertas em todos os cluster: ${qtdAlertas}</li>
            ${componenteEmMaisAlertas}
            </ul>
            <ul>
            <h2>Análises Por Cluster</h2>
            ${clusterComMaisAlertas}
            ${dadosClusterMaquina}
            </ul>
        </ul>
    </div>
    <span>Data e hora da emissão do relatório: ${getDataAtual()} - ${getHoraAtual()}</span>
            `
    return dadosAdaptados;
}

async function gerarPdfAdaptado() {

    await montarDadosRelatorioAdaptado();

    var docAdaptado = new jsPDF()
    docAdaptado.setFontSize(16);
    docAdaptado.setTextColor('blue');
    docAdaptado.text('Relatório de Alertas', 60, 30);
    docAdaptado.line(20, 20, 190, 20)
    docAdaptado.setLineWidth(0.5);
    docAdaptado.setDrawColor(214, 91, 162);
    docAdaptado.line(10, 10, 10, 280);
    docAdaptado.setFillColor(242, 242, 242) // Define a cor de fundo 
    docAdaptado.rect(0, 0, docAdaptado.internal.pageSize.width, docAdaptado.internal.pageSize.height, 'F') // Desenha um retângulo com a cor de fundo definida
    docAdaptado.fromHTML(`<div class="header" style="background-color: blue; padding: 20px;" style="font-size: 14px; line-height: 1.5;"> 
        <h1 style="color: rgb(214, 91, 162);background-color: black; text-align: center;">Relatório de Negócios</h1>
        </div>
        ${dadosAdaptados}</div>`, 10, 10)
    docAdaptado.save('relatório.pdf')
}


async function getAlertas() {
    return fetch(`/relatorio/buscarDadosAlertas/${idEmpresa}`)
        .then(resposta => {
            if (resposta.ok) {
                return resposta.json().then((json) => {
                    console.log("Dados recebidos: ", JSON.stringify(json));

                    let dadosAlerta = '';
                    for (let i = 0; i < json.length; i++) {
                        dadosAlerta += `<li>Id Máquina: ${json[i].maquinaId} Máquina: ${json[i].maquinaNome} - Id Cluster: ${json[i].clusterId}  Cluster: ${json[i].clusterNome}  </li><p> Alerta ${json[i].componenteAlerta}  Uso: ${(json[i].usoAlerta).toFixed(2)}%</p><p> <span  class="color-pdf-data">Data: ${json[i].dataAlerta}</span> </p>`;
                    }

                    dadosAlertas = dadosAlerta;

                });
            } else {
                throw new Error('Houve um erro na API!')
            }
        }).catch(erro => {
            console.log("Erro na requisição dos dados dos alertas:", erro);
            return '';
        })
}

async function getQtdAlertas() {
    return fetch(`/relatorio/buscarQuantidadeAlertas/${idEmpresa}`)
        .then(resposta => {
            if (resposta.ok) {
                return resposta.json().then((json) => {
                    console.log("Dados recebidos: ", JSON.stringify(json));

                    let qtdAlerta;
                    for (let i = 0; i < json.length; i++) {
                        qtdAlerta = json[i].qtdAlertasMes;
                    }

                    qtdAlertas = qtdAlerta;

                })
            } else {
                throw new Error('Houve um erro na API!')
            }
        }).catch(erro => {
            console.log("Erro na requisição dos dados da quantidade de alertas:", erro);
            return '';
        })
}


async function getQtdClusters() {
    return fetch(`/relatorio/buscarQtdClusters/${idEmpresa}`)
        .then(resposta => {
            if (resposta.ok) {
                return resposta.json().then((json) => {
                    console.log("Dados recebidos: ", JSON.stringify(json));

                    let qtdClusters = json[0].qtdClusters;

                    qtdCluster = qtdClusters;

                })
            } else {
                throw new Error('Houve um erro na API!')
            }
        }).catch(erro => {
            console.log("Erro na requisição da quantidade de clusters:", erro);
            return '';
        })
}


async function getQtdMaquinas() {
    return fetch(`/relatorio/buscarQtdMaquinas/${idEmpresa}`)
        .then(resposta => {
            if (resposta.ok) {
                return resposta.json().then((json) => {
                    console.log("Dados recebidos: ", JSON.stringify(json));

                    let qtdMaquinas = json[0].qtdMaquinas;

                    qtdMaquina = qtdMaquinas;

                })
            } else {
                throw new Error('Houve um erro na API!')
            }
        }).catch(erro => {
            console.log("Erro na requisição da quantidade de maquinas:", erro);
            return '';
        })
}

async function getClusterComMaisAlertas() {
    return fetch(`/relatorio/buscarClusterComMaisAlertas/${idEmpresa}`)
        .then(resposta => {
            if (resposta.ok) {
                return resposta.json().then((json) => {
                    console.log("Dados recebidos: ", JSON.stringify(json));

                    let dadosAlertaCluster = "";

                    for (let i = 0; i < json.length; i++) {
                        dadosAlertaCluster += `<li class="maior-alerta-cluster">Cluster com o maior numero de alertas: </li><p class="maior-alerta-cluster"> Id Cluster: ${json[i].clusterId} - Cluster: ${json[i].clusterNome} - Alertas: ${json[i].totalRegistros}</p><br><br>`;
                    }

                    clusterComMaisAlertas = dadosAlertaCluster;

                })
            } else {
                throw new Error('Houve um erro na API!')
            }
        }).catch(erro => {
            console.log("Erro na requisição dos dados do cluster com a maior quantiade de alertas:", erro);
            return '';
        })
}

async function getComponenteEmMaisAlertas() {
    return fetch(`/relatorio/buscarComponenteEmMaisAlertas/${idEmpresa}`)
        .then(resposta => {
            if (resposta.ok) {
                return resposta.json().then((json) => {
                    console.log("Dados recebidos: ", JSON.stringify(json));

                    let dadosComponenteAlerta = "";

                    for (let i = 0; i < json.length; i++) {
                        dadosComponenteAlerta += `<li>Componente mais presente nos alertas desse mês: </li><p> Componente: ${json[i].nome} - Ocorrências: ${json[i].ocorrencias}</p>`;
                    }

                    componenteEmMaisAlertas = dadosComponenteAlerta;
                })
            } else {
                throw new Error('Houve um erro na API!');
            }
        }).catch(erro => {
            console.log("Erro na requisição dos dados de compomente em maior quantidade de alertas:", erro);
            return '';
        })
}

async function getDadosPorMaquina() {
    return fetch(`/relatorio/buscarDadosPorMaquina/${idEmpresa}`)
        .then(resposta => {
            if (resposta.ok) {
                return resposta.json().then((json) => {
                    console.log("DADOS MAQUINA: Dados recebidos: ", JSON.stringify(json));

                    let dadosMaquina = "";

                    for (let i = 0; i < json.length; i++) {
                        dadosMaquina += `<li>Id Cluster: ${json[i].idCluster} - Nome Cluster: ${json[i].nomeCluster} - Id Máquina: ${json[i].idMaquina} - Nome Máquina: ${json[i].nomeMaquina} </li><p>Quantidade de alertas: ${json[i].qtdAlertas}</p><p>Média de uso de CPU: ${(json[i].usoCpu).toFixed(2)}%</p><p>Média de uso de Memória: ${(json[i].usoMemoria).toFixed(2)}%</p><p> Disco livre: ${(json[i].usoDisco).toFixed(2)}%</p><p>Métrica CPU: ${json[i].metricaCpu}%</p><p>Métrica Memória: ${json[i].metricaMemoria}%</p><p>Métrica Disco: ${json[i].metricaDisco}%</p>`;
                    }

                    dadosPorMaquina = dadosMaquina;

                })
            } else {
                throw new Error('Houve um erro na API!');
            }
        }).catch(erro => {
            console.log("Erro na requisição dos dados de disco livre por máquina:", erro);
            return '';
        })
}


async function getDadosCluster() {
    return fetch(`/relatorio/buscarmediaAlertasPorCluster/${idEmpresa}`)
        .then(resposta => {
            if (resposta.ok) {
                return resposta.json().then((json) => {
                    console.log("DADOS CLUSTER: Dados recebidos: ", JSON.stringify(json));

                    let dadosMediaAlertasPorCluster = "";

                    for (let i = 0; i < json.length; i++) {
                        dadosMediaAlertasPorCluster += `<li> Id Cluster: ${json[i].clusterId} - Cluster: ${json[i].clusterNome}</li><p>Quantidade de máquinas no cluster: ${json[i].totalMaquinas}</p><p>Quantidade de alertas nesse mês: ${json[i].totalAlertas}</p>`;
                    }

                    dadosCluster = dadosMediaAlertasPorCluster;

                })
            } else {
                throw new Error('Houve um erro na API!');
            }
        }).catch(erro => {
            console.log("Erro na requisição dos dados de disco livre por máquina:", erro);
            return '';
        })
}



async function getDadosRede() {
    return fetch(`/relatorio/buscarDadosRede/${idEmpresa}`)
        .then(resposta => {
            if (resposta.ok) {
                return resposta.json().then((json) => {
                    console.log("Dados recebidos: ", JSON.stringify(json));

                    let rede = "";

                    for (let i = 0; i < json.length; i++) {
                        rede += `<li>Nome da Rede: ${json[i].nome} - Nome domínio: ${json[i].nome_dominio}<p>Endereço Mac: ${json[i].endereco_mac}</p><p>IPV4: ${json[i].ipv4}</p><p>IPV6: ${json[i].ipv6}</p></li>`;
                    }

                    dadosRede = rede;

                })
            } else {
                throw new Error('Houve um erro na API!');
            }
        }).catch(erro => {
            console.log("Erro na requisição dos dados de disco livre por máquina:", erro);
            return '';
        })
}


async function getDadosClusterMaquinas() {
    return fetch(`/relatorio/buscarDadosClusterMaquinas/${idEmpresa}`)
        .then(resposta => {
            if (resposta.ok) {
                return resposta.json().then((json) => {
                    console.log("Dados recebidos: ", JSON.stringify(json));

                    let dados = "";

                    for (let i = 0; i < json.length; i++) {
                        dados += `<li> Id Cluster: ${json[i].clusterId} - Cluster: ${json[i].clusterNome}</li><p>Quantidade de máquinas no cluster: ${json[i].totalMaquinas}</p><p>Quantidade de alertas nesse mês: ${json[i].totalAlertas}</p><p>Média de alerta por dia no cluster: ${((json[i].totalAlertas)/30).toFixed(2)}</p><p>Id Máquina com maior número de alertas: ${json[i].maiorAlertaMaquinaId}</p><p>Nome Máquina com maior número de alertas: ${json[i].maiorAlertaMaquinaNome}</p><p>Total de alertas na máquina com maior número de alertas: ${json[i].totalAlertasMaquina}</p><br>`;
                    }

                    dadosClusterMaquina = dados;

                })
            } else {
                throw new Error('Houve um erro na API!');
            }
        }).catch(erro => {
            console.log("Erro na requisição dos dados de disco livre por máquina:", erro);
            return '';
        })
}

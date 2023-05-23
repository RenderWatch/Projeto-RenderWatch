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
let usoCpuPorCluster;
let usoMemoriaPorCluster;
let discoLivrePorCluster;


async function montarDadosRelatorio() {
    await getAlertas();
    await getQtdAlertas();
    await getClusterComMaisAlertas();
    await getComponenteEmMaisAlertas();
    await getUsoCpuPorCluster();
    await getUsoMemoriaPorCluster();
    await getDiscoLivrePorCluster();

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
    </style>
    <div>
        <h3>Relatório de Uso de Máquinas - ${getMesAnoAtual()}</h3>
        <br> <br>
        <ul>
            <ul>
            <ul>
            <h2>Valores totais</h2>
            <li>Quantidade total de alertas em todos os cluster: ${qtdAlertas}</li>
            <br>
            ${componenteEmMaisAlertas}
            <br>
            ${clusterComMaisAlertas}
            <br>
            </ul>
            <h2>Análises Gerais</h2>
            <br> <br>
            <h3>Média de uso de CPU por máquina neste mês:</h3>
            ${usoCpuPorCluster}
            </ul>
            <h3>Média de uso de memória por máquina neste mês:</h3>
            <ul>
            ${usoMemoriaPorCluster}
            </ul>
            <ul>
            <h3>Quantidade de disco livre em cada máquina:</h3>
            ${discoLivrePorCluster}
            </ul>
            <h2>Maquinas que emitiram alerta no mês</h2>
            <ul>
            ${dadosAlertas}
            </ul>
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

function gerarPdfAdaptado() {
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
        <h1 style="color: rgb(214, 91, 162);background-color: black; text-align: center;">Relatório Adaptado</h1>
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
                        dadosAlerta += `<li>Id Cluster: ${json[i].clusterId}  Cluster: ${json[i].clusterNome} - Id Máquina: ${json[i].maquinaId} Máquina ${json[i].maquinaNome} </li><p> Alerta ${json[i].componenteAlerta}  Uso: ${(json[i].usoAlerta).toFixed(2)} </p><p> Data: ${json[i].dataAlerta} </p>`;
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

async function getClusterComMaisAlertas() {
    return fetch(`/relatorio/buscarClusterComMaisAlertas/${idEmpresa}`)
        .then(resposta => {
            if (resposta.ok) {
                return resposta.json().then((json) => {
                    console.log("Dados recebidos: ", JSON.stringify(json));

                    let dadosAlertaCluster = "";

                    for (let i = 0; i < json.length; i++) {
                        dadosAlertaCluster += `<li>Cluster com o maior numero de alertas: </li><p> Id Cluster: ${json[i].clusterId} - Cluster: ${json[i].clusterNome} - Alertas: ${json[i].totalRegistros}</p>`;
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


async function getUsoCpuPorCluster() {
    return fetch(`/relatorio/buscarUsoCpuPorCluster/${idEmpresa}`)
        .then(resposta => {
            if (resposta.ok) {
                return resposta.json().then((json) => {
                    console.log("Dados recebidos: ", JSON.stringify(json));

                    let dadosUsoCpu = "";

                    for (let i = 0; i < json.length; i++) {
                        dadosUsoCpu += `<li>Id Cluster: ${json[i].idCluster} - Nome Cluster: ${json[i].nomeCluster} - Id Máquina: ${json[i].idMaquina} - Nome Máquina: ${json[i].nomeMaquina} </li><p> Média de uso: ${(json[i].average_uso).toFixed(2)}%</p>`;
                    }

                    usoCpuPorCluster = dadosUsoCpu;

                })
            } else {
                throw new Error('Houve um erro na API!');
            }
        }).catch(erro => {
            console.log("Erro na requisição dos dados de uso de CPU por máquina:", erro);
            return '';
        })
}

async function getUsoMemoriaPorCluster() {
    return fetch(`/relatorio/buscarUsoMemoriaPorCluster/${idEmpresa}`)
        .then(resposta => {
            if (resposta.ok) {
                return resposta.json().then((json) => {
                    console.log("Dados recebidos: ", JSON.stringify(json));

                    let dadosUsoMemoria = "";

                    for (let i = 0; i < json.length; i++) {
                        dadosUsoMemoria += `<li>Id Cluster: ${json[i].idCluster} - Nome Cluster: ${json[i].nomeCluster} - Id Máquina: ${json[i].idMaquina} - Nome Máquina: ${json[i].nomeMaquina} </li><p> Média de uso: ${(json[i].average_uso).toFixed(2)}%</p>`;
                    }

                    usoMemoriaPorCluster = dadosUsoMemoria;

                })
            } else {
                throw new Error('Houve um erro na API!');
            }
        }).catch(erro => {
            console.log("Erro na requisição dos dados de uso de memória por máquina:", erro);
            return '';
        })
}


async function getDiscoLivrePorCluster() {
    return fetch(`/relatorio/buscarDiscoLivrePorCluster/${idEmpresa}`)
        .then(resposta => {
            if (resposta.ok) {
                return resposta.json().then((json) => {
                    console.log("Dados recebidos: ", JSON.stringify(json));

                    let dadosDiscoLivre = "";

                    for (let i = 0; i < json.length; i++) {
                        dadosDiscoLivre += `<li>Id Cluster: ${json[i].idCluster} - Nome Cluster: ${json[i].nomeCluster} - Id Máquina: ${json[i].idMaquina} - Nome Máquina: ${json[i].nomeMaquina} </li><p> Média de uso: ${(json[i].discoLivrePercentagem).toFixed(2)}%</p>`;
                    }

                    discoLivrePorCluster = dadosDiscoLivre;

                })
            } else {
                throw new Error('Houve um erro na API!');
            }
        }).catch(erro => {
            console.log("Erro na requisição dos dados de disco livre por máquina:", erro);
            return '';
        })
}


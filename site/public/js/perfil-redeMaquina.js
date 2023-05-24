var razaoSocial = sessionStorage.RAZAO_SOCIAL;
var idCluster;
var idMaquina;

function atualizarDadosCluster() {
    fetch(`/redeMaquina/listarCluster/${razaoSocial}`)
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

                    const dados = resposta[0];
                    idCluster = dados.id;

                    var feed = document.getElementById("feed_container");
                    feed.innerHTML = "";
                    if (resposta.length > 0) {
                        const clusterContainer = document.querySelector('.selecao-cluster ul');

                        for (let i = 0; i < resposta.length; i++) {
                            const button = document.createElement('button');
                            button.value = `cluster${i + 1}`;
                            button.textContent = `Cluster ${i + 1}`;
                            const listItem = document.createElement('li');
                            listItem.appendChild(button);
                            clusterContainer.appendChild(listItem);

                            document.getElementById("cluster").innerHTML = `Cluster ${idCluster}`;

                        }
                    } else {
                        var mensagem = document.createElement("span");
                        mensagem.innerHTML = "Nenhum resultado encontrado.";
                        feed.appendChild(mensagem);
                        throw "Nenhum resultado encontrado!";
                    }

                    atualizarDadosMaquina();
                    for (let i = 0; i < resposta.length; i++) {
                        const dados = resposta[i];
                        const nomeRede = dados.nome;
                        const ipv4 = dados.ipv4;
                        const ipv6 = dados.ipv6;
                        const nomeDominio = dados.nome_dominio;

                        // Inserir os valores nos elementos HTML correspondentes
                        document.getElementById("nome_rede").innerHTML = nomeRede;
                        document.getElementById("ipv4").innerHTML = ipv4;
                        document.getElementById("ipv6").innerHTML = ipv6;
                        document.getElementById("dns").innerHTML = nomeDominio;
                    }
                });
            } else {
                throw "Houve um erro na API!";
            }
        })
        .catch(function (resposta) {
            console.error(resposta);
        });
}

function atualizarDadosMaquina() {
    fetch(`/redeMaquina/listarMaquina/${idCluster}`)
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

                    const dados = resposta[0];
                    idMaquina = dados.id;
                    sessionStorage.MAQUINA = dados.id;

                    var feed = document.getElementById("feed_container");
                    feed.innerHTML = "";
                    if (resposta.length > 0) {
                        const maquinaContainer = document.querySelector('.selecao-maquina ul');

                        for (let i = 0; i < resposta.length; i++) {
                            const button = document.createElement('button');
                            button.value = `maquina${i + 1}`;
                            button.textContent = `Máquina ${i + 1}`;
                            button.setAttribute('data-id', `maquina${i + 1}`);
                            const listItem = document.createElement('li');
                            listItem.appendChild(button);
                            maquinaContainer.appendChild(listItem);

                            document.getElementById("maquina").innerHTML = `Máquina ${idMaquina}`;

                        }

                        const nomeMaquina = dados.nome;
                        const sistemaOperacional = dados.sistema_operacional;
                        const fabricante = dados.fabricante;
                        const arquitetura = dados.arquitetura;
                        const metricaCpu = dados.metrica_cpu;
                        const metricaDisco = dados.metrica_disco;
                        const metricaMemoria = dados.metrica_memoria;

                        document.getElementById("apelido").innerHTML = `<span>${nomeMaquina}</span>`;
                        document.getElementById("sistema").innerHTML = sistemaOperacional;
                        document.getElementById("fabricante").innerHTML = fabricante;
                        document.getElementById("arquitetura").innerHTML = arquitetura;
                        document.getElementById("metrica_cpu").innerHTML = metricaCpu;
                        document.getElementById("metrica_hd").innerHTML = metricaDisco;
                        document.getElementById("metrica_ram").innerHTML = metricaMemoria;
                    } else {
                        var mensagem = document.createElement("span");
                        mensagem.innerHTML = "Nenhum resultado encontrado.";
                        feed.appendChild(mensagem);
                        throw "Nenhum resultado encontrado!";
                    }

                    atualizarDadosRede();
                });
            } else {
                throw "Houve um erro na API!";
            }
        })
        .catch(function (resposta) {
            console.error(resposta);
        });
}

function atualizarDadosRede() {
    fetch(`/redeMaquina/listarRede/${idMaquina}`)
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (resposta) {
                    console.log("Dados recebidos: ", JSON.stringify(resposta));

                    var feed = document.getElementById("feed_container");
                    feed.innerHTML = "";

                    if (resposta.length > 0) {
                        for (let i = 0; i < resposta.length; i++) {
                            const dados = resposta[i];
                            const nomeRede = dados.nome;
                            const ipv4 = dados.ipv4;
                            const ipv6 = dados.ipv6;
                            const nomeDominio = dados.nome_dominio;
    
                            // Inserir os valores nos elementos HTML correspondentes
                            document.getElementById("nome_rede").innerHTML = `<span>${nomeRede}</span>`;
                            document.getElementById("ipv4").innerHTML = ipv4;
                            document.getElementById("ipv6").innerHTML = ipv6;
                            document.getElementById("dns").innerHTML = nomeDominio;



                        }
                    } else {
                        var mensagem = document.createElement("span");
                        mensagem.innerHTML = "Nenhum resultado encontrado.";
                        feed.appendChild(mensagem);
                        throw "Nenhum resultado encontrado!";
                    }
                    // atualizarDadosProcesso();
                });
            } else {
                throw "Houve um erro na API!";
            }
        })
        .catch(function (resposta) {
            console.error(resposta);
        });
}

// function atualizarDadosProcesso() {
//     fetch(`/redeMaquina/listarProcessos/${idMaquina}`)
//         .then(function (resposta) {
//             if (resposta.ok) {
//                 resposta.json().then(function (resposta) {
//                     console.log("Dados recebidos: ", JSON.stringify(resposta));

//                     var feed = document.getElementById("feed_container");
//                     feed.innerHTML = "";

//                     if (resposta.length >= 0) {
                        
//                             const dados = resposta[i];
//                             const total_processos = dados.total_processos;
//                             const total_threads = dados.total_threads;
                        
//                             document.getElementById("total-processos").innerHTML = `<span>${total_processos}</span>`;
//                             document.getElementById("total-threads").innerHTML = `<span>${total_threads}</span>`;
                    
                        
//                     } else {
//                         var mensagem = document.createElement("span");
//                         mensagem.innerHTML = "Nenhum resultado encontrado.";
//                         feed.appendChild(mensagem);
//                         throw "Nenhum resultado encontrado!";
//                     }

                    

//                 });
//             } else {
//                 throw "Houve um erro na API!";
//             }
//         })
//         .catch(function (resposta) {
//             console.error(resposta);
//         });
// }


atualizarDadosCluster();

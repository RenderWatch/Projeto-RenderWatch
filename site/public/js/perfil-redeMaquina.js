var razaoSocial = sessionStorage.RAZAO_SOCIAL;
var idCluster;
let intervalIds = [];
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
                    sessionStorage.CLUSTER = dados.id;

                    var feed = document.getElementById("feed_container");
                    feed.innerHTML = "";
                    if (resposta.length > 0) {
                        const clusterContainer = document.querySelector('.selecao-cluster ul');


                        for (let i = 0; i < resposta.length; i++) {
                            const button = document.createElement('button');
                            button.value = `cluster${i + 1}`;
                            button.textContent = `Cluster ${i + 1}`;
                            button.addEventListener('click', function () {
                                const clusterId = resposta[i].id;
                                atualizarDadosMaquina(clusterId);

                                listarAlertaCluster(clusterId);

                                // Remover a classe "active" de todos os botões de Cluster
                                const clusterButtons = document.querySelectorAll('.selecao-cluster .cluster-button');
                                clusterButtons.forEach(btn => btn.classList.remove('active'));

                                // Adicionar a classe "active" apenas ao botão clicado
                                this.classList.add('active');

                            });
                            button.classList.add('cluster-button');
                            const listItem = document.createElement('li');
                            listItem.appendChild(button);
                            clusterContainer.appendChild(listItem);
                        }
                    } else {
                        var mensagem = document.createElement("span");
                        mensagem.innerHTML = "Nenhum resultado encontrado.";
                        throw "Nenhum resultado encontrado!";
                    }

                    atualizarDadosMaquina(resposta[0].id);
                });
            } else {
                throw "Houve um erro na API!";
            }
        })
        .catch(function (resposta) {
            console.error(resposta);
        });
}

function atualizarDadosMaquina(idCluster, idMaquina) {
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

                    if (resposta.length > 0) {
                        const maquinaContainer = document.querySelector('.selecao-maquina ul');
                        maquinaContainer.innerHTML = "";
                        for (let i = 0; i < resposta.length; i++) {
                            const button = document.createElement('button');
                            button.value = `maquina${i + 1}`;
                            button.textContent = `Máquina ${i + 1}`;
                            button.setAttribute('data-id', resposta[i].id);
                            button.addEventListener('click', function () {
                                const idMaquina = this.getAttribute('data-id');
                                atualizarDadosMaquina(idCluster, idMaquina);
                                console.log(idMaquina);
                                atualizarDadosRede(idMaquina);
                                atualizarDados(idMaquina);
                                atualizarDadosRam(idMaquina);
                                atualizarDadosDisco(idMaquina);

                                listarAlertaMaquina(idMaquina)
                                listarAlertaComponenteMaquina(idMaquina);
                                atualizarDadosProcesso(idMaquina);

                                // Limpa os intervalos anteriores, se existirem
                                intervalIds.forEach(intervalId => clearInterval(intervalId));
                                intervalIds = [];

                                // Define os novos intervalos de atualização
                                const intervalIdDados = setInterval(function () {
                                    atualizarDados(idMaquina);
                                }, 1000);
                                intervalIds.push(intervalIdDados);

                                const intervalIdRam = setInterval(function () {
                                    atualizarDadosRam(idMaquina);
                                }, 1000);
                                intervalIds.push(intervalIdRam);

                                const intervalIdDisco = setInterval(function () {
                                    atualizarDadosDisco(idMaquina);
                                }, 1000);
                                intervalIds.push(intervalIdDisco);

                                // Remover a classe "active" de todos os botões de Cluster
                                const maquinaButtons = document.querySelectorAll('.selecao-maquina .maquina-button');
                                maquinaButtons.forEach(btn => btn.classList.remove('active'));

                                // Adicionar a classe "active" apenas ao botão clicado
                                this.classList.add('active');

                            });
                            button.classList.add('maquina-button');
                            const listItem = document.createElement('li');
                            listItem.appendChild(button);
                            maquinaContainer.appendChild(listItem);
                        }

                        const dados = resposta.find(maquina => maquina.id == idMaquina);
                        if (dados) {
                            const nomeMaquina = dados.nome;
                            const sistemaOperacional = dados.sistema_operacional;
                            const fabricante = dados.fabricante;
                            const arquitetura = dados.arquitetura;
                            const metricaCpu = dados.metrica_cpu;
                            const metricaDisco = dados.metrica_disco;
                            const metricaMemoria = dados.metrica_memoria;

                            document.getElementById("maquina").innerHTML = nomeMaquina;
                            document.getElementById("sistema").innerHTML = sistemaOperacional;
                            document.getElementById("fabricante").innerHTML = fabricante;
                            document.getElementById("arquitetura").innerHTML = arquitetura;
                            document.getElementById("metrica_cpu").innerHTML = `${metricaCpu}%`;
                            document.getElementById("metrica_hd").innerHTML = `${metricaDisco}%`;
                            document.getElementById("metrica_ram").innerHTML = `${metricaMemoria}%`;

                            idMaquina = dados.id;
                            atualizarDadosRede();

                        } else {
                            var mensagem = document.createElement("span");
                            mensagem.innerHTML = "Nenhum resultado encontrado.";
                            throw "Nenhum resultado encontrado!";
                        }
                    } else {
                        var mensagem = document.createElement("span");
                        mensagem.innerHTML = "Nenhum resultado encontrado.";
                        throw "Nenhum resultado encontrado!";
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


function atualizarDadosRede(idMaquina) {
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
                    
                });
            } else {
                throw "Houve um erro na API!";
            }
        })
        .catch(function (resposta) {
            console.error(resposta);
        });
}



atualizarDadosCluster();

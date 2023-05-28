
function atualizarDadosProcesso() {
    fetch(`/kpiProcesso/listarProcessos/${idMaquina}`)
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (resposta) {
                    console.log("Dados recebidos: ", JSON.stringify(resposta));

                    var feed = document.getElementById("feed_container");
                    feed.innerHTML = "";

                    if (resposta.length > 0) {
                        for (let i = 0; i < resposta.length; i++) {
                            const dados = resposta[i];
                            const total_processos = dados.total_processos;
                            const total_threads = dados.total_threads;
                        
                            document.getElementById("total-processos").innerHTML = `<span>${total_processos}</span>`;
                            document.getElementById("total-threads").innerHTML = `<span>${total_threads}</span>`;
                    
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

function listarAlertaCluster(idCluster) {
    fetch(`/kpiProcesso/listarAlertaCluster/${idCluster}`)
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (resposta) {
                    console.log("Dados recebidos: ", JSON.stringify(resposta));

                    var feed = document.getElementById("feed_container");
                    feed.innerHTML = "";

                    if (resposta.length > 0) {
                        for (let i = 0; i < resposta.length; i++) {
                            const dados = resposta[i];
                            const quantidade_alertas = dados.quantidade_alertas;
    
                            // Inserir os valores nos elementos HTML correspondentes
                            document.getElementById("span_alertas_cluster").innerHTML = `<span>${quantidade_alertas}</span>`;
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

function listarAlertaMaquina(idMaquina) {
    fetch(`/kpiProcesso/listarAlertaMaquina/${idMaquina}`)
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (resposta) {
                    console.log("Dados recebidos: ", JSON.stringify(resposta));

                    var feed = document.getElementById("feed_container");
                    feed.innerHTML = "";

                    if (resposta.length > 0) {
                        for (let i = 0; i < resposta.length; i++) {
                            const dados = resposta[i];
                            const quantidade_alertas = dados.quantidade_alertas;
    
                            // Inserir os valores nos elementos HTML correspondentes
                            document.getElementById("span_alertas_maquina").innerHTML = `<span>${quantidade_alertas}</span>`;
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

function listarAlertaComponenteMaquina(idMaquina) {
    fetch(`/kpiProcesso/listarAlertaComponenteMaquina/${idMaquina}`)
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (resposta) {
                    console.log("Dados recebidos: ", JSON.stringify(resposta));

                    var feed = document.getElementById("feed_container");
                    feed.innerHTML = "";

                    if (resposta.length > 0) {
                        for (let i = 0; i < resposta.length; i++) {
                            const dados = resposta[i];
                            const nome_componente = dados.nome_componente;
    
                            // Inserir os valores nos elementos HTML correspondentes
                            document.getElementById("componente_alerta").innerHTML = `<span>${nome_componente}</span>`;

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

function listarMaquinaMaiorAlertas() {
    fetch(`/kpiProcesso/listarMaquinaMaiorAlertas`)
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (resposta) {
                    console.log("Dados recebidos: ", JSON.stringify(resposta));

                    var feed = document.getElementById("feed_container");
                    feed.innerHTML = "";

                    if (resposta.length > 0) {
                        for (let i = 0; i < resposta.length; i++) {
                            const dados = resposta[i];
                            const nome_maquina = dados.nome_maquina;
                           
                            // Inserir os valores nos elementos HTML correspondentes
                            document.getElementById("span_alertas_maquina").innerHTML = `<span>${nome_maquina}</span>`;
                            
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

atualizarDadosProcesso();
listarAlertaCluster();
listarAlertaMaquina();
listarAlertaComponenteMaquina();
listarMaquinaMaiorAlertas();
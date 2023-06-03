idCluster = sessionStorage.CLUSTER
function atualizarDadosProcesso(idMaquina) {


    fetch(`/kpiProcesso/listarProcessos/${idMaquina}`)
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (resposta) {
                    console.log("Dados recebidos GRUPO PROCESSOS: ", JSON.stringify(resposta));

                    var feed = document.getElementById("feed_container");
                    feed.innerHTML = "";

                    if (resposta.length > 0) {
                        console.log("GRUPO PROCESSOS " + resposta)
                        divListaProcessos = document.getElementById("div-lista-processos")

                        let processos = resposta[0].lista_processos;
                        let processosFormatados = processos.replace(/PID:/g, '<br>PID:');

                        document.getElementById("total-processos").innerHTML = `<span>${resposta[0].total_processos}</span>`;
                        document.getElementById("data-hora").innerHTML = `<span>${resposta[0].dataHoraFormatada}</span>`;
                        document.getElementById("total-threads").innerHTML = `<span>${resposta[0].total_threads}</span>`;
                        divListaProcessos.innerHTML = `<span style="white-space: pre-line; margin-left: 1vw;"><br>  ${processosFormatados}</span>`;


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
                    //console.log("Dados recebidos: ", JSON.stringify(resposta));



                    if (resposta.length > 0) {
                        for (let i = 0; i < resposta.length; i++) {
                            const dados = resposta[i];
                            const quantidade_alertas = dados.quantidade_alertas;
                            listarMaquinaMaiorAlertas(idCluster)

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
                    //console.log("Dados recebidos: ", JSON.stringify(resposta));

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
                    //console.log("Dados recebidos: ", JSON.stringify(resposta));

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

function listarMaquinaMaiorAlertas(idCluster) {
    fetch(`/kpiProcesso/listarMaquinaMaiorAlertas/${idCluster}`)
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (resposta) {
                    console.log("Dados recebidos: ", JSON.stringify(resposta));
                    console.log("NUMERO DO CLUSTER EM QUESTAO:" + idCluster)
                    console.log("NUMERO DO CLUSTER EM QUESTAO NOME MAQUINA:" + resposta[0].maquinaNome)


                    if (resposta.length > 0) {

                        console.log("Maquina com maior número de alertas " + resposta[0])
                        if (resposta[0].maquinaNome != null) {
                            // Inserir os valores nos elementos HTML correspondentes
                            document.getElementById("maior_alertas_maquina").innerHTML = `<span>${resposta[0].maquinaNome}</span>`;
                        }else{
                        document.getElementById("maior_alertas_maquina").innerHTML  ='Sem alertas'
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


atualizarDadosProcesso(1);
listarAlertaMaquina(1);
listarAlertaComponenteMaquina(1);
listarAlertaCluster(idCluster);
listarMaquinaMaiorAlertas(idCluster);


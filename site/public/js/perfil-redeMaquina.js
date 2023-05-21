function atualizarDadosRede() {
    fetch(`/redeMaquina/listarRede`)
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

                    var feed = document.getElementById("feed_container");
                    feed.innerHTML = "";

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
            // finalizarAguardar();
        });
}

function atualizarDadosMaquina() {
    fetch(`/redeMaquina/listarMaquina`)
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

                    var feed = document.getElementById("feed_container");
                    feed.innerHTML = "";
                    if (resposta.length > 0) {
                        const maquinaContainer = document.querySelector('.selecao-maquina ul');

                        for (let i = 0; i < resposta.length; i++) {
                            const button = document.createElement('button');
                            button.value = `maquina${i+1}`;
                            button.textContent = `Máquina ${i+1}`;
                            button.setAttribute('data-id', `maquina${i+1}`); // Adiciona o atributo data-id com o valor da identificação da máquina
                            const listItem = document.createElement('li');
                            listItem.appendChild(button);
                            maquinaContainer.appendChild(listItem);
                        }
                        const dados = resposta[0];
                        const nomeMaquina = dados.nome;
                        const sistemaOperacional = dados.sistema_operacional;
                        const fabricante = dados.fabricante;
                        const arquitetura = dados.arquitetura;
                        const metricaCpu = dados.metrica_cpu;
                        const metricaDisco = dados.metrica_disco;
                        const metricaMemoria = dados.metrica_memoria;

                        // Inserir os valores nos elementos HTML correspondentes
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
                    // finalizarAguardar();
                });
            } else {
                throw "Houve um erro na API!";
            }
        })
        .catch(function (resposta) {
            console.error(resposta);
            // finalizarAguardar();
        });
}

// Chamar as funções separadamente
atualizarDadosRede();
atualizarDadosMaquina();

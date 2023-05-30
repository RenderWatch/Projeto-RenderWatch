var statusPendente = 1;
var statusResolvido = 0;


function qtdAlertasPendentes() {
    fetch(`/alertas/qtdAlertasPendentes/${statusPendente}`)
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (resposta) {
                    console.log("Dados recebidos: ", JSON.stringify(resposta));


                    var container_alerta_pendentes = document.getElementById("container_alerta_pendentes");


                    if (resposta.length > 0) {

                        let descricao;


                        for (i = 0; i < resposta.length; i++) {
                            sessionStorage.ID_MAQUINA_ALERTA = resposta[i].maquina_id


                            container_alerta_pendentes.innerHTML += ` 
                                <span>
                                <div  class="alerta alerta_resolvido">
                                            <ul class=" alerta_ul alerta_ul_um">
                                                <li class=" titulo_alerta"><b>Alerta</b></li>
                                                <li class="alerta_li">
                                                
                                                    <img id="img_nivel_alerta" class="alerta_icone" src="assets/style-all/alerta_amarelo.png" alt="">
                                                    
                                                    
                                                </li>
                                            </ul>
                                            <ul class=" alerta_ul alerta_ul_dois">
                                                <li class=" titulo_alerta"><b>Componente</b></li>
                                                <li class="alerta_li descricao_alerta">${resposta[i].nome[0]} </li>
                                            </ul>
                                            <ul class=" alerta_ul alerta_ul_quatro">
                                            <li class=" titulo_alerta"><b>Cluster</b></li>
                                            <li class="alerta_li cluster">${resposta[i].cluster_id}  </li>
                                        </ul>
                                            <ul class=" alerta_ul alerta_ul_tres">
                                                <li class=" titulo_alerta"><b>Máquina</b></li>
                                                <li class="alerta_li maquina">${resposta[i].maquina_id}</li>
                                            </ul>
                                         
                                            <ul class=" alerta_ul alerta_ul_cinco">
                                                <li class=" titulo_alerta"><b>Em uso</b></li>
                                                <li class="hora_alerta">${resposta[i].uso}</li>
                                            </ul>
                                            <ul class=" alerta_ul alerta_ul_cinco">
                                                <li class=" titulo_alerta"><b>Métrica</b></li>
                                                <li class="hora_alerta">${resposta[i].metrica_memoria}%</li>
                                            </ul>
                                            <ul class=" alerta_ul alerta_ul_cinco">
                                                <li class=" titulo_alerta"><b>Data e Hora</b></li>
                                                <li class="hora_alerta">${resposta[i].dataHoraFormatada}</li>
                                            </ul>
                                            <ul class=" alerta_ul alerta_ul_seis">
                                                <li class=" titulo_alerta"><b>Status</b></li>
                                                <li class="alerta_li button_li">
                                                   
                                                    <button  class="button_status pendente"></button>
                                                </li>
                                            </ul>
                        
                                        </div>
                                        <span>`




                        }

                        console.log("Quantidade de alertas " + resposta.length)



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


function getAlertasResolvidos() {
    fetch(`/alertas/qtdAlertasPendentes/${statusResolvido}`)
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (resposta) {
                    console.log("Dados recebidos: ", JSON.stringify(resposta));


                    var container_alerta_resolvidos = document.getElementById("container_alerta_resolvidos");

                    //LOGICA PARA CSS
                   


                    if (resposta.length > 0) {

                        let descricao;


                        for (i = 0; i < resposta.length; i++) {
                            sessionStorage.ID_MAQUINA_ALERTA = resposta[i].maquina_id

                            if (resposta[i].descricao == null) {
                                descricao = resposta[i].nome[0] + " Acima da métrica"


                            } else {
                                descricao = resposta[i].descricao
                            }

                            container_alerta_resolvidos.innerHTML += ` 
                                <span>
                                <div  class="alerta alerta_resolvido">
                                            <ul class=" alerta_ul alerta_ul_um">
                                                <li class=" titulo_alerta"><b>Alerta</b></li>
                                                <li class="alerta_li">
                                               
                                                    <img id="img_nivel_alerta" class="alerta_icone" src="assets/style-all/alerta_amarelo.png" alt="">
                                                    ${resposta[i].nome[0]}
                                                    
                                                </li>
                                            </ul>
                                            <ul class=" alerta_ul alerta_ul_dois">
                                                <li class=" titulo_alerta"><b>Descrição</b></li>
                                                <li class="alerta_li descricao_alerta">${descricao} </li>
                                            </ul>
                                            <ul class=" alerta_ul alerta_ul_tres">
                                                <li class=" titulo_alerta"><b>Máquina</b></li>
                                                <li class="alerta_li maquina">${resposta[i].maquina_id}</li>
                                            </ul>
                                            <ul class=" alerta_ul alerta_ul_quatro">
                                                <li class=" titulo_alerta"><b>Cluster</b></li>
                                                <li class="alerta_li cluster">${resposta[i].cluster_id}</li>
                                            </ul>
                                            <ul class=" alerta_ul alerta_ul_cinco">
                                                <li class=" titulo_alerta"><b>Em uso</b></li>
                                                <li class="hora_alerta">${resposta[i].uso}</li>
                                            </ul>
                                            <ul class=" alerta_ul alerta_ul_seis">
                                                <li class=" titulo_alerta"><b>Status</b></li>
                                                <li class="alerta_li button_li">
                                                   
                                                    <button class="button_status resolvido"></button>
                                                </li>
                                            </ul>
                        
                                        </div>
                                        <span>`




                        }

                        console.log("Quantidade de alertas " + resposta.length)



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


qtdAlertasPendentes()
getAlertasResolvidos()




//QTD ALERTA RESOLVIDO


//QTD ALERTA PENDENTE










/*
` 
<span >
<div  class="alerta alerta_resolvido">
            <ul class=" alerta_ul alerta_ul_um">
                <li class=" titulo_alerta"><b>Alerta</b></li>
                <li class="alerta_li">
                    <img id="img_nivel_alerta" class="alerta_icone" src="assets/style-all/alerta_amarelo.png" alt="">
                    
                </li>
            </ul>
            <ul class=" alerta_ul alerta_ul_dois">
                <li class=" titulo_alerta"><b>Descrição</b></li>
                <li class="alerta_li descricao_alerta">CPU com uso excedido</li>
            </ul>
            <ul class=" alerta_ul alerta_ul_tres">
                <li class=" titulo_alerta"><b>Máquina</b></li>
                <li class="alerta_li maquina">1</li>
            </ul>
            <ul class=" alerta_ul alerta_ul_quatro">
                <li class=" titulo_alerta"><b>Cluster</b></li>
                <li class="alerta_li cluster">2</li>
            </ul>
            <ul class=" alerta_ul alerta_ul_cinco">
                <li class=" titulo_alerta"><b>Data/Hora</b></li>
                <li class="hora_alerta">07/04/2023-16:00</li>
            </ul>
            <ul class=" alerta_ul alerta_ul_seis">
                <li class=" titulo_alerta"><b>Status</b></li>
                <li class="alerta_li button_li">
                   
                    <button class="button_status resolvido"></button>                </li>
            </ul>

        </div>
        <span>`

   

*/



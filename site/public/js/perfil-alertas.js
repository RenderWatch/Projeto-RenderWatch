


    // VIZUALIZAÇÃO 
    function todos_alertas() {
        if (container_alerta_resolvidos.style.display = "none") {


            container_alerta_resolvidos.style.display = "flex";
            container_alerta_pendentes.style.display = "flex";

            if (container_alerta_pendentes.style.display = "none") {
                container_alerta_resolvidos.style.display = "flex";
                container_alerta_pendentes.style.display = "flex";
            }


        }
    }

    function resolvidos_alertas() {
        if (container_alerta_resolvidos.style.display = "none") {
            container_alerta_resolvidos.style.display = "flex";

        }
        if (container_alerta_pendentes.style.display = "flex") {

            container_alerta_pendentes.style.display = "none";
        }
    }

    function pendentes_alertas() {
        if (container_alerta_resolvidos.style.display = "flex") {
            container_alerta_resolvidos.style.display = "none";

        }
        if (container_alerta_pendentes.style.display = "none") {

            container_alerta_pendentes.style.display = "flex";
        }
    }








   

             


                /* BOTÕES DE STATUS */

                function button_status_pendente(id) {
                    alert("Alerta Pendente")

                }

                function button_status_resolvido(id) {
                    id.style.display = 'none'
                    container_alerta_resolvidos.innerHTML += ` <span id="alerta${i}">
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
                        <li class="alerta_li">1</li>
                    </ul>
                    <ul class=" alerta_ul alerta_ul_quatro">
                        <li class=" titulo_alerta"><b>Cluster</b></li>
                        <li class="alerta_li">2</li>
                    </ul>
                    <ul class=" alerta_ul alerta_ul_cinco">
                        <li class=" titulo_alerta"><b>Data/Hora</b></li>
                        <li class="hora_alerta">07/04/2023-16:00</li>
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





var nomeComponente = sessionStorage.nome;

function buscarQtdAlertas() {
    fetch(`/historico_alertas/buscarQtdAlertas/${nomeComponente}`).then(function (resposta) {
        if (resposta.ok) {

            var qtdAlert = resposta

            var alertaPendente = []
            var alertaResolvido = []

            for (i = 0; i < qtdAlert; i++) {

                alertaPendente.push({
                    id: `alerta${i}`
                });




            }

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                for (i = 0; i < alertaPendente.length; i++) {

                    var id = alertaPendente[i].id;
                    container_alerta_pendentes.innerHTML += ` 
        <span id="alerta${i}">
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
                            <button  onclick="button_status_resolvido(${id})" class="button_status resolvido"></button>
                            <button style="opacity: 50%;"onclick="button_status_pendente(${id})" class="button_status pendente"></button>
                        </li>
                    </ul>

                </div>
                <span>`

                    console.log(alertaPendente[i].id)








                }

           
            });


        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });

}


buscarQtdAlertas();
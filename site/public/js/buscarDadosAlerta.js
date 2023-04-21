function buscarDadosAlerta(){

    fetch(`/alerta/buscarDadosAlerta/${idEmpresa}`).then(function (resposta) {
    var qtdAlert = 2
    for (i = 0; i < qtdAlert; i++) {
        if (resposta.ok) {

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));

        container_alerta_resolvidos.innerHTML += ` 
        <div id="alerta${resposta[i].id}" class="alerta alerta_resolvido">
                    <ul class=" alerta_ul alerta_ul_um">
                        <li class=" titulo_alerta">Nivel do Alerta</li>
                        <li class="alerta_li">
                            <img id="img_nivel_alerta" class="alerta_icone" src="assets/style-all/alerta_amarelo.png" alt="">
                            Alerta
                        </li>
                    </ul>
                    <ul class=" alerta_ul alerta_ul_dois">
                        <li class=" titulo_alerta">Descrição</li>
                        <li class="alerta_li descricao_alerta">CPU com uso excedido</li>
                    </ul>
                    <ul class=" alerta_ul alerta_ul_tres">
                        <li class=" titulo_alerta">Máquina</li>
                        <li class="alerta_li">1</li>
                    </ul>
                    <ul class=" alerta_ul alerta_ul_quatro">
                        <li class=" titulo_alerta">Cluster</li>
                        <li class="alerta_li">2</li>
                    </ul>
                    <ul class=" alerta_ul alerta_ul_cinco">
                        <li class=" titulo_alerta">Data/Hora</li>
                        <li class="hora_alerta">07/04/2023-16:00</li>
                    </ul>
                    <ul class=" alerta_ul alerta_ul_seis">
                        <li class=" titulo_alerta">Status</li>
                        <li class="alerta_li button_li">
                            <button onclick="button_status_resolvido()" class="button_status resolvido"></button>
                            <button onclick="button_status_pendente()" class="button_status pendente"></button>
                        </li>
                    </ul>

                </div>`
            })

              

    }else {
        throw ('Houve um erro na API!');
    }
}

}).catch(function (resposta) {
    console.error(resposta);
});

}

buscarDadosAlerta()
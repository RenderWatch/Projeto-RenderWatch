var database = require("../database/config");

function qtdAlertasPendentes(statusAtual) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `
   
        SELECT *,FORMAT(ha.dt_hora, 'dd-mm-yyyy hh:mm:ss') as dataHoraFormatada  FROM historico_alerta
        AS ha INNER JOIN maquina 
        AS m  ON m.id = ha.maquina_id 
        WHERE ha.status = ${statusAtual};`
          
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {

        var instrucao = `
      
        SELECT * FROM historico_alerta
        AS ha INNER JOIN maquina 
        AS m  ON m.id = ha.maquina_id 
        WHERE ha.status =${statusAtual};`
          

    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function getIdClusterMaquina(idMaquina) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `
       SELECT cluster_id FROM maquina WHERE id = ${idMaquina};
       `
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {

        var instrucao = `
        SELECT cluster_id FROM maquina WHERE id = ${idMaquina};
          `

    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    qtdAlertasPendentes,
    getIdClusterMaquina
}
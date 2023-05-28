var database = require("../database/config");

function listarAlertaCluster(idCluster) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `
        SELECT COUNT(*) AS quantidade_alertas
        FROM historico_alerta a
        INNER JOIN maquina m ON a.maquina_id = m.id
        WHERE m.cluster_id = '${idCluster}' AND status = 1;        
        `;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {

        var instrucao = `
        SELECT COUNT(*) AS quantidade_alertas
        FROM cluster c
        INNER JOIN maquina m ON c.id = m.cluster_id
        INNER JOIN componente comp ON m.id = comp.maquina_id
        INNER JOIN registro_componente rc ON comp.id = rc.componente_id
        INNER JOIN alerta a ON rc.id = a.registro_componente_id
        WHERE c.id = '${idCluster}';
        `;

    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarAlertaMaquina(idMaquina) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `
        SELECT COUNT(*) AS quantidade_alertas
        FROM historico_alerta
        WHERE maquina_id = ${idMaquina} AND status = 1;       
    `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {

        var instrucao = `
        SELECT COUNT(*) AS quantidade_alertas
        FROM maquina m
        INNER JOIN componente c ON m.id = c.maquina_id
        INNER JOIN registro_componente rc ON c.id = rc.componente_id
        INNER JOIN alerta a ON rc.id = a.registro_componente_id
        WHERE m.id = '${idMaquina}';
        `

    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarAlertaComponenteMaquina(idMaquina) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `
        SELECT TOP 1 nome AS nome_componente, COUNT(*) AS quantidade_repeticoes
        FROM historico_alerta
        WHERE maquina_id = '${idMaquina}'
        GROUP BY nome
        ORDER BY quantidade_repeticoes DESC;
        `;


    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {

        var instrucao = `
        SELECT c.nome AS nome_componente, COUNT(*) AS total_alertas
        FROM maquina m
        INNER JOIN componente c ON m.id = c.maquina_id
        INNER JOIN registro_componente rc ON c.id = rc.componente_id
        INNER JOIN alerta a ON rc.id = a.registro_componente_id
        WHERE m.id = '${idMaquina}'
        GROUP BY c.nome
        ORDER BY total_alertas DESC
        LIMIT 1;

        `

    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarMaquinaMaiorAlertas() {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `
        SELECT MAX(m.nome) AS maquinaNome  
        FROM historico_alerta ha
         JOIN maquina m ON ha.maquina_id = m.id
		 WHERE ha.maquina_id = m.id;
        `;


    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {

        var instrucao = `
        SELECT m.nome AS nome_maquina, COUNT(*) AS total_alertas
        FROM maquina m
        INNER JOIN componente c ON m.id = c.maquina_id
        INNER JOIN registro_componente rc ON c.id = rc.componente_id
        INNER JOIN alerta a ON rc.id = a.registro_componente_id
        GROUP BY m.nome
        ORDER BY total_alertas DESC
        LIMIT 1;

        `

    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarProcessos(idMaquina) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor do seu BD está rodando corretamente. \n\n function listar()");

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `
        SELECT TOP 1 * FROM grupo_processos WHERE maquina_id = ${idMaquina} ORDER BY ID DESC`

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucao = `
        SELECT TOP 1 * FROM grupo_processos WHERE maquina_id = ${idMaquina} ORDER BY ID DESC;`
            

        console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao);
    }
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listarAlertaCluster,
    listarAlertaMaquina,
    listarAlertaComponenteMaquina,
    listarMaquinaMaiorAlertas,
    listarProcessos
}

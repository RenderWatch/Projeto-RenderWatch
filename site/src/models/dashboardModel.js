var database = require("../database/config");

function listar(idMaquina) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `
        SELECT top 7 c.nome AS componente_nome, c.descricao AS componente_descricao, r.em_uso, DATE_FORMAT(r.dt_hora, '%H:%i:%s') AS dt_hora_formatada, r.bytes_leitura, r.bytes_escrita
        FROM componente AS c
        JOIN registro_componente AS r ON c.id = r.componente_id
        WHERE c.maquina_id = 1
        order by r.componente_id desc
        `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {

        var instrucao = `
        SELECT c.nome AS componente_nome, c.descricao AS componente_descricao, r.em_uso, DATE_FORMAT(r.dt_hora, '%H:%i:%s') AS dt_hora_formatada, r.bytes_leitura, r.bytes_escrita
        FROM componente AS c
        JOIN registro_componente AS r ON c.id = r.componente_id
        WHERE c.maquina_id = 1
        order by r.componente_id desc limit 7;
        `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarTempoReal(idMaquina) {

    instrucaoSql = ''
    var instrucaoSql = `
    SELECT top 1 c.nome AS componente_nome, c.descricao AS componente_descricao, r.em_uso, DATE_FORMAT(r.dt_hora, '%H:%i:%s') AS dt_hora_formatada, r.bytes_leitura, r.bytes_escrita
    FROM componente AS c
    JOIN registro_componente AS r ON c.id = r.componente_id
    WHERE c.maquina_id = 1
    order by r.componente_id desc
    `;

    if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        var instrucaoSql = `
        SELECT c.nome AS componente_nome, c.descricao AS componente_descricao, r.em_uso, DATE_FORMAT(r.dt_hora, '%H:%i:%s') AS dt_hora_formatada, r.bytes_leitura, r.bytes_escrita
        FROM componente AS c
        JOIN registro_componente AS r ON c.id = r.componente_id
        WHERE c.maquina_id = 1
        order by r.componente_id desc limit 1;
        `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listar,
    listarTempoReal
}


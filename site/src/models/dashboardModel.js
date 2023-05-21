var database = require("../database/config");

function listar(idMaquina) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `
    SELECT TOP 7
        c.nome AS componente_nome,
        c.descricao AS componente_descricao,
        c.identificador AS componente_identificador,
        r.em_uso,
        FORMAT(r.dt_hora, 'HH:mm:ss') AS dt_hora_formatada,
        m.metrica_cpu
    FROM componente AS c
    JOIN registro_componente AS r ON c.id = r.componente_id
    JOIN maquina AS m ON m.id = c.maquina_id
    WHERE c.maquina_id = 1 AND c.nome = 'cpu'
    ORDER BY r.componente_id DESC;
`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {

        var instrucao = `
        SELECT c.nome AS componente_nome, c.descricao AS componente_descricao, c.identificador AS componente_identificador, r.em_uso, DATE_FORMAT(r.dt_hora, '%H:%i:%s') AS dt_hora_formatada
        FROM componente AS c
        JOIN registro_componente AS r ON c.id = r.componente_id
        WHERE c.maquina_id = '${idMaquina}' AND c.nome = 'cpu'
        ORDER BY r.componente_id DESC
        LIMIT 7;
        `

    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarRam(idMaquina) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `
        SELECT TOP 7
            c.nome AS componente_nome,
            c.descricao AS componente_descricao,
            c.identificador AS componente_identificador,
            r.em_uso,
            FORMAT(r.dt_hora, 'HH:mm:ss') AS dt_hora_formatada,
            m.metrica_memoria
        FROM componente AS c
        JOIN registro_componente AS r ON c.id = r.componente_id
        JOIN maquina AS m ON m.id = c.maquina_id
        WHERE c.maquina_id = 1 AND c.nome = 'memoria'
        ORDER BY r.componente_id DESC;
    `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {

        var instrucao = `
        SELECT c.nome AS componente_nome, c.descricao AS componente_descricao, c.identificador AS componente_identificador, r.em_uso, DATE_FORMAT(r.dt_hora, '%H:%i:%s') AS dt_hora_formatada
        FROM componente AS c
        JOIN registro_componente AS r ON c.id = r.componente_id
        WHERE c.maquina_id = '${idMaquina}' AND c.nome = 'memoria'
        ORDER BY r.componente_id DESC
        LIMIT 7;
        `

    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarDisco(idMaquina) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        var instrucao = `
        SELECT TOP 7
        c.nome AS componente_nome,
        c.descricao AS componente_descricao,
        c.identificador AS componente_identificador,
        r.em_uso,
        FORMAT(r.dt_hora, 'HH:mm:ss') AS dt_hora_formatada,
        m.metrica_disco
    FROM componente AS c
    JOIN registro_componente AS r ON c.id = r.componente_id
    JOIN maquina AS m ON m.id = c.maquina_id
    WHERE c.maquina_id = 1 AND c.nome = 'disco'
    ORDER BY r.componente_id DESC;
        `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {

        var instrucao = `
        SELECT c.nome AS componente_nome, c.descricao AS componente_descricao, c.identificador AS componente_identificador, r.em_uso, DATE_FORMAT(r.dt_hora, '%H:%i:%s') AS dt_hora_formatada
        FROM componente AS c
        JOIN registro_componente AS r ON c.id = r.componente_id
        WHERE c.maquina_id = '${idMaquina}' AND c.nome = 'disco'
        ORDER BY r.componente_id DESC
        LIMIT 7;
        `

    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function listarProcessos(idGrupoProcessos) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor do seu BD está rodando corretamente. \n\n function listar()");
  
    var instrucao = `
      SELECT lista_processos, total_processos, total_threads
      FROM grupo_processos
      WHERE id = ${idGrupoProcessos};
    `;
  
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
  }

module.exports = {
    listar,
    listarRam,
    listarDisco,
    listarProcessos
}


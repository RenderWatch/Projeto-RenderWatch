var database = require("../database/config");

function listar(idMaquina) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
    SELECT c.nome AS componente_nome, c.descricao AS componente_descricao, r.em_uso, r.dt_hora, r.bytes_leitura, r.bytes_escrita
    FROM componente AS c
    JOIN registro_componente AS r ON c.id = r.componente_id
    WHERE c.maquina_id = ${idMaquina};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listar
}


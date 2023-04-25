var database = require("../database/config");

function buscarMetricasRede(idEmpresa) {
    console.log("ACESSEI O REDE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarDadosUsuario():", idEmpresa);
        
    const instrucao = `SELECT * FROM metrica_rede WHERE empresa_id = ${idEmpresa}`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
  }

  function confirmarMetricasRede(inputEnviados, inputRecebidos, id) {
    console.log("ACESSEI O REDE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function alterar(): ", inputEnviados, inputRecebidos, id)

    var instrucao = `UPDATE metrica_rede SET metrica_bytes_enviados = ${inputEnviados}, metrica_bytes_recebidos = ${inputRecebidos}
    WHERE empresa_id = ${id}`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

  function inserirPrimeiraMetricasRede(id) {
    console.log("ACESSEI O REDE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function alterar(): ", id)

    var instrucao = `INSERT INTO metrica_rede VALUES (null, 0, 0, ${id})`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    buscarMetricasRede,
    confirmarMetricasRede,
    inserirPrimeiraMetricasRede
};


var database = require("../database/config");

function listarRede(idMaquina) {
  console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    var instrucao = `
        SELECT nome, ipv4, ipv6, nome_dominio
        FROM rede
        WHERE maquina_id = 1;
        `;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {

    var instrucao = `
        SELECT nome, ipv4, ipv6, nome_dominio
        FROM rede
        WHERE maquina_id = 1;
        `

  } else {
    console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
    return
  }

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function listarMaquina(idMaquina) {
  console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    var instrucao = `
        SELECT nome, sistema_operacional, fabricante, arquitetura, metrica_cpu, metrica_disco, metrica_memoria
        FROM maquina
        WHERE cluster_id = 1;

        `;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {

    var instrucao = `
        SELECT nome, sistema_operacional, fabricante, arquitetura, metrica_cpu, metrica_disco, metrica_memoria
        FROM maquina
        WHERE cluster_id = 1;
        `

  } else {
    console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
    return
  }

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  listarRede,
  listarMaquina
}


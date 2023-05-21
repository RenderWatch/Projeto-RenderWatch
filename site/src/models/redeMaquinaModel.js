var database = require("../database/config");

function listarRede(idMaquina) {
  console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    var instrucao = `
        SELECT id, nome, ipv4, ipv6, nome_dominio
        FROM rede
        WHERE maquina_id = '${idMaquina}';
        `;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {

    var instrucao = `
        SELECT id, nome, ipv4, ipv6, nome_dominio
        FROM rede
        WHERE maquina_id = '${idMaquina}';
        `

  } else {
    console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
    return
  }

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function listarMaquina(idCluster) {
  console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    var instrucao = `
        SELECT id, nome, sistema_operacional, fabricante, arquitetura, metrica_cpu, metrica_disco, metrica_memoria
        FROM maquina
        WHERE cluster_id = '${idCluster}';

        `;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {

    var instrucao = `
        SELECT id, nome, sistema_operacional, fabricante, arquitetura, metrica_cpu, metrica_disco, metrica_memoria
        FROM maquina
        WHERE cluster_id = '${idCluster}';
        `

  } else {
    console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
    return
  }

  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

function listarCluster(razaoSocial) {
  console.log("ACESSEI O permissao MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
  var instrucao = `
  SELECT cluster.*
  FROM cluster
  JOIN empresa ON cluster.empresa_id = empresa.id
  WHERE empresa.razao_social = '${razaoSocial}';
  
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return database.executar(instrucao);
}

module.exports = {
  listarRede,
  listarMaquina,
  listarCluster
}


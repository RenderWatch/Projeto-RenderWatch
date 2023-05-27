var database = require("../database/config");

function getHistoricoAlerta(status) {
  console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    var instrucao = `
        SELECT *
        FROM historico_alerta
        WHERE maquina_id = '${status}';
        `;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {

    var instrucao = `
    SELECT *
    FROM historico_alerta
    WHERE maquina_id = '${status}';
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

// function listarProcessos(idMaquina) {
//   console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor do seu BD está rodando corretamente. \n\n function listar()");

//   if (process.env.AMBIENTE_PROCESSO == "producao") {
//     // var instrucao = `
//     // SELECT gp.lista_processos, gp.total_processos, gp.total_threads
//     // FROM grupo_processos AS gp
//     // JOIN maquina AS m ON m.id = gp.maquina_id
//     // WHERE gp.maquina_id = '${idMaquina}'
//     // ORDER BY gp.maquina_id DESC
//     // LIMIT 7;
//     // `;
//     var instrucao = `
//     SELECT gp.lista_processos, gp.total_processos, gp.total_threads
//     FROM grupo_processos AS gp
//     JOIN maquina AS m ON m.id = gp.maquina_id
//     WHERE gp.maquina_id = '${idMaquina}'
//     ORDER BY gp.maquina_id DESC
//     LIMIT 1;
//     `;
//   } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
//     var instrucao = `
//     SELECT gp.lista_processos, gp.total_processos, gp.total_threads
//     FROM grupo_processos AS gp
//     JOIN maquina AS m ON m.id = gp.maquina_id
//     WHERE gp.maquina_id = '${idMaquina}'
//     ORDER BY gp.maquina_id DESC
//     LIMIT 7;
//     `;

//     console.log("Executando a instrução SQL: \n" + instrucao);
//     return database.executar(instrucao);
//   }
// }


  module.exports = {
    listarMaquina,
    listarCluster,
    getHistoricoAlerta
  }


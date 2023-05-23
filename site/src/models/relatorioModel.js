var database = require("../database/config");

function buscarDadosAlertas(idEmpresa) {
    console.log("ACESSEI O RELATORIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarDadosAlertas():", idEmpresa);

    let instrucao = "";

    if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucao = `SELECT ha.dt_hora AS dataAlerta, ha.nome AS componenteAlerta, ha.uso AS usoAlerta,
        c.nome AS clusterNome, c.id AS clusterId, m.id AS maquinaId, m.nome AS maquinaNome
    FROM historico_alerta AS ha 
    JOIN maquina AS m ON ha.maquina_id = m.id 
    JOIN cluster AS c ON m.cluster_id = c.id
    JOIN empresa AS e ON c.empresa_id = e.id
    WHERE e.id = ${idEmpresa}
    AND MONTH(ha.dt_hora) = MONTH(CURDATE())
    AND YEAR(ha.dt_hora) = YEAR(CURDATE());
    
`;
    } else if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucao = `SELECT ha.dt_hora AS dataAlerta, ha.nome AS componenteAlerta, ha.uso AS usoAlerta,
    c.nome AS clusterNome, c.id AS clusterId, m.id AS maquinaId, m.nome AS maquinaNome
    FROM historico_alerta AS ha 
    JOIN maquina AS m ON ha.maquina_id = m.id 
    JOIN cluster AS c ON m.cluster_id = c.id
    JOIN empresa AS e ON c.empresa_id = e.id
    WHERE e.id = ${idEmpresa}
    AND MONTH(ha.dt_hora) = MONTH(GETDATE())
    AND YEAR(ha.dt_hora) = YEAR(GETDATE());
`;
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarQuantidadeAlertas(idEmpresa) {
    console.log("ACESSEI O RELATORIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarQuantidadeAlertas():", idEmpresa);

    let instrucao = "";

    if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucao = `SELECT COUNT(ha.id) AS qtdAlertasMes
        FROM historico_alerta AS ha 
        JOIN maquina AS m ON ha.maquina_id = m.id 
        JOIN cluster AS c ON m.cluster_id = c.id
        JOIN empresa AS e ON c.empresa_id = e.id
        WHERE e.id = ${idEmpresa}
        AND MONTH(ha.dt_hora) = MONTH(CURDATE())
        AND YEAR(ha.dt_hora) = YEAR(CURDATE());        
    `;
    } else if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucao = `SELECT COUNT(ha.id) AS qtdAlertasMes
    FROM historico_alerta AS ha 
    JOIN maquina AS m ON ha.maquina_id = m.id 
    JOIN cluster AS c ON m.cluster_id = c.id
    JOIN empresa AS e ON c.empresa_id = e.id
    WHERE e.id = ${idEmpresa}
      AND MONTH(ha.dt_hora) = MONTH(GETDATE())
      AND YEAR(ha.dt_hora) = YEAR(GETDATE());
    `;
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarClusterComMaisAlertas(idEmpresa) {
    console.log("ACESSEI O RELATORIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarClusterComMaisAlertas():", idEmpresa);

    let instrucao = "";

    if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucao = `SELECT c.id AS clusterId, c.nome AS clusterNome, COUNT(*) AS totalRegistros
        FROM historico_alerta AS ha
        JOIN maquina AS m ON ha.maquina_id = m.id
        JOIN cluster AS c ON m.cluster_id = c.id
        JOIN empresa AS e ON c.empresa_id = e.id
        WHERE e.id = ${idEmpresa}
        AND MONTH(ha.dt_hora) = MONTH(CURRENT_DATE())
          AND YEAR(ha.dt_hora) = YEAR(CURRENT_DATE())
        GROUP BY c.id, c.nome
        ORDER BY COUNT(*) DESC
        LIMIT 1;
        
        `;
    } else if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucao = `SELECT TOP 1 c.id AS clusterId, c.nome AS clusterNome, COUNT(*) AS totalRegistros
        FROM historico_alerta AS ha
        JOIN maquina AS m ON ha.maquina_id = m.id
        JOIN cluster AS c ON m.cluster_id = c.id
        JOIN empresa AS e ON c.empresa_id = e.id
        WHERE e.id = ${idEmpresa}
        AND MONTH(ha.dt_hora) = MONTH(GETDATE())
          AND YEAR(ha.dt_hora) = YEAR(GETDATE())
        GROUP BY c.id, c.nome
        ORDER BY COUNT(*) DESC;
    `;
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarComponenteEmMaisAlertas(idEmpresa) {
    console.log("ACESSEI O RELATORIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarComponenteEmMaisAlertas():", idEmpresa);

    let instrucao = "";

    if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucao = `SELECT ha.nome AS nome, COUNT(*) AS ocorrencias
        FROM historico_alerta AS ha
        JOIN maquina AS m ON ha.maquina_id = m.id
        JOIN cluster AS c ON m.cluster_id = c.id
        JOIN empresa AS e ON c.empresa_id = e.id
        WHERE MONTH(ha.dt_hora) = MONTH(CURDATE())
          AND YEAR(ha.dt_hora) = YEAR(CURDATE())
          AND e.id = ${idEmpresa}
        GROUP BY ha.nome
        ORDER BY ocorrencias DESC
        LIMIT 1;
        
        `;
    } else if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucao = `SELECT TOP 1 ha.nome as nome, COUNT(*) AS ocorrencias
    FROM historico_alerta AS ha
    JOIN maquina AS m ON ha.maquina_id = m.id
    JOIN cluster AS c ON m.cluster_id = c.id
    JOIN empresa AS e ON c.empresa_id = e.id
    WHERE MONTH(ha.dt_hora) = MONTH(GETDATE())
      AND YEAR(ha.dt_hora) = YEAR(GETDATE())
      AND e.id = ${idEmpresa}
    GROUP BY ha.nome
    ORDER BY ocorrencias DESC;
    `;
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarUsoCpuPorCluster(idEmpresa) {
    console.log("ACESSEI O RELATORIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarUsoCpuPorCluster():", idEmpresa);

    let instrucao = "";

    if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucao = `SELECT m.id as idMaquina, m.nome as nomeMaquina, cl.id AS idCluster, cl.nome AS nomeCluster, AVG(rc.em_uso) AS average_uso
        FROM maquina AS m
        JOIN componente AS c ON m.id = c.maquina_id
        JOIN registro_componente AS rc ON c.id = rc.componente_id
        JOIN cluster AS cl ON m.cluster_id = cl.id
        JOIN empresa AS e ON cl.empresa_id = e.id
        WHERE c.nome = 'CPU'
          AND e.id = ${idEmpresa}
          AND MONTH(rc.dt_hora) = MONTH(CURDATE())
          AND YEAR(rc.dt_hora) = YEAR(CURDATE())
        GROUP BY m.id, m.nome, cl.id, cl.nome;
        
        `;
    } else if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucao = `SELECT m.id as idMaquina, m.nome as nomeMaquina, cl.id AS idCluster, cl.nome AS nomeCluster, AVG(rc.em_uso) AS average_uso
        FROM maquina AS m
        JOIN componente AS c ON m.id = c.maquina_id
        JOIN registro_componente AS rc ON c.id = rc.componente_id
        JOIN cluster AS cl ON m.cluster_id = cl.id
        JOIN empresa AS e ON cl.empresa_id = e.id
        WHERE c.nome = 'CPU'
        AND e.id = ${idEmpresa}
        AND MONTH(rc.dt_hora) = MONTH(GETDATE())
        AND YEAR(rc.dt_hora) = YEAR(GETDATE())
        GROUP BY m.id, m.nome, cl.id, cl.nome;
    `;
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarUsoMemoriaPorCluster(idEmpresa) {
    console.log("ACESSEI O RELATORIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarUsoMemoriaPorCluster():", idEmpresa);

    let instrucao = "";

    if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucao = `SELECT m.id as idMaquina, m.nome as nomeMaquina, cl.id AS idCluster, cl.nome AS nomeCluster, AVG(rc.em_uso) AS average_uso
        FROM maquina AS m
        JOIN componente AS c ON m.id = c.maquina_id
        JOIN registro_componente AS rc ON c.id = rc.componente_id
        JOIN cluster AS cl ON m.cluster_id = cl.id
        JOIN empresa AS e ON cl.empresa_id = e.id
        WHERE c.nome = 'Memoria'
          AND e.id = ${idEmpresa}
          AND MONTH(rc.dt_hora) = MONTH(CURDATE())
          AND YEAR(rc.dt_hora) = YEAR(CURDATE())
        GROUP BY m.id, m.nome, cl.id, cl.nome;
        
        `;
    } else if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucao = `SELECT m.id as idMaquina, m.nome as nomeMaquina, cl.id AS idCluster, cl.nome AS nomeCluster, AVG(rc.em_uso) AS average_uso
        FROM maquina AS m
        JOIN componente AS c ON m.id = c.maquina_id
        JOIN registro_componente AS rc ON c.id = rc.componente_id
        JOIN cluster AS cl ON m.cluster_id = cl.id
        JOIN empresa AS e ON cl.empresa_id = e.id
        WHERE c.nome = 'Memoria'
        AND e.id = ${idEmpresa}
        AND MONTH(rc.dt_hora) = MONTH(GETDATE())
        AND YEAR(rc.dt_hora) = YEAR(GETDATE())
        GROUP BY m.id, m.nome, cl.id, cl.nome;
    `;
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarDiscoLivrePorCluster(idEmpresa) {
    console.log("ACESSEI O RELATORIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarDiscoLivrePorCluster():", idEmpresa);

    let instrucao = "";

    if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucao = `SELECT m.nome AS nomeMaquina, m.id AS idMaquina, c.nome AS nomeCluster, c.id AS idCluster, 
        (100.0 - AVG(rc.em_uso)) AS discoLivrePercentagem
    FROM registro_componente AS rc 
    JOIN componente AS co ON rc.componente_id = co.id
    JOIN maquina AS m ON co.maquina_id = m.id
    JOIN cluster AS c ON m.cluster_id = c.id
    JOIN empresa AS e ON c.empresa_id = e.id
    WHERE e.id = ${idEmpresa}
    GROUP BY m.id, c.id;
    
        `;
    } else if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucao = `SELECT m.nome AS nomeMaquina, m.id AS idMaquina, c.nome AS nomeCluster, c.id AS idCluster, 
    (100.0 - AVG(rc.em_uso)) AS discoLivrePercentagem
    FROM registro_componente AS rc 
    JOIN componente AS co ON rc.componente_id = co.id
    JOIN maquina AS m ON co.maquina_id = m.id
    JOIN cluster AS c ON m.cluster_id = c.id
    JOIN empresa AS e ON c.empresa_id = e.id
    WHERE e.id = ${idEmpresa}
    GROUP BY m.nome, m.id, c.nome, c.id;    
    `;
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    buscarDadosAlertas,
    buscarQuantidadeAlertas,
    buscarClusterComMaisAlertas,
    buscarComponenteEmMaisAlertas,
    buscarUsoCpuPorCluster,
    buscarUsoMemoriaPorCluster,
    buscarDiscoLivrePorCluster
};


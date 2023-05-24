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

function buscarDadosPorMaquina(idEmpresa) {
    console.log("ACESSEI O RELATORIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarDadosPorMaquina():", idEmpresa);

    let instrucao = "";

    if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucao = `SELECT
        m.nome AS nomeMaquina,
        m.id AS idMaquina,
        cl.nome AS nomeCluster,
        cl.id AS idCluster,
        m.metrica_cpu AS metricaCpu,
        m.metrica_disco AS metricaDisco,
        m.metrica_memoria AS metricaMemoria,
        (
            SELECT AVG(rc.em_uso)
            FROM registro_componente rc
            JOIN componente co ON rc.componente_id = co.id
            JOIN maquina AS ma ON co.maquina_id = ma.id 
            JOIN cluster AS clu ON ma.cluster_id = clu.id
            JOIN empresa AS e ON clu.empresa_id = e.id
            WHERE e.id = ${idEmpresa}
                AND MONTH(rc.dt_hora) = MONTH(CURRENT_DATE())
                AND YEAR(rc.dt_hora) = YEAR(CURRENT_DATE())
                AND co.nome = 'Disco'
                AND ma.id = m.id
        ) AS usoDisco,
        (
            SELECT AVG(rc.em_uso)
            FROM registro_componente rc
            JOIN componente co ON rc.componente_id = co.id
            JOIN maquina AS ma ON co.maquina_id = ma.id 
            JOIN cluster AS clu ON ma.cluster_id = clu.id
            JOIN empresa AS e ON clu.empresa_id = e.id
            WHERE e.id = ${idEmpresa}
                AND MONTH(rc.dt_hora) = MONTH(CURRENT_DATE())
                AND YEAR(rc.dt_hora) = YEAR(CURRENT_DATE())
                AND co.nome = 'Memoria'
                AND ma.id = m.id
        ) AS usoMemoria,
        (
            SELECT AVG(rc.em_uso)
            FROM registro_componente rc
            JOIN componente co ON rc.componente_id = co.id
            JOIN maquina AS ma ON co.maquina_id = ma.id 
            JOIN cluster AS clu ON ma.cluster_id = clu.id
            JOIN empresa AS e ON clu.empresa_id = e.id
            WHERE e.id = ${idEmpresa}
                AND MONTH(rc.dt_hora) = MONTH(CURRENT_DATE())
                AND YEAR(rc.dt_hora) = YEAR(CURRENT_DATE())
                AND co.nome = 'CPU'
                AND ma.id = m.id
        ) AS usoCpu,
        (
            SELECT COUNT(ha.id) AS qtdAlertasMes
            FROM historico_alerta AS ha 
            JOIN maquina AS ma ON ha.maquina_id = ma.id 
            JOIN cluster AS clu ON ma.cluster_id = clu.id
            JOIN empresa AS e ON clu.empresa_id = e.id
            WHERE e.id = ${idEmpresa}
                AND MONTH(ha.dt_hora) = MONTH(CURRENT_DATE())
                AND YEAR(ha.dt_hora) = YEAR(CURRENT_DATE())
                AND ma.id = m.id
        ) AS qtdAlertas
    FROM
        registro_componente AS rc
        JOIN componente AS co ON rc.componente_id = co.id
        JOIN maquina AS m ON co.maquina_id = m.id
        JOIN cluster AS cl ON m.cluster_id = cl.id
        JOIN empresa AS e ON cl.empresa_id = e.id
    WHERE
        e.id = ${idEmpresa}
        AND MONTH(rc.dt_hora) = MONTH(CURRENT_DATE())
        AND YEAR(rc.dt_hora) = YEAR(CURRENT_DATE())
    GROUP BY
        m.nome,
        m.id,
        cl.nome,
        cl.id,
        m.metrica_cpu,
        m.metrica_disco,
        m.metrica_memoria;
    
    
        `;
    } else if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucao = `
        SELECT
            m.nome AS nomeMaquina,
            m.id AS idMaquina,
            cl.nome AS nomeCluster,
            cl.id AS idCluster,
            m.metrica_cpu AS metricaCpu,
            m.metrica_disco AS metricaDisco,
            m.metrica_memoria AS metricaMemoria,
            (
                SELECT AVG(rc.em_uso)
                FROM registro_componente rc
                JOIN componente co ON rc.componente_id = co.id
                JOIN maquina AS ma ON co.maquina_id = ma.id 
                JOIN cluster AS clu ON ma.cluster_id = clu.id
                JOIN empresa AS e ON clu.empresa_id = e.id
                WHERE e.id = ${idEmpresa}
                    AND MONTH(rc.dt_hora) = MONTH(GETDATE())
                    AND YEAR(rc.dt_hora) = YEAR(GETDATE())
                    AND co.nome = 'Disco'
                    AND ma.id = m.id
            ) AS usoDisco,
            (
                SELECT AVG(rc.em_uso)
                FROM registro_componente rc
                JOIN componente co ON rc.componente_id = co.id
                JOIN maquina AS ma ON co.maquina_id = ma.id 
                JOIN cluster AS clu ON ma.cluster_id = clu.id
                JOIN empresa AS e ON clu.empresa_id = e.id
                WHERE e.id = ${idEmpresa}
                    AND MONTH(rc.dt_hora) = MONTH(GETDATE())
                    AND YEAR(rc.dt_hora) = YEAR(GETDATE())
                    AND co.nome = 'Memoria'
                    AND ma.id = m.id
            ) AS usoMemoria,
            (
                SELECT AVG(rc.em_uso)
                FROM registro_componente rc
                JOIN componente co ON rc.componente_id = co.id
                JOIN maquina AS ma ON co.maquina_id = ma.id 
                JOIN cluster AS clu ON ma.cluster_id = clu.id
                JOIN empresa AS e ON clu.empresa_id = e.id
                WHERE e.id = ${idEmpresa}
                    AND MONTH(rc.dt_hora) = MONTH(GETDATE())
                    AND YEAR(rc.dt_hora) = YEAR(GETDATE())
                    AND co.nome = 'CPU'
                    AND ma.id = m.id
            ) AS usoCpu,
            (
                SELECT COUNT(ha.id) AS qtdAlertasMes
                FROM historico_alerta AS ha 
                JOIN maquina AS ma ON ha.maquina_id = ma.id 
                JOIN cluster AS clu ON ma.cluster_id = clu.id
                JOIN empresa AS e ON clu.empresa_id = e.id
                WHERE e.id = ${idEmpresa}
                    AND MONTH(ha.dt_hora) = MONTH(GETDATE())
                    AND YEAR(ha.dt_hora) = YEAR(GETDATE())
                    AND ma.id = m.id
            ) AS qtdAlertas
        FROM
            registro_componente AS rc
            JOIN componente AS co ON rc.componente_id = co.id
            JOIN maquina AS m ON co.maquina_id = m.id
            JOIN cluster AS cl ON m.cluster_id = cl.id
            JOIN empresa AS e ON cl.empresa_id = e.id
        WHERE
            e.id = ${idEmpresa}
            AND MONTH(rc.dt_hora) = MONTH(GETDATE())
            AND YEAR(rc.dt_hora) = YEAR(GETDATE())
        GROUP BY
            m.nome,
            m.id,
            cl.nome,
            cl.id,
            m.metrica_cpu,
            m.metrica_disco,
            m.metrica_memoria;
        
    `;
    }

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarQtdMaquinas(idEmpresa) {
    console.log("ACESSEI O RELATORIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarQtdMaquinas():", idEmpresa);

    let instrucao = `
    SELECT COUNT(m.id) AS qtdMaquinas 
    FROM maquina AS m 
    JOIN cluster as c ON m.cluster_id = c.id 
    JOIN empresa as e ON c.empresa_id = e.id 
    WHERE e.id = ${idEmpresa} ;
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarQtdClusters(idEmpresa) {
    console.log("ACESSEI O RELATORIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarQtdClusters():", idEmpresa);

    let instrucao = `
    SELECT COUNT(c.id) AS qtdClusters
    FROM cluster as c 
    JOIN empresa as e ON c.empresa_id = e.id 
    WHERE e.id = ${idEmpresa} ;
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarDadosRede(idEmpresa) {
    console.log("ACESSEI O RELATORIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarQtdClusters():", idEmpresa);

    let instrucao = `
    SELECT r.* FROM rede r 
    JOIN maquina m ON r.maquina_id = m.id
    JOIN cluster c ON m.cluster_id = c.id
    JOIN empresa e ON c.empresa_id = e.id
    WHERE e.id = ${idEmpresa}; ;
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarmediaAlertasPorCluster(idEmpresa) {
    console.log("ACESSEI O RELATORIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarmediaAlertasPorCluster():", idEmpresa);

    let instrucao = ""
    if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucao =  `
        SELECT c.id AS clusterId, c.nome AS clusterNome, 
       COUNT(DISTINCT m.id) AS totalMaquinas,
       COUNT(DISTINCT ha.id) AS totalAlertas
        FROM cluster c
        JOIN empresa e ON c.empresa_id = e.id
        LEFT JOIN maquina m ON c.id = m.cluster_id
        LEFT JOIN historico_alerta ha ON m.id = ha.maquina_id
        WHERE e.id = ${idEmpresa}
        AND MONTH(ha.dt_hora) = MONTH(CURDATE())
        AND YEAR(ha.dt_hora) = YEAR(CURDATE())
        GROUP BY c.id, c.nome;

        `

    } else if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucao =   `
        SELECT c.id AS clusterId, c.nome AS clusterNome, 
       (SELECT COUNT(DISTINCT m.id) FROM maquina m WHERE m.cluster_id = c.id) AS totalMaquinas,
       (SELECT COUNT(DISTINCT ha.id) FROM historico_alerta ha JOIN maquina m ON ha.maquina_id = m.id WHERE m.cluster_id = c.id) AS totalAlertas
        FROM cluster c
        JOIN empresa e ON c.empresa_id = e.id
        LEFT JOIN maquina m ON c.id = m.cluster_id
        LEFT JOIN historico_alerta ha ON m.id = ha.maquina_id
        WHERE e.id = ${idEmpresa}
            AND MONTH(ha.dt_hora) = MONTH(GETDATE())
            AND YEAR(ha.dt_hora) = YEAR(GETDATE())
        GROUP BY c.id, c.nome;
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
    buscarDadosPorMaquina,
    buscarQtdMaquinas,
    buscarQtdClusters,
    buscarmediaAlertasPorCluster,
    buscarDadosRede
};


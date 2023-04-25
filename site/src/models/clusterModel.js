

var database = require("../database/config");
if(process.env.AMBIENTE_PROCESSO == "desenvolvimento"){

function buscarDadosCluster(idEmpresa) {
    console.log("ACESSEI O CLUSTER MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
    SELECT *
    FROM cluster 
    WHERE empresa_id = '${idEmpresa}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarDadosMaquina(idCluster) {
    console.log("ACESSEI O CLUSTER MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
    SELECT *
    FROM maquina 
    WHERE cluster_id = '${idCluster}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function deletarCluster(clusterId) {
    console.log("ACESSEI O CLUSTER MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
    SELECT *
    FROM maquina 
    WHERE cluster_id = '${clusterId}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function adicionarCluster(idEmpresa) {
    console.log("ACESSEI O CLUSTER MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", idEmpresa);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `

    INSERT INTO cluster (nome, empresa_id) VALUES 
    ('Cluster', '${idEmpresa}');

    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function adicionarMaquina(id) {
    console.log("ACESSEI O CLUSTER MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", id);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
    INSERT INTO maquina (nome, metrica_cpu, metrica_disco, metrica_memoria, cluster_id) VALUES
    ('Máquina', 70.00, 70.00, 70.00, ${id}); 
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function confirmarAlteracaoInfoMaquina(idMaquina, inputNome, inputCpu, inputDisco, inputMemoria) {
    console.log("ACESSEI O CLUSTER MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function alterar(): ", idMaquina, inputNome, inputCpu, inputDisco, inputMemoria)

    var instrucao = ` 
    UPDATE maquina SET nome = '${inputNome}', metrica_cpu = ${inputCpu}, metrica_disco = ${inputDisco}, metrica_memoria = ${inputMemoria} 
    Where id = ${idMaquina};`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function confirmarNomeCluster(idCluster, nome) {
    console.log("ACESSEI O CLUSTER MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function alterar(): ", idCluster, nome)

    var instrucao = `UPDATE cluster SET nome = '${nome}'
    WHERE id = ${idCluster}`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function deletarClusterComMaquina(id) {
    console.log("ACESSEI O CLUSTER MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar(): ", id)

    var instrucao = `    
    DELETE 
    FROM cluster 
    WHERE id = ${id};`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function deletarMaquinaDoCluster(id) {
    console.log("ACESSEI O CLUSTER MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar(): ", id)

    var instrucao = `    
    DELETE 
    FROM maquina 
    WHERE cluster_id = ${id};`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function deletarClusterSemMaquina(id) {
    console.log("ACESSEI O CLUSTER MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar(): ", id)

    var instrucao = `    
    DELETE 
    FROM cluster 
    WHERE id = ${id};`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function deletarMaquina(idMaquina) {
    console.log("ACESSEI O CLUSTER MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar(): ", idMaquina)

    var instrucao = `    
    DELETE 
    FROM maquina 
    WHERE id = ${idMaquina};`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

///////////////////// SQL SERVER ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}else if(process.env.AMBIENTE_PROCESSO == "producao"){
    function buscarDadosCluster(idEmpresa) {
        console.log("ACESSEI O CLUSTER MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
        var instrucao = `
        SELECT *
        FROM cluster 
        WHERE empresa_id = '${idEmpresa}';
        `;
        console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao);
    }
    
    function buscarDadosMaquina(idCluster) {
        console.log("ACESSEI O CLUSTER MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
        var instrucao = `
        SELECT *
        FROM maquina 
        WHERE cluster_id = '${idCluster}';
        `;
        console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao);
    }
    
    function deletarCluster(clusterId) {
        console.log("ACESSEI O CLUSTER MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
        var instrucao = `
        SELECT *
        FROM maquina 
        WHERE cluster_id = '${clusterId}';
        `;
        console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao);
    }
    
    function adicionarCluster(idEmpresa) {
        console.log("ACESSEI O CLUSTER MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", idEmpresa);
        
        // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
        //  e na ordem de inserção dos dados.
        var instrucao = `
    
        INSERT INTO cluster (nome, empresa_id) VALUES 
        ('Cluster', '${idEmpresa}');
    
        `;
        console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao);
    }
    
    function adicionarMaquina(id) {
        console.log("ACESSEI O CLUSTER MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", id);
        
        // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
        //  e na ordem de inserção dos dados.
        var instrucao = `
        INSERT INTO maquina (nome, metrica_cpu, metrica_disco, metrica_memoria, cluster_id) VALUES
        ('Máquina', 70.00, 70.00, 70.00, ${id}); 
        `;
        console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao);
    }
    
    function confirmarAlteracaoInfoMaquina(idMaquina, inputNome, inputCpu, inputDisco, inputMemoria) {
        console.log("ACESSEI O CLUSTER MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function alterar(): ", idMaquina, inputNome, inputCpu, inputDisco, inputMemoria)
    
        var instrucao = ` 
        UPDATE maquina SET nome = '${inputNome}', metrica_cpu = ${inputCpu}, metrica_disco = ${inputDisco}, metrica_memoria = ${inputMemoria} 
        Where id = ${idMaquina};`;
        console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao);
    }
    
    function confirmarNomeCluster(idCluster, nome) {
        console.log("ACESSEI O CLUSTER MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function alterar(): ", idCluster, nome)
    
        var instrucao = `UPDATE cluster SET nome = '${nome}'
        WHERE id = ${idCluster}`;
        console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao);
    }
    
    function deletarClusterComMaquina(id) {
        console.log("ACESSEI O CLUSTER MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar(): ", id)
    
        var instrucao = `    
        DELETE 
        FROM cluster 
        WHERE id = ${id};`;
        console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao);
    }
    
    function deletarMaquinaDoCluster(id) {
        console.log("ACESSEI O CLUSTER MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar(): ", id)
    
        var instrucao = `    
        DELETE 
        FROM maquina 
        WHERE cluster_id = ${id};`;
        console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao);
    }
    
    function deletarClusterSemMaquina(id) {
        console.log("ACESSEI O CLUSTER MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar(): ", id)
    
        var instrucao = `    
        DELETE 
        FROM cluster 
        WHERE id = ${id};`;
        console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao);
    }
    
    function deletarMaquina(idMaquina) {
        console.log("ACESSEI O CLUSTER MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar(): ", idMaquina)
    
        var instrucao = `    
        DELETE 
        FROM maquina 
        WHERE id = ${idMaquina};`;
        console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao);
    }
}

module.exports = {
    buscarDadosCluster,
    buscarDadosMaquina,
    adicionarCluster,
    adicionarMaquina,
    confirmarNomeCluster,
    deletarCluster,
    deletarClusterComMaquina,
    deletarClusterSemMaquina,
    deletarMaquinaDoCluster,
    confirmarAlteracaoInfoMaquina,
    deletarMaquina
};
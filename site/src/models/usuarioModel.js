var database = require("../database/config");

function buscarDadosUsuario(id) {
    console.log("ACESSEI O Perfil MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarDadosUsuario():", id);

    const instrucao = `SELECT * FROM Perfil WHERE id = ${id}`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrar(nome, sobrenome, email, telefone, cpf, senha) {
    console.log("ACESSEI O Perfil MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, sobrenome, email, telefone, cpf, senha);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO Usuario (nome, sobrenome, email, senha, telefone, cpf) VALUES ('${nome}', '${sobrenome}', '${email}', '${senha}', '${telefone}', '${cpf}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function entrar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
        SELECT * FROM Usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function confirmarNome(nome, id) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function alterar(): ", nome, id)

    var instrucao = `UPDATE Usuario SET nome = '${nome}'
    WHERE id = ${id}`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function confirmarSobrenome(sobrenome, id) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function alterar(): ", sobrenome, id)

    var instrucao = `UPDATE Usuario SET sobrenome = '${sobrenome}'
    WHERE id = ${id}`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function confirmarTelefone(telefone, id) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function alterar(): ", telefone, id)

    var instrucao = `UPDATE Usuario SET telefone = '${telefone}'
    WHERE id = ${id}`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function confirmarSenha(senha, id) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function alterar(): ", senha, id)

    var instrucao = `UPDATE Usuario SET senha = '${senha}'
    WHERE id = ${id}`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function deletarConta(id) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar(): ", id)

    var instrucao = `DELETE FROM Usuario WHERE id = ${id}`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function adicionarPermissao(id, email, permissao) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar(): ", id, email, permissao)

    // ON DUPLICATE KEY UPDATE se uma linha com essa chave já existir, a cláusula UPDATE será executada em vez da instrução INSERT. Isso permite que você insira novas linhas na tabela, mas também atualize as linhas existentes se necessário.
    var instrucao = `INSERT INTO Usuario (id, email, permissao) VALUES (${id}, ${email}, ${permissao}) 
    ON DUPLICATE KEY UPDATE id=${id};`;
    
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);

}

function excluirPermissao(email) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar(): ", email)

    var instrucao = `DELETE FROM Usuario WHERE email = ${email}`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarHistorico(idUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarHistorico(idUsuario)");
    var instrucao = `
    select email,adm from Usuario where empresa_id=1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


module.exports = {
    cadastrar,
    entrar,
    confirmarNome,
    buscarDadosUsuario,
    confirmarSobrenome,
    confirmarTelefone,
    confirmarSenha,
    deletarConta,
    adicionarPermissao,
    excluirPermissao,
    listarHistorico
};
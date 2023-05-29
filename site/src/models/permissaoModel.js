var database = require("../database/config");


function listar(empresa) {
    console.log("ACESSEI O permissao MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT * 
        FROM usuario 
        where empresa_id = ${empresa}
        ;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function verificarPermissao(id) {
    console.log("ACESSEI O permissao MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function verificarPermissao()");
    var instrucao = `
        SELECT * 
        FROM usuario 
        where id = ${id}
        ;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarEmail(email) {
    console.log("ACESSEI O permissao MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarEmail()");
    var instrucao = `
        SELECT * 
        FROM usuario 
        where mail = '${email}'
        ;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function tirar(email, empresa) {
    console.log("ACESSEI O permissao MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function tirar(): ");
    var instrucao = `
        UPDATE usuario 
        SET adm = 0
        WHERE email = '${email}'
        AND empresa_id = ${empresa}
        ;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function concederPermissao(email, empresa) {
    console.log("ACESSEI O permissao MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function concederPermissao(): ", email);
    var instrucao = `
        UPDATE usuario 
        SET adm = 1 
        WHERE email = '${email}'
        AND empresa_id = ${empresa}
        ;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function concederPermissaoRegistro(email, empresa) {
    console.log("ACESSEI O permissao MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function concederPermissaoRegistro(): ", email);
    var instrucao = `
        UPDATE usuario 
        SET adm = 1, empresa_id = ${empresa}
        WHERE email = '${email}'
        ;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function concederAcesso(email, empresa) {
    console.log("ACESSEI O permissao MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function concederAcesso(): ", email);
    var instrucao = `
        UPDATE usuario 
        SET adm = 0, empresa_id = ${empresa}
        WHERE email = '${email}'
        ;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function remover(email) {
    console.log("ACESSEI O permissao MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function remover(): ", email);
    var instrucao = `
        UPDATE usuario 
        SET adm = 0, empresa_id = null
        WHERE email = '${email}'
        ;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listar,
    tirar,
    concederPermissao,
    concederPermissaoRegistro,
    concederAcesso,
    remover,
    buscarEmail,
    verificarPermissao
}

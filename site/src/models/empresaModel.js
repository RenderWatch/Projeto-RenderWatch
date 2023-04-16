var database = require("../database/config");

function mostrarDadosEmpresa(idUser) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
    SELECT *
    FROM Empresa
    WHERE id = (SELECT empresa_id FROM Usuario WHERE id = ${idUser});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarEmpresa(razaoSocial, cnpj, telefone, cep, logradouro, numero, complemento, bairro, cidade, estado) {
    console.log("ACESSEI O Perfil MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", razaoSocial, cnpj, telefone, cep, logradouro, numero, complemento, bairro, cidade, estado);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO Empresa (razaoSocial, cnpj, telefone, logradouro, numero, bairro, complemento,  cidade, estado, cep) VALUES ('${razaoSocial}', '${cnpj}', '${telefone}', '${logradouro}', '${numero}', '${bairro}', '${complemento}',  '${cidade}', '${estado}', '${cep}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizarEmpresaUsuario(idUser, cnpj) {
    console.log("ACESSEI O Perfil MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizarEmpresaUsuario():", idUser, cnpj);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
    UPDATE Usuario 
    SET empresa_id = (SELECT id FROM Empresa where cnpj = ${cnpj})
    where id = ${idUser};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrarEmpresa,
    atualizarEmpresaUsuario,
    mostrarDadosEmpresa
};
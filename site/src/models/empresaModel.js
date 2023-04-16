var database = require("../database/config");

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

module.exports = {
    cadastrarEmpresa
};
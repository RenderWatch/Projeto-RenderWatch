var database = require("../database/config");

if(process.env.AMBIENTE_PROCESSO == "desenvolvimento"){

function buscarDadosUsuario(id) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarDadosUsuario():", id);
        
    const instrucao = `SELECT * FROM usuario WHERE id = ${id}`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
  }

function cadastrar(nome, sobrenome,  email, telefone, cpf, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, sobrenome,  email, telefone, cpf, senha);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO usuario (nome, sobrenome, email, senha, telefone, cpf) VALUES ('${nome}', '${sobrenome}', '${email}', '${senha}', '${telefone}', '${cpf}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function entrar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
        SELECT * FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function confirmarNome(nome, id) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function alterar(): ", nome, id)

    var instrucao = `UPDATE usuario SET nome = '${nome}'
    WHERE id = ${id}`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function confirmarSobrenome(sobrenome, id) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function alterar(): ", sobrenome, id)

    var instrucao = `UPDATE usuario SET sobrenome = '${sobrenome}'
    WHERE id = ${id}`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function confirmarTelefone(telefone, id) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function alterar(): ", telefone, id)

    var instrucao = `UPDATE usuario SET telefone = '${telefone}'
    WHERE id = ${id}`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function confirmarSenha(senha, id) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function alterar(): ", senha, id)

    var instrucao = `UPDATE usuario SET senha = '${senha}'
    WHERE id = ${id}`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function deletarConta(id) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar(): ", id)

    var instrucao = `DELETE FROM usuario WHERE id = ${id}`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
///////////////////// SQL SERVER ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}else if(process.env.AMBIENTE_PROCESSO == "producao"){
    function buscarDadosUsuario(id) {
        console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarDadosUsuario():", id);
            
        const instrucao = `SELECT * FROM usuario WHERE id = ${id}`;
    
        console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao);
      }
    
    function cadastrar(nome, sobrenome,  email, telefone, cpf, senha) {
        console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, sobrenome,  email, telefone, cpf, senha);
        
        // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
        //  e na ordem de inserção dos dados.
        var instrucao = `
            INSERT INTO usuario (nome, sobrenome, email, senha, telefone, cpf) VALUES ('${nome}', '${sobrenome}', '${email}', '${senha}', '${telefone}', '${cpf}');
        `;
        console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao);
    }
    
    function entrar(email, senha) {
        console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
        var instrucao = `
            SELECT * FROM usuario WHERE email = '${email}' AND senha = '${senha}';
        `;
        console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao);
    }
    
    function confirmarNome(nome, id) {
        console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function alterar(): ", nome, id)
    
        var instrucao = `UPDATE usuario SET nome = '${nome}'
        WHERE id = ${id}`;
        console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao);
    }
    
    function confirmarSobrenome(sobrenome, id) {
        console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function alterar(): ", sobrenome, id)
    
        var instrucao = `UPDATE usuario SET sobrenome = '${sobrenome}'
        WHERE id = ${id}`;
        console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao);
    }
    
    function confirmarTelefone(telefone, id) {
        console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function alterar(): ", telefone, id)
    
        var instrucao = `UPDATE usuario SET telefone = '${telefone}'
        WHERE id = ${id}`;
        console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao);
    }
    
    function confirmarSenha(senha, id) {
        console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function alterar(): ", senha, id)
    
        var instrucao = `UPDATE usuario SET senha = '${senha}'
        WHERE id = ${id}`;
        console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao);
    }
    
    function deletarConta(id) {
        console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar(): ", id)
    
        var instrucao = `DELETE FROM usuario WHERE id = ${id}`;
        console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao);
    }
    


    
}



module.exports = {
    cadastrar,
    entrar,
    confirmarNome,
    buscarDadosUsuario,
    confirmarSobrenome,
    confirmarTelefone,
    confirmarSenha,
    deletarConta
};


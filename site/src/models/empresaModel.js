var database = require("../database/config");

if(process.env.AMBIENTE_PROCESSO == "desenvolvimento"){

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

function cadastrarEmpresa(razao_social, cnpj, telefone, cep, logradouro, numero, complemento, bairro, cidade, estado) {
    console.log("ACESSEI O Perfil MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", razao_social, cnpj, telefone, cep, logradouro, numero, complemento, bairro, cidade, estado);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO Empresa (razao_social, cnpj, telefone, logradouro, numero, bairro, complemento,  cidade, estado, cep) VALUES ('${razao_social}', '${cnpj}', '${telefone}', '${logradouro}', '${numero}', '${bairro}', '${complemento}',  '${cidade}', '${estado}', '${cep}');
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

function confirmarCnpj(cnpj, id) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function alterar(): ", cnpj, id)

    var instrucao = `UPDATE Empresa SET cnpj = '${cnpj}'
    WHERE id = ${id}`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function confirmarTelefone(telefone, id) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function alterar(): ", telefone, id)

    var instrucao = `UPDATE Empresa SET telefone = '${telefone}'
    WHERE id = ${id}`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function confirmarLogradouro(logradouro, id) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function alterar(): ", logradouro, id)

    var instrucao = `UPDATE Empresa SET logradouro = '${logradouro}'
    WHERE id = ${id}`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function confirmarNumero(numero, id) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function alterar(): ", numero, id)

    var instrucao = `UPDATE Empresa SET numero = '${numero}'
    WHERE id = ${id}`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function confirmarBairro(bairro, id) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function alterar(): ", bairro, id)

    var instrucao = `UPDATE Empresa SET bairro = '${bairro}'
    WHERE id = ${id}`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function confirmarComplemento(complemento, id) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function alterar(): ", complemento, id)

    var instrucao = `UPDATE Empresa SET complemento = '${complemento}'
    WHERE id = ${id}`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function confirmarCidade(cidade, id) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function alterar(): ", cidade, id)

    var instrucao = `UPDATE Empresa SET cidade = '${cidade}'
    WHERE id = ${id}`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function confirmarEstado(estado, id) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function alterar(): ", estado, id)

    var instrucao = `UPDATE Empresa SET estado = '${estado}'
    WHERE id = ${id}`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function confirmarCep(cep, id) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function alterar(): ", cep, id)

    var instrucao = `UPDATE Empresa SET cep = '${cep}'
    WHERE id = ${id}`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function confirmarRazaoSocial(razao_social, id) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function alterar(): ", razao_social, id)

    var instrucao = `UPDATE Empresa SET razao_social = '${razao_social}'
    WHERE id = ${id}`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function deletarEmpresa(id) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar(): ", id)

    var instrucao = `    
    DELETE Usuario, Empresa 
    FROM Usuario 
    INNER JOIN Empresa ON Usuario.empresa_id = Empresa.id 
    WHERE Empresa.id = ${id};`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

///////////////////// SQL SERVER ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}else if(process.env.AMBIENTE_PROCESSO == "producao"){

    function mostrarDadosEmpresa(idUser) {
        console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
        var instrucao = `
        SELECT *
        FROM empresa
        WHERE id = (SELECT empresa_id FROM usuario WHERE id = ${idUser});
        `;
        console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao);
    }
    
    function cadastrarEmpresa(razao_social, cnpj, telefone, cep, logradouro, numero, complemento, bairro, cidade, estado) {
        console.log("ACESSEI O Perfil MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", razao_social, cnpj, telefone, cep, logradouro, numero, complemento, bairro, cidade, estado);
        
        // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
        //  e na ordem de inserção dos dados.
        var instrucao = `
            INSERT INTO empresa (razao_social, cnpj, telefone, logradouro, numero, bairro, complemento,  cidade, estado, cep) VALUES ('${razao_social}', '${cnpj}', '${telefone}', '${logradouro}', '${numero}', '${bairro}', '${complemento}',  '${cidade}', '${estado}', '${cep}');
        `;
        console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao);
    }
    
    function atualizarEmpresaUsuario(idUser, cnpj) {
        console.log("ACESSEI O Perfil MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizarEmpresaUsuario():", idUser, cnpj);
        
        // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
        //  e na ordem de inserção dos dados.
        var instrucao = `
        UPDATE usuario 
        SET empresa_id = (SELECT id FROM Empresa where cnpj = ${cnpj})
        where id = ${idUser};
        `;
        console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao);
    }
    
    function confirmarCnpj(cnpj, id) {
        console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function alterar(): ", cnpj, id)
    
        var instrucao = `UPDATE empresa SET cnpj = '${cnpj}'
        WHERE id = ${id}`;
        console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao);
    }
    
    function confirmarTelefone(telefone, id) {
        console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function alterar(): ", telefone, id)
    
        var instrucao = `UPDATE empresa SET telefone = '${telefone}'
        WHERE id = ${id}`;
        console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao);
    }
    
    function confirmarLogradouro(logradouro, id) {
        console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function alterar(): ", logradouro, id)
    
        var instrucao = `UPDATE empresa SET logradouro = '${logradouro}'
        WHERE id = ${id}`;
        console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao);
    }
    
    function confirmarNumero(numero, id) {
        console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function alterar(): ", numero, id)
    
        var instrucao = `UPDATE empresa SET numero = '${numero}'
        WHERE id = ${id}`;
        console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao);
    }
    
    function confirmarBairro(bairro, id) {
        console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function alterar(): ", bairro, id)
    
        var instrucao = `UPDATE empresa SET bairro = '${bairro}'
        WHERE id = ${id}`;
        console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao);
    }
    
    function confirmarComplemento(complemento, id) {
        console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function alterar(): ", complemento, id)
    
        var instrucao = `UPDATE empresa SET complemento = '${complemento}'
        WHERE id = ${id}`;
        console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao);
    }
    
    function confirmarCidade(cidade, id) {
        console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function alterar(): ", cidade, id)
    
        var instrucao = `UPDATE empresa SET cidade = '${cidade}'
        WHERE id = ${id}`;
        console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao);
    }
    
    function confirmarEstado(estado, id) {
        console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function alterar(): ", estado, id)
    
        var instrucao = `UPDATE empresa SET estado = '${estado}'
        WHERE id = ${id}`;
        console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao);
    }
    
    function confirmarCep(cep, id) {
        console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function alterar(): ", cep, id)
    
        var instrucao = `UPDATE empresa SET cep = '${cep}'
        WHERE id = ${id}`;
        console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao);
    }
    
    function confirmarRazaoSocial(razao_social, id) {
        console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function alterar(): ", razao_social, id)
    
        var instrucao = `UPDATE empresa SET razao_social = '${razao_social}'
        WHERE id = ${id}`;
        console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao);
    }
    
    function deletarEmpresa(id) {
        console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar(): ", id)
    
        var instrucao = `    
        DELETE usuario, empresa 
        FROM usuario 
        INNER JOIN empresa ON usuario.empresa_id = empresa.id 
        WHERE empresa.id = ${id}`;
        console.log("Executando a instrução SQL: \n" + instrucao);
        return database.executar(instrucao);
    }

}
module.exports = {
    cadastrarEmpresa,
    atualizarEmpresaUsuario,
    mostrarDadosEmpresa,
    confirmarRazaoSocial,
    confirmarCnpj,
    confirmarTelefone,
    confirmarLogradouro,
    confirmarNumero,
    confirmarBairro,
    confirmarComplemento,
    confirmarCidade,
    confirmarEstado,
    confirmarCep,
    deletarEmpresa
};
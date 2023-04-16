var empresaModel = require("../models/empresaModel");

function cadastrarEmpresa(req, res) {

    var razaoSocial = req.body.razaoSocial
    var cnpj = req.body.cnpj
    var telefone = req.body.telefone
    var cep = req.body.cep
    var logradouro = req.body.logradouro
    var numero = req.body.numero
    var complemento = req.body.complemento
    var bairro = req.body.bairro
    var cidade = req.body.cidade
    var estado = req.body.estado

    if (razaoSocial == undefined) {
        res.status(400).send("razaoSocial está undefined!");
    } else if (cnpj == undefined) {
        res.status(400).send("cnpj está undefined!");
    } else if (telefone == undefined) {
        res.status(400).send("Seu telefone está undefined!");
    } else if (cep == undefined) {
        res.status(400).send("cep está undefined!");
    }  else if (logradouro == undefined) {
        res.status(400).send("logradouro está undefined!");
    }  else if (numero == undefined) {
        res.status(400).send("numero está undefined!");
    }  else if (complemento == undefined) {
        res.status(400).send("complemento está undefined!");
    }  else if (bairro == undefined) {
        res.status(400).send("bairro está undefined!");
    }  else if (cidade == undefined) {
        res.status(400).send("cidade está undefined!");
    }  else if (estado == undefined) {
        res.status(400).send("estado está undefined!");
    } else {
        
        empresaModel.cadastrarEmpresa(razaoSocial, cnpj, telefone, cep, logradouro, numero, complemento, bairro, cidade, estado)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function atualizarEmpresaUsuario(req, res) {

    var idUser = req.body.idUser
    var cnpj = req.body.cnpj


    if (cnpj == undefined) {
        res.status(400).send("cnpj está undefined!");
    } else {
        
        empresaModel.atualizarEmpresaUsuario(idUser, cnpj)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function mostrarDadosEmpresa(req, res) {
    var idUser = req.params.idUser

    empresaModel.mostrarDadosEmpresa(idUser).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao realizar a consulta: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


module.exports = {
    cadastrarEmpresa,
    atualizarEmpresaUsuario,
    mostrarDadosEmpresa
    }
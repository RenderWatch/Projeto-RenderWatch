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

function confirmarRazaoSocial(req, res) {
    var razao_social = req.body.razao_social;
    var id = req.body.id;
    if (razao_social == undefined) {
        res.status(400).send("razao_social está undefined!");
    } else {
        empresaModel.confirmarRazaoSocial(razao_social, id)
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


function confirmarCnpj(req, res) {
    var cnpj = req.body.cnpj;
    var id = req.body.id;
    if (cnpj == undefined) {
        res.status(400).send("cnpj está undefined!");
    } else {
        empresaModel.confirmarCnpj(cnpj, id)
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


function confirmarTelefone(req, res) {
    var telefone = req.body.telefone;
    var id = req.body.id;
    if (telefone == undefined) {
        res.status(400).send("telefone está undefined!");
    } else {
        empresaModel.confirmarTelefone(telefone, id)
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


function confirmarLogradouro(req, res) {
    var logradouro = req.body.logradouro;
    var id = req.body.id;
    if (logradouro == undefined) {
        res.status(400).send("logradouro está undefined!");
    } else {
        empresaModel.confirmarLogradouro(logradouro, id)
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


function confirmarNumero(req, res) {
    var numero = req.body.numero;
    var id = req.body.id;
    if (numero == undefined) {
        res.status(400).send("numero está undefined!");
    } else {
        empresaModel.confirmarNumero(numero, id)
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


function confirmarBairro(req, res) {
    var bairro = req.body.bairro;
    var id = req.body.id;
    if (bairro == undefined) {
        res.status(400).send("bairro está undefined!");
    } else {
        empresaModel.confirmarBairro(bairro, id)
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


function confirmarComplemento(req, res) {
    var complemento = req.body.complemento;
    var id = req.body.id;
    if (complemento == undefined) {
        res.status(400).send("complemento está undefined!");
    } else {
        empresaModel.confirmarComplemento(complemento, id)
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


function confirmarCidade(req, res) {
    var cidade = req.body.cidade;
    var id = req.body.id;
    if (cidade == undefined) {
        res.status(400).send("cidade está undefined!");
    } else {
        empresaModel.confirmarCidade(cidade, id)
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


function confirmarEstado(req, res) {
    var estado = req.body.estado;
    var id = req.body.id;
    if (estado == undefined) {
        res.status(400).send("estado está undefined!");
    } else {
        empresaModel.confirmarEstado(estado, id)
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


function confirmarCep(req, res) {
    var cep = req.body.cep;
    var id = req.body.id;
    if (cep == undefined) {
        res.status(400).send("cep está undefined!");
    } else {
        empresaModel.confirmarCep(cep, id)
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

function deletarEmpresa(req, res) {
    var id = req.body.id;
    if (id == undefined) {
        res.status(400).send("Seu id está undefined!");
    } else {
        empresaModel.deletarEmpresa(id)
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
    }
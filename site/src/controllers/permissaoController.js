var permissaoModel = require("../models/permissaoModel");

function listar(req, res) {
    var empresa = req.params.empresa;

    permissaoModel.listar(empresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os permissao: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function verificarPermissao(req, res) {
    var id = req.params.id;

    permissaoModel.verificarPermissao(id).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os permissao: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function buscarEmail(req, res) {
    var email = req.params.email;

    permissaoModel.buscarEmail(email).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os permissao: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function tirar(req, res) {
    var email = req.body.email;
    var empresa = req.body.empresa;

    permissaoModel.tirar(email, empresa)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );

}

function concederPermissao(req, res) {
    var email = req.body.email;
    var empresa = req.body.empresa;

    permissaoModel.concederPermissao(email, empresa)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );

}

function concederPermissaoRegistro(req, res) {
    var email = req.body.email;
    var empresa = req.body.empresa;

    permissaoModel.concederPermissaoRegistro(email, empresa)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );

}

function concederAcesso(req, res) {
    var email = req.body.email;
    var empresa = req.body.empresa;

    permissaoModel.concederAcesso(email, empresa)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );

}

function remover(req, res) {
    var email = req.body.email;

    permissaoModel.remover(email)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );

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
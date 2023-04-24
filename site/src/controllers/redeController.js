var redeModel = require("../models/redeModel");

function buscarMetricasRede(req, res) {
    var idEmpresa = req.params.idEmpresa;

    redeModel.buscarMetricasRede(idEmpresa)
        .then(
            function (resultado) {
                res.json(resultado[0]);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function confirmarMetricasRede(req, res) {
    var inputEnviados = req.body.inputEnviados;
    var inputRecebidos = req.body.inputRecebidos;
    var id = req.body.idEmpresa;

    if (inputEnviados == undefined) {
        res.status(400).send("inputEnviados está undefined!");
    } else if (inputRecebidos == undefined) {
        res.status(400).send("inputRecebidos está undefined!");
    } else {
        redeModel.confirmarMetricasRede(inputEnviados, inputRecebidos, id)
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

function inserirPrimeiraMetricasRede(req, res) {
    var id = req.params.idEmpresa;

        redeModel.inserirPrimeiraMetricasRede(id)
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


module.exports = {
    buscarMetricasRede,
    confirmarMetricasRede,
    inserirPrimeiraMetricasRede
    }
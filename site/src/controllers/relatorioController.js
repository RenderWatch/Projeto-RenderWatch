var relatorioModel = require("../models/relatorioModel");

function buscarDadosAlertas(req, res) {
    var idEmpresa = req.params.idEmpresa;

    relatorioModel.buscarDadosAlertas(idEmpresa)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function buscarQuantidadeAlertas(req, res) {
    var idEmpresa = req.params.idEmpresa;

    relatorioModel.buscarQuantidadeAlertas(idEmpresa)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function buscarClusterComMaisAlertas(req, res) {
    var idEmpresa = req.params.idEmpresa;

    relatorioModel.buscarClusterComMaisAlertas(idEmpresa)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function buscarComponenteEmMaisAlertas(req, res) {
    var idEmpresa = req.params.idEmpresa;

    relatorioModel.buscarComponenteEmMaisAlertas(idEmpresa)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function buscarUsoCpuPorCluster(req, res) {
    var idEmpresa = req.params.idEmpresa;

    relatorioModel.buscarUsoCpuPorCluster(idEmpresa)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function buscarUsoMemoriaPorCluster(req, res) {
    var idEmpresa = req.params.idEmpresa;

    relatorioModel.buscarUsoMemoriaPorCluster(idEmpresa)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function buscarDiscoLivrePorCluster(req, res) {
    var idEmpresa = req.params.idEmpresa;

    relatorioModel.buscarDiscoLivrePorCluster(idEmpresa)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    buscarDadosAlertas,
    buscarQuantidadeAlertas,
    buscarClusterComMaisAlertas,
    buscarComponenteEmMaisAlertas,
    buscarUsoCpuPorCluster,
    buscarUsoMemoriaPorCluster,
    buscarDiscoLivrePorCluster
    }
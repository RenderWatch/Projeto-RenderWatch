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

function buscarDadosPorMaquina(req, res) {
    var idEmpresa = req.params.idEmpresa;

    relatorioModel.buscarDadosPorMaquina(idEmpresa)
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

function buscarQtdMaquinas(req, res) {
    var idEmpresa = req.params.idEmpresa;

    relatorioModel.buscarQtdMaquinas(idEmpresa)
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

function buscarQtdClusters(req, res) {
    var idEmpresa = req.params.idEmpresa;

    relatorioModel.buscarQtdClusters(idEmpresa)
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

function buscarmediaAlertasPorCluster(req, res) {
    var idEmpresa = req.params.idEmpresa;

    relatorioModel.buscarmediaAlertasPorCluster(idEmpresa)
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

function buscarDadosRede(req, res) {
    var idEmpresa = req.params.idEmpresa;

    relatorioModel.buscarDadosRede(idEmpresa)
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

function buscarDadosClusterMaquinas(req, res) {
    var idEmpresa = req.params.idEmpresa;

    relatorioModel.buscarDadosClusterMaquinas(idEmpresa)
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
    buscarDadosPorMaquina,
    buscarQtdMaquinas,
    buscarQtdClusters,
    buscarmediaAlertasPorCluster,
    buscarDadosRede,
    buscarDadosClusterMaquinas
    }
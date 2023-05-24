var express = require("express");
var router = express.Router();

var relatorioController = require("../controllers/relatorioController");

router.get("/buscarDadosAlertas/:idEmpresa", function (req, res) {
    relatorioController.buscarDadosAlertas(req, res);
});

router.get("/buscarQuantidadeAlertas/:idEmpresa", function (req, res) {
    relatorioController.buscarQuantidadeAlertas(req, res);
});

router.get("/buscarClusterComMaisAlertas/:idEmpresa", function (req, res) {
    relatorioController.buscarClusterComMaisAlertas(req, res);
});

router.get("/buscarComponenteEmMaisAlertas/:idEmpresa", function (req, res) {
    relatorioController.buscarComponenteEmMaisAlertas(req, res);
});

router.get("/buscarDadosPorMaquina/:idEmpresa", function (req, res) {
    relatorioController.buscarDadosPorMaquina(req, res);
});

router.get("/buscarQtdClusters/:idEmpresa", function (req, res) {
    relatorioController.buscarQtdClusters(req, res);
});

router.get("/buscarQtdMaquinas/:idEmpresa", function (req, res) {
    relatorioController.buscarQtdMaquinas(req, res);
});

router.get("/buscarmediaAlertasPorCluster/:idEmpresa", function (req, res) {
    relatorioController.buscarmediaAlertasPorCluster(req, res);
});

router.get("/buscarDadosRede/:idEmpresa", function (req, res) {
    relatorioController.buscarDadosRede(req, res);
});

module.exports = router;
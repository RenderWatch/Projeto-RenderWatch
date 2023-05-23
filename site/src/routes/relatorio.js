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

router.get("/buscarUsoCpuPorCluster/:idEmpresa", function (req, res) {
    relatorioController.buscarUsoCpuPorCluster(req, res);
});

router.get("/buscarUsoMemoriaPorCluster/:idEmpresa", function (req, res) {
    relatorioController.buscarUsoMemoriaPorCluster(req, res);
});

router.get("/buscarDiscoLivrePorCluster/:idEmpresa", function (req, res) {
    relatorioController.buscarDiscoLivrePorCluster(req, res);
});

module.exports = router;
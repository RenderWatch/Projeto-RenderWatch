var express = require("express");
var router = express.Router();

var kpiProcessoController = require("../controllers/kpiProcessoController");

router.get("/listarAlertaCluster/:idCluster", function (req, res) {
    kpiProcessoController.listarAlertaCluster(req, res);
});

router.get("/listarAlertaMaquina/:idMaquina", function (req, res) {
    kpiProcessoController.listarAlertaMaquina(req, res);
});

router.get("/listarAlertaComponenteMaquina/:idMaquina", function (req, res) {
    kpiProcessoController.listarAlertaComponenteMaquina(req, res);
}); 

router.get("/listarMaquinaMaiorAlertas/:idCluster", function (req, res) {
    kpiProcessoController.listarMaquinaMaiorAlertas(req, res);
});

router.get("/listarProcessos/:idMaquina", function (req, res) {
    kpiProcessoController.listarProcessos(req, res);
});

module.exports = router;

var express = require("express");
var router = express.Router();

var alertasController = require("../controllers/alertasController");

router.get("/qtdAlertasPendentes/:statusAtual", function (req, res) {
    alertasController.qtdAlertasPendentes(req, res);
});

router.get("/getIdClusterMaquina/:idMaquina", function (req, res) {
    alertasController.getIdClusterMaquina(req, res);
});




module.exports = router;
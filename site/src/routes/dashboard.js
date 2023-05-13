var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/ultimas/:idMaquina", function (req, res) {
    dashboardController.buscarUltimasMedidas(req, res);
});

router.get("/tempo-real/:idMaquina", function (req, res) {
    dashboardController.buscarMedidasEmTempoReal(req, res);
})

router.get("/listarRede/:idMaquina", function (req, res) {
    dashboardController.listarRede(req, res);
});


module.exports = router;
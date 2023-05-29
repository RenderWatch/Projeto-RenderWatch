var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/", function (req, res) {
    dashboardController.testar(req, res);
});

router.get("/listar/:idMaquina", function (req, res) {
    dashboardController.listar(req, res);
});

router.get("/listarRam/:idMaquina", function (req, res) {
    dashboardController.listarRam(req, res);
});

router.get("/listarDisco/:idMaquina", function (req, res) {
    dashboardController.listarDisco(req, res);
});

module.exports = router;
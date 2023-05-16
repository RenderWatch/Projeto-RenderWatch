var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/", function (req, res) {
    dashboardController.testar(req, res);
});

router.get("/listar/:idMaquina", function (req, res) {
    dashboardController.listar(req, res);
});

router.get("/tempo-real/:idMaquina", function (req, res) {
    dashboardController.listarTempoReal(req, res);
})


module.exports = router;
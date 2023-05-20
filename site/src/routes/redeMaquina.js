var express = require("express");
var router = express.Router();

var redeMaquinaController = require("../controllers/redeMaquinaController");

router.get("/listarRede", function (req, res) {
    redeMaquinaController.listarRede(req, res);
});

router.get("/listarMaquina", function (req, res) {
    redeMaquinaController.listarMaquina(req, res);
});


module.exports = router;
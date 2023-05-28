var express = require("express");
var router = express.Router();

var redeMaquinaController = require("../controllers/redeMaquinaController");

router.get("/listarRede/:idMaquina", function (req, res) {
    redeMaquinaController.listarRede(req, res);
});

router.get("/listarMaquina/:idCluster", function (req, res) {
    redeMaquinaController.listarMaquina(req, res);
});

router.get("/listarCluster/:razaoSocial", function (req, res) {
    redeMaquinaController.listarCluster(req, res);
});

// router.get("/listarProcessos/:idMaquina", function (req, res) {
//     redeMaquinaController.listarProcessos(req, res);
// });


module.exports = router;
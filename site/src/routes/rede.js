var express = require("express");
var router = express.Router();

var redeController = require("../controllers/redeController");

router.get("/buscarMetricasRede/:idEmpresa", function (req, res) {
    redeController.buscarMetricasRede(req, res);
});

router.put("/confirmarMetricasRede", function (req, res) {
    redeController.confirmarMetricasRede(req, res);
})

router.put("/inserirPrimeiraMetricasRede/:idEmpresa", function (req, res) {
    redeController.inserirPrimeiraMetricasRede(req, res);
})

module.exports = router;
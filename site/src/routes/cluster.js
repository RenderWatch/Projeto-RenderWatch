var express = require("express");
var router = express.Router();

var clusterController = require("../controllers/clusterController");

router.get("/buscarDadosCluster/:idEmpresa", function (req, res) {
    clusterController.buscarDadosCluster(req, res);
});

router.get("/buscarDadosMaquina/:idCluster", function (req, res) {
    clusterController.buscarDadosMaquina(req, res);
});

router.post("/adicionarCluster", function (req, res) {
    clusterController.adicionarCluster(req, res);
});

router.post("/adicionarMaquina", function (req, res) {
    clusterController.adicionarMaquina(req, res);
});

router.put("/confirmarNomeCluster/:idCluster", function (req, res) {
    clusterController.confirmarNomeCluster(req, res);
})

module.exports = router;
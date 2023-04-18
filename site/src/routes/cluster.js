var express = require("express");
var router = express.Router();

var clusterController = require("../controllers/clusterController");

router.get("/buscarDadosCluster/:idEmpresa", function (req, res) {
    clusterController.buscarDadosCluster(req, res);
});

router.get("/deletarCluster/:clusterId", function (req, res) {
    clusterController.deletarCluster(req, res);
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

router.put("/confirmarAlteracaoInfoMaquina/:idMaquina", function (req, res) {
    clusterController.confirmarAlteracaoInfoMaquina(req, res);
})

router.put("/confirmarNomeCluster/:idCluster", function (req, res) {
    clusterController.confirmarNomeCluster(req, res);
})

router.delete("/deletarClusterComMaquina/:idCluster", function (req, res) {
    clusterController.deletarClusterComMaquina(req, res);
})

router.delete("/deletarMaquinaDoCluster/:idCluster", function (req, res) {
    clusterController.deletarMaquinaDoCluster(req, res);
})

router.delete("/deletarClusterSemMaquina/:idCluster", function (req, res) {
    clusterController.deletarClusterSemMaquina(req, res);
})

router.delete("/deletarMaquina/:idMaquina", function (req, res) {
    clusterController.deletarMaquina(req, res);
})

module.exports = router;
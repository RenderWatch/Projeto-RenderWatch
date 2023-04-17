var express = require("express");
var router = express.Router();

var clusterController = require("../controllers/clusterController");

router.get("/buscarDadosCluster/:idEmpresa", function (req, res) {
    clusterController.buscarDadosCluster(req, res);
});

module.exports = router;
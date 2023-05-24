var express = require("express");
var router = express.Router();

var alertasController = require("../controllers/alertasController");

router.get("/buscarQtdAlertas", function (req, res) {
    alertasController.buscarQtdAlertas(req, res);
});




module.exports = router;
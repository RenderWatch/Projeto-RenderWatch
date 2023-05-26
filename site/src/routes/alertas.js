var express = require("express");
var router = express.Router();

var alertasController = require("../controllers/alertasController");

router.get("/buscarQtdAlertas", function ( res) {
    alertasController.buscarQtdAlertas( res);
});




module.exports = router;
var express = require("express");
var router = express.Router();

var testeController = require("../controllers/testeController");

router.get("/getHistoricoAlerta/:status", function (req, res) {
    testeController.getHistoricoAlerta(req, res);
});




module.exports = router;
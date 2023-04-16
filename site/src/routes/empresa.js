var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/empresaController");

router.get("/mostrarDadosEmpresa/:idUser", function (req, res) {
    empresaController.mostrarDadosEmpresa(req, res);
});

router.post("/cadastrarEmpresa", function (req, res) {
    empresaController.cadastrarEmpresa(req, res);
});

router.put("/atualizarEmpresaUsuario/:idUser", function (req, res) {
    empresaController.atualizarEmpresaUsuario(req, res);
})

module.exports = router;
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
});

router.put("/confirmarRazaoSocial/:idEmpresa", function (req, res) {
    empresaController.confirmarRazaoSocial(req, res);
})

router.put("/confirmarCnpj/:idEmpresa", function (req, res) {
    empresaController.confirmarCnpj(req, res);
})

router.put("/confirmarTelefone/:idEmpresa", function (req, res) {
    empresaController.confirmarTelefone(req, res);
})

router.put("/confirmarLogradouro/:idEmpresa", function (req, res) {
    empresaController.confirmarLogradouro(req, res);
})

router.put("/confirmarNumero/:idEmpresa", function (req, res) {
    empresaController.confirmarNumero(req, res);
})

router.put("/confirmarBairro/:idEmpresa", function (req, res) {
    empresaController.confirmarBairro(req, res);
})

router.put("/confirmarComplemento/:idEmpresa", function (req, res) {
    empresaController.confirmarComplemento(req, res);
})

router.put("/confirmarCidade/:idEmpresa", function (req, res) {
    empresaController.confirmarCidade(req, res);
})

router.put("/confirmarEstado/:idEmpresa", function (req, res) {
    empresaController.confirmarEstado(req, res);
})

router.put("/confirmarCep/:idEmpresa", function (req, res) {
    empresaController.confirmarCep(req, res);
})

router.delete("/deletarEmpresa/:id", function (req, res) {
    empresaController.deletarEmpresa(req, res);
})

module.exports = router;
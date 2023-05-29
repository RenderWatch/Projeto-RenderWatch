var express = require("express");
var router = express.Router();

var permissaoController = require("../controllers/permissaoController");

router.get("/", function (req, res) {
    permissaoController.testar(req, res);
});

router.put("/tirar", function (req, res) {
    permissaoController.tirar(req, res);
});

router.put("/concederPermissao", function (req, res) {
    permissaoController.concederPermissao(req, res);
});

router.put("/concederPermissaoRegistro", function (req, res) {
    permissaoController.concederPermissaoRegistro(req, res);
});

router.put("/concederAcesso", function (req, res) {
    permissaoController.concederAcesso(req, res);
});

router.put("/remover", function (req, res) {
    permissaoController.remover(req, res);
});

router.get("/listar/:empresa", function (req, res) {

    permissaoController.listar(req, res);
});

router.get("/buscarEmail/:email", function (req, res) {
    permissaoController.buscarEmail(req, res);
});

module.exports = router;
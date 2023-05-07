var express = require("express");
var router = express.Router();

var permissaoController = require("../controllers/permissaoController");

router.get("/", function (req, res) {
    permissaoController.testar(req, res);
});

router.put("/editar/:idPermissao", function (req, res) {
    permissaoController.editar(req, res);
});

router.delete("/deletar/:idPermissao", function (req, res) {
    permissaoController.deletar(req, res);
});

router.get("/listar", function (req, res) {
    permissaoController.listar(req, res);
});

module.exports = router;
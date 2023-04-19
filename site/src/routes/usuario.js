var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.get("/buscarDadosUsuario", function (req, res) {
    usuarioController.buscarDadosUsuario(req, res);
});

router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/login", function (req, res) {
    usuarioController.entrar(req, res);
});

router.put("/confirmarNome/:nome", function (req, res) {
    usuarioController.confirmarNome(req, res);
})

router.put("/confirmarSobrenome/:sobrenome", function (req, res) {
    usuarioController.confirmarSobrenome(req, res);
})

router.put("/confirmarTelefone/:telefone", function (req, res) {
    usuarioController.confirmarTelefone(req, res);
})

router.put("/confirmarSenha/:senha", function (req, res) {
    usuarioController.confirmarSenha(req, res);
})

router.delete("/deletarConta/:id", function (req, res) {
    usuarioController.deletarConta(req, res);
})

router.post("/adicionarPermissao/:id,email,permissao", function (req, res) {
    usuarioController.adicionarPermissao(req, res);
})

router.delete("/excluirPermissao/:email", function (req, res) {
    usuarioController.excluirPermissao(req, res);
})

router.get("/listarHistorico/:idUsuario", function (req, res) {
    usuarioController.listarHistorico(req, res);
});

module.exports = router;
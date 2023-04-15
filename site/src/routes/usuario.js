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


module.exports = router;
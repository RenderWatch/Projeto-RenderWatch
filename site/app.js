// process.env.AMBIENTE_PROCESSO = "desenvolvimento";
process.env.AMBIENTE_PROCESSO = "producao";

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA = process.env.AMBIENTE_PROCESSO == "desenvolvimento" ? 3333 : 8080;

var app = express();

var usuarioRouter = require("./src/routes/usuario");
var empresaRouter = require("./src/routes/empresa");
var clusterRouter = require("./src/routes/cluster");
var redeMaquinaRouter = require("./src/routes/redeMaquina");
var permissaoRouter = require("./src/routes/permissao");
var dashboardRouter = require("./src/routes/dashboard");
var kpiProcessoRouter = require("./src/routes/kpiProcesso");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/usuario", usuarioRouter);
app.use("/empresa", empresaRouter);
app.use("/cluster", clusterRouter);
app.use("/redeMaquina", redeMaquinaRouter);
app.use("/permissao", permissaoRouter);
app.use("/dashboard", dashboardRouter);
app.use("/kpiProcesso", kpiProcessoRouter);

app.listen(PORTA, function () {
    console.log(`Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar: http://localhost:${PORTA} \n
    Você está rodando sua aplicação em Ambiente de ${process.env.AMBIENTE_PROCESSO} \n
    \t\tSe "desenvolvimento", você está se conectando ao banco LOCAL (MySQL Workbench). \n
    \t\tSe "producao", você está se conectando ao banco REMOTO (SQL Server em nuvem Azure) \n
    \t\t\t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'`);
});


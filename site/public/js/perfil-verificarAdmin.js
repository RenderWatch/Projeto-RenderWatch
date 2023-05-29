function verificarPermissao() {
    let id = sessionStorage.ID_USUARIO;
    fetch(`/permissao/verificarPermissao/${id}`)
        .then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (resposta) {
                    console.log("Nível de acesso: ", JSON.stringify(resposta));

                    if (resposta[0].adm == 1) {
                        console.log("POSSUI ACESSO DE ADMINISTRADOR");
                    } else {
                        console.log("NÃO POSSUI ACESSO DE ADMINISTRADOR");
                        var btnEmpresa = document.getElementById('btnEmpresa');
                        btnEmpresa.classList.add('btn-nao-admin');
                        btnEmpresa.removeAttribute('href');
                        btnEmpresa.style.pointerEvents = "none";
                        var btnPermissoes = document.getElementById('btnPermissoes');
                        btnPermissoes.classList.add('btn-nao-admin');
                        btnPermissoes.removeAttribute('href');
                        btnPermissoes.style.pointerEvents = "none";
                        var btnClusters = document.getElementById('btnClusters');
                        btnClusters.classList.add('btn-nao-admin');
                        btnClusters.removeAttribute('href');
                        btnClusters.style.pointerEvents = "none";

                    }
                });
            } else {
                throw 'Houve um erro na API!';
            }
        })
        .catch(function (resposta) {
            console.error(resposta);
        });
}

verificarPermissao();
 
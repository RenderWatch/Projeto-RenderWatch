var empresa = sessionStorage.ID_EMPRESA

function listar() {
    fetch(`/permissao/listar/${empresa}`)
        .then(function (resposta) {
            if (resposta.ok) {
                if (resposta.status == 204) {
                    var tbody = document.querySelector("#permissao-table tbody");
                    var mensagem = document.createElement("span");
                    mensagem.innerHTML = "Nenhum resultado encontrado.";
                    tbody.appendChild(mensagem);
                    throw "Nenhum resultado encontrado!!";
                }

                resposta.json().then(function (resposta) {
                    console.log("Dados recebidos: ", JSON.stringify(resposta));

                    var tbody = document.querySelector("#permissao-table tbody");
                    tbody.innerHTML = "";

                    for (let i = 0; i < resposta.length; i++) {

                        var status = resposta[i].adm
                        if (status == 1) {
                            status = "Administrador"
                        } else {
                            status = "Usuário"
                        }

                        const tr = document.createElement('tr');
                        tr.innerHTML = `
                            <td>${resposta[i].email}</td>
                            <td>${status}</td>
                            <td>
                                <button class="btn-user" onclick="retirarPermissao('${resposta[i].email}')">Usuário</button>
                                <button class="btn-admin" onclick="concederPermissao('${resposta[i].email}')">Admin</button>
                                <button class="btn-excluir" onclick="remover('${resposta[i].email}')">Remover</button>
                            </td>
                        `;

                        tbody.appendChild(tr);
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

listar();

function concederPermissao(email) {
    fetch(`/permissao/concederPermissao`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            empresa,
          })
    })
        .then(function (resposta) {
            if (resposta.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Parabéns',
                    text: 'Permissão atualizada com sucesso!',
                })

                setTimeout(listar(), 2000);

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Ops...',
                    text: 'Não foi possível atualizar a permissão! Verifique se o email é válido.',
                })
                throw (
                    "Houve um erro ao tentar realizar a atualização da permissão! Código da resposta: " + resposta.status
                );
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function concederPermissaoRegistro() {
    var email = inputEmail.value
    if (email.length > 2) {
        fetch(`/permissao/concederPermissaoRegistro`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                empresa: empresa
            })
        })
            .then(function (resposta) {
                if (resposta.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Parabéns',
                        text: 'Permissão atualizada com sucesso!',
                    })
                    setTimeout(listar(), 2000);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Ops...',
                        text: 'Não foi possível atualizar a permissão! Verifique se o email é válido.',
                    })
                    throw (
                        "Houve um erro ao tentar realizar a atualização da permissão! Código da resposta: " + resposta.status
                    );
                }
                setTimeout(listar(), 2000);
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Ops...',
            text: 'Email inválido',
        })
    }
}

function retirarPermissao(email) {
    if (sessionStorage.EMAIL_USUARIO == email) {
        Swal.fire({
            icon: 'error',
            title: 'Ops...',
            text: 'Não é possível retirar a sua permissão!',
        })
    } else {
        fetch(`/permissao/tirar`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                empresa: empresa
            })
        })
            .then(function (resposta) {
                if (resposta.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Parabéns',
                        text: 'Permissão atualizada com sucesso!',
                    })
                    setTimeout(listar(), 2000);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Ops...',
                        text: 'Não foi possível atualizar a permissão!',
                    })
                    throw (
                        "Houve um erro ao tentar realizar a atualização da permissão! Código da resposta: " + resposta.status
                    );
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });
    }
}

function concederAcessoRegistro() {
    var email = inputEmail.value
    if (email.length > 2) {
        fetch(`/permissao/concederAcesso`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                empresa: empresa
            })
        })
            .then(function (resposta) {
                if (resposta.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Parabéns',
                        text: 'Permissão atualizada com sucesso!',
                    })
                    setTimeout(listar(), 2000);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Ops...',
                        text: 'Não foi possível atualizar a permissão!',
                    })
                    throw (
                        "Houve um erro ao tentar realizar a atualização da permissão! Código da resposta: " + resposta.status
                    );
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Ops...',
            text: 'Email inválido',
        })
    }

}

function remover(email) {
    if (sessionStorage.EMAIL_USUARIO == email) {
        Swal.fire({
            icon: 'error',
            title: 'Ops...',
            text: 'Não é possível retirar a sua permissão!',
        })
    } else {
    fetch(`/permissao/remover`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email
        })
    })
        .then(function (resposta) {
            if (resposta.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Parabéns',
                    text: 'Permissão atualizada com sucesso!',
                })
                setTimeout(listar(), 2000);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Ops...',
                    text: 'Não foi possível atualizar a permissão!',
                })
                throw (
                    "Houve um erro ao tentar realizar a atualização da permissão! Código da resposta: " + resposta.status
                );
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
    }

}

function buscarEmailPermissaoRegistro() {
    var email = inputEmail.value
    fetch(`/permissao/buscarEmail/${email}`)
        .then(function (resposta) {
            if (resposta.ok) {

                console.log("STATUS: " + resposta.status)
                
                resposta.json().then(function (resposta) {
                    console.log("Dados recebidos: ", JSON.stringify(resposta));

                    if(resposta.status == 204){
                        Swal.fire({
                            icon: 'error',
                            title: 'Ops...',
                            text: 'Email não encontrado no sistema!',
                        })
                    }

                    if (resposta[0].empresa_id != null || resposta[0].empresa_id != ""){
                        Swal.fire({
                            icon: 'error',
                            title: 'Ops...',
                            text: 'Email já cadastrado em outra empresa!',
                        })
                    } else {
                        concederPermissaoRegistro();
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

function buscarEmailAcessoRegistro() {
    var email = inputEmail.value
    fetch(`/permissao/buscarEmail/${email}`)
        .then(function (resposta) {
            if (resposta.ok) {

                console.log("STATUS: " + resposta.status)
                
                resposta.json().then(function (resposta) {
                    console.log("Dados recebidos: ", JSON.stringify(resposta));

                    if(resposta.status == 204){
                        Swal.fire({
                            icon: 'error',
                            title: 'Ops...',
                            text: 'Email não encontrado no sistema!',
                        })
                    }

                    if (resposta[0].empresa_id != null || resposta[0].empresa_id != ""){
                        Swal.fire({
                            icon: 'error',
                            title: 'Ops...',
                            text: 'Email já cadastrado em outra empresa!',
                        })
                    } else {
                        concederAcessoRegistro();
                    }

                });
            } else {
                throw 'Houve um erro na API!';
            }
        })
        .catch(function (resposta) {
            console.error(resposta);
        });
};
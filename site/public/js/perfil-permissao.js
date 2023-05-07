b_usuario.innerHTML = sessionStorage.NOME_USUARIO;

function limparFormulario() {
    document.getElementById("form_postagem").reset();
}
var idUsuario = sessionStorage.ID_USUARIO;

function editar(idPermissao) {
    sessionStorage.ID_USUARIO = idPermissao;
    console.log("cliquei em editar - " + idPermissao);
    window.alert("Você será redirecionado à página de edição do aviso de id número: " + idPermissao);
    window.location = "/public/permissao.html"

}

function deletar(idPermissao) {
    console.log("Criar função de apagar post escolhido - ID" + idPermissao);
    fetch(`/permissao/deletar/${idPermissao}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {

        if (resposta.ok) {
            window.alert("Post deletado com sucesso pelo usuario de email: " + sessionStorage.getItem("EMAIL_USUARIO") + "!");
            window.location = "/public/permissao.html"
        } else if (resposta.status == 404) {
            window.alert("Deu 404!");
        } else {
            throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}

function atualizarFeed() {
    //aguardar();
    fetch("/permissao/listar").then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                var feed = document.getElementById("feed_container");
                var mensagem = document.createElement("span");
                mensagem.innerHTML = "Nenhum resultado encontrado."
                feed.appendChild(mensagem);
                throw "Nenhum resultado encontrado!!";
            }

            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));

                var feed = document.getElementById("feed_container");
                feed.innerHTML = "";
                for (let i = 0; i < resposta.length; i++) {
                    var publicacao = resposta[i];
                    const permissoesConcedidas = [
                        { email: 'usuario1@example.com', permissao: true },
                        { email: 'usuario2@example.com', permissao: false },
                        { email: 'usuario3@example.com', permissao: true }
                    ];
                    
                    // seletor de elementos HTML
                    const emailInput = document.querySelector('#email');
                    const permissaoInput = document.querySelector('#permissao');
                    const permissaoTable = document.querySelector('#permissao-table');
                    
                    // função para adicionar uma permissão concedida à tabela
                    function adicionarPermissao(email, permissao) {
                        const tr = document.createElement('tr');
                        tr.innerHTML = `
                          <td>${email}</td>
                          <td>
                            <label>
                              <input type="checkbox" ${permissao ? 'checked' : ''} disabled>
                            </label>
                          </td>
                          <td>
                            <button class="editar-button">Editar</button>
                            <button class="salvar-button" style="display: none;">Salvar</button>
                            <button class="excluir-button">Excluir</button>
                          </td>
                        `;
                        permissaoTable.querySelector('tbody').appendChild(tr);
                        const editarButton = tr.querySelector('.editar-button');
                        editarButton.addEventListener('click', () => {
                            const checkbox = tr.querySelector('input[type="checkbox"]');
                            checkbox.disabled = false;
                            checkbox.focus();
                            editarButton.style.display = 'none';
                            tr.querySelector('.excluir-button').style.display = 'none';
                            tr.querySelector('.salvar-button').style.display = '';
                        });
                        const salvarButton = tr.querySelector('.salvar-button');
                        salvarButton.addEventListener('click', () => {
                            const checkbox = tr.querySelector('input[type="checkbox"]');
                            const email = tr.querySelector('td:first-child').textContent;
                            const permissao = checkbox.checked;
                            const index = permissoesConcedidas.findIndex(p => p.email === email);
                            if (index !== -1) {
                                permissoesConcedidas[index].permissao = permissao;
                            }
                            checkbox.disabled = true;
                            salvarButton.style.display = 'none';
                            tr.querySelector('.editar-button').style.display = '';
                            tr.querySelector('.excluir-button').style.display = '';
                        });
                        const excluirButton = tr.querySelector('.excluir-button');
                        excluirButton.addEventListener('click', () => {
                            excluirPermissao(tr, email);
                        });
                    }
                    
                    // função para excluir uma permissão concedida
                    function excluirPermissao(tr, email) {
                        if (confirm('Tem certeza que deseja excluir esta permissão?')) {
                            tr.remove();
                            removePermissao();
                            const index = permissoesConcedidas.findIndex(p => p.email === email);
                            if (index !== -1) {
                                permissoesConcedidas.splice(index, 1);
                            }
                        }
                    }
                    
                    // adicionar as permissões concedidas existentes à tabela
                    for (const permissao of permissoesConcedidas) {
                        adicionarPermissao(permissao.email, permissao.permissao);
                    }
                    
                    // manipular o envio do formulário para conceder permissão
                    const concederPermissaoForm = document.querySelector('#conceder-permissao-form');
                    concederPermissaoForm.addEventListener('submit', event => {
                        event.preventDefault();
                        const email = emailInput.value;
                        const permissao = permissaoInput.checked;
                        adicionarPermissao(email, permissao);
                        emailInput.value = '';
                        permissaoInput.checked = false;
                    });


                }

                finalizarAguardar();
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
        finalizarAguardar();
    });
}
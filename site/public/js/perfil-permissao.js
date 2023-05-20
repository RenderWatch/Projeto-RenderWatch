var razaoSocial =sessionStorage.RAZAO_SOCIAL;
function listar() {
    fetch(`/permissao/listar/${razaoSocial}`)
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
                        var publicacao = resposta[i];

                        const tr = document.createElement('tr');
                        tr.innerHTML = `
                            <td>${resposta[i].email}</td>
                            <td>
                                <label>
                                    <input type="checkbox" ${resposta[i].adm !== 0 ? 'checked' : ''} disabled>
                                </label>
                            </td>
                            <td>
                                <button class="editar-button">Conceder</button>
                                <button class="salvar-button-tirar" style="display: none;">Salvar</button>
                                <button class="excluir-button">Retirar</button>
                                <button class="salvar-button-conceder" style="display: none;">Salvar</button>
                            </td>
                        `;

                        // Adicione a linha à tabela
                        tbody.appendChild(tr);

                        const editarButton = tr.querySelector('.editar-button');
                        const excluirButton = tr.querySelector('.excluir-button');
                        const salvarButtonTirar = tr.querySelector('.salvar-button-tirar');
                        const salvarButtonConceder = tr.querySelector('.salvar-button-conceder');

                        

                        editarButton.addEventListener('click', () => {
                            const checkbox = tr.querySelector('input[type="checkbox"]');
                            checkbox.disabled = false;
                            checkbox.focus();
                            editarButton.style.display = 'none';
                            excluirButton.style.display = 'none';
                            salvarButtonConceder.style.display = '';
                        });
                        
                        excluirButton.addEventListener('click', () => {
                            const checkbox = tr.querySelector('input[type="checkbox"]');
                            const email = tr.querySelector('td:first-child').textContent;

                        
                            checkbox.disabled = false;
                            checkbox.focus();
                            editarButton.style.display = 'none';
                            excluirButton.style.display = 'none';
                            salvarButtonTirar.style.display = '';
                        });
                        
                        salvarButtonConceder.addEventListener('click', () => {
                            const checkbox = tr.querySelector('input[type="checkbox"]');
                            const email = tr.querySelector('td:first-child').textContent;
                            const permissao = checkbox.checked ? 1 : 0;
                        
                            conceder(email, permissao);
                        
                            checkbox.disabled = true;
                            salvarButtonConceder.style.display = 'none';
                            editarButton.style.display = '';
                            excluirButton.style.display = '';
                        });
                        
                        salvarButtonTirar.addEventListener('click', () => {
                            const checkbox = tr.querySelector('input[type="checkbox"]');
                            const email = tr.querySelector('td:first-child').textContent;
                            const permissao = checkbox.checked ? 1 : 0;
                        
                            tirar(email);
                        
                            checkbox.disabled = true;
                            salvarButtonTirar.style.display = 'none';
                            editarButton.style.display = '';
                            excluirButton.style.display = '';
                        });
                        


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

function conceder(admEditar, emailEditar) {
    fetch(`/permissao/editar/${emailEditar}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            adm: admEditar
        })
    })
        .then(function (resposta) {
            if (resposta.ok) {
                window.alert('Permissão atualizada com sucesso!');
                //window.location = '/permissao.html';
            } else if (resposta.status == 404) {
                window.alert('Erro 404: Página não encontrada!');
            } else {
                throw (
                    "Houve um erro ao tentar realizar a atualização da permissão! Código da resposta: " + resposta.status
                );
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function tirar(emailEditar) {
    fetch(`/permissao/tirar/${emailEditar}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(function (resposta) {
            if (resposta.ok) {
                window.alert('Permissão atualizada com sucesso!');
                //window.location = '/permissao.html';
            } else if (resposta.status == 404) {
                window.alert('Erro 404: Página não encontrada!');
            } else {
                throw (
                    "Houve um erro ao tentar realizar a atualização da permissão! Código da resposta: " + resposta.status
                );
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}
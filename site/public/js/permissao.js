// dados simulados para testar o código
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

function removePermissao() {
    then((result) => {
      if (result.isConfirmed) {
        fetch(`/usuario/deletarConta/${sessionStorage.ID_USUARIO}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            id: sessionStorage.ID_USUARIO
          })
        }).then(function (resposta) {
  
          if (resposta.ok) {
            Swal.fire({
              icon: 'success',
              title: 'Parabéns',
              text: 'Conta excluída com sucesso!',
            })
  
          } else if (resposta.status == 404) {
            Swal.fire({
              icon: 'error',
              title: 'Ops...',
              text: 'Deu 404!',
            })
          } else {
            throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + resposta.status);
          }
        }).catch(function (resposta) {
          console.log(`#ERRO: ${resposta}`);
        })
  
        sessionStorage.clear();
        window.location.href = "/index.html";
      }
    })
  }

function atualizarPermissao() {
    var idUsuario = sessionStorage.ID_USUARIO;
    
    // const permissoesConcedidas = [
    //     { email: 'usuario1@example.com', permissao: true },
    //     { email: 'usuario2@example.com', permissao: false },
    //     { email: 'usuario3@example.com', permissao: true }
    // ];
    
    var emailVar = permissoesConcedidas.email.value;
    var permissaoVar = permissoesConcedidas.permissao.value;
    
    console.log("FORM login: ", emailVar);
    console.log("FORM permissao: ", permissaoVar);

    fetch(`/usuarios/listar/${idUsuario}`).then(function (resposta) {
        console.log("Atualiza a página")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));

                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.PERMISSAO_USUARIO = json.permissao;

                setTimeout(function () {
                    window.location = "./permissao.html";
                }, 1000); // apenas para exibir o loading

            });

        } else {

            console.log("Houve um erro ao tentar realizar o login!");

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Autenticação inválida!',
              })
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}

atualizarPermissao();

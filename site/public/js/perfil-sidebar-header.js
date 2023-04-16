
function acessarPerfil() {
    if(sessionStorage.EMAIL_USUARIO) {
        window.location.href = "perfil-configuracoes.html"
    } else {
        window.location.href = "login.html"
    }
}

function irPaginaConfiguracoes(){
    window.location.href = "perfil-configuracoes.html"
}


function logout() {


    Swal.fire({
        title: 'Você deseja sair?',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, desejo sair!'
      }).then((result) => {
        if (!result.isConfirmed) {

          logoutCancelado()
        }
        else {
            Swal.fire(
                'Logout',
                'Você deslogou com sucesso!',
                'success'
              )
                linkLogout()
        }
        
      })
    }

  
    //link para página do login, quando fazer o logout
    function linkLogout() {
        sessionStorage.clear()
      setTimeout(() => window.location.href = "index.html", 2000);
    }

    function logoutCancelado() {
        console.log("Você cancelou o logout!")
    }
  
var formLogin = document.getElementById("formLogin");
//Evento submit del formulario
formLogin.addEventListener("submit", function (e) {
  e.preventDefault();
  //Data a enviar
  let data = {
    username: this.username.value,
    password: this.password.value,
  };

  // console.log(data);
  //Enviamos al backend
  let loginPost = new AccessToken();
  loginPost
    .post(mainUrl+"api/users/login/", data);

});

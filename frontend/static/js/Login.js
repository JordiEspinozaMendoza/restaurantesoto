var formLogin = document.getElementById("formLogin");

formLogin.addEventListener("submit", function (e) {
  e.preventDefault();
  let data = {
    username: this.username.value,
    password: this.password.value,
  };

  // console.log(data);
  let loginPost = new AccessToken();
  loginPost
    .post("http://127.0.0.1:8000/api/users/login/", data)
    .then((data) => {
      window.location.href = mainUrl;
    })
    .catch((err) => console.log(err));

});

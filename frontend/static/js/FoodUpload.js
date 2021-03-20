if(localStorage.getItem("access") == null && localStorage.getItem("userInfo")==null){
  window.location.href = mainUrl; //Si el usuario no esta logueado lo regresamos
}
//Formulario
let form = document.getElementById("foodUpload");
//evento submit
form.addEventListener("submit", function (e) {
  let responseMessage = document.getElementById("responseMessage");
  responseMessage.innerHTML = `<span class = "message message-await">Subiendo comida...</span>`
  e.preventDefault();
  let access =  localStorage.getItem("access");
  //Data a enviar
  let data = {
    name: form.name.value,
    description: form.description.value,
    price: form.price.value,
    token: access
  };
  let http = new UploadFood();

  http
    .post(mainUrl+"api/foods/uploadFood/", data)
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
});
//Input con la imagen
var inputImage = document.getElementById("inputImage");
//Evento change
inputImage.addEventListener("change", function () {
  //Mensaje de espera
  let responseMessage = document.getElementById("responseMessage");
  responseMessage.innerHTML = `<span class = "message message-await">Subiendo imagen...</span>`
  let sendImage = new UploadImage();
  console.log(inputImage.files[0]);
  
  //Form data a enviar
  var formData = new FormData();
  formData.append("image", inputImage.files[0]);
  let access =  localStorage.getItem("access");
  //Enviamos al backend
  sendImage
    .post(mainUrl+"api/foods/uploadImage/", formData, access)
    .then((data) => {
      console.log(data);
      let responseMessage = document.getElementById("responseMessage");
      responseMessage.innerHTML = `<span class = "message message-200">${data.detail}</span>`
    })
    .catch((err) => {
      console.log(err);
      let responseMessage = document.getElementById("responseMessage");
      responseMessage.innerHTML = `<span class = "message message-400">${err.detail}</span>`
    });
});

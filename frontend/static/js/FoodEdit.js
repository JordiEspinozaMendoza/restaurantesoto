if(localStorage.getItem("access") == null && localStorage.getItem("userInfo")==null){
  window.location.href = mainUrl; //En caso de que el usuario no este logueado
}
//Obtenemos el id de la comida desde los parametros de la url 
let idFood = window.location.href.split("/")[4];

let formEdit = document.getElementById("foodUploadEdit");

//Evento submit del formulario
formEdit.addEventListener("submit", function (e) {
  //Mensaje de espera
  let responseMessage = document.getElementById("responseMessage");
  responseMessage.innerHTML = `<span class = "message message-await">Subiendo comida...</span>`
  e.preventDefault();
  //Tomamos el token (en caso de tenerlo)
  let access =  localStorage.getItem("access");
  // console.log(idFood);
  //JSON que sera enviado al back
  let data = {
    _id: idFood,
    name: formEdit.name.value,
    description: formEdit.description.value,
    price: formEdit.price.value,
    token: access
  };
  console.log(data);
  let http = new EditFood();

  http
    .put(mainUrl+"api/foods/updateFood/", data)
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
});

//Obtenemos la imagen a enviar
var inputImageUpdate = document.getElementById("inputImageUpdate");

//Evento change del input de comida
inputImageUpdate.addEventListener("change", function () {
  //Mensaje de espera
  let responseMessage = document.getElementById("responseMessage");
  responseMessage.innerHTML = `<span class = "message message-await">Subiendo imagen...</span>`

  let sendImage = new UpdateImage();
  //Tomamos el token
  let access =  localStorage.getItem("access");

  console.log(inputImageUpdate.files[0]);
  
  //Creamos un formdata que es enviado al back
  var formData = new FormData();
  formData.append("image", inputImageUpdate.files[0]);
  formData.append("_id", idFood);

  sendImage
    .put(mainUrl+"api/foods/updateImage/", formData, access)
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

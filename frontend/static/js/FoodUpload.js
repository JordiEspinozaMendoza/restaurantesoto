if(localStorage.getItem("access") == null && localStorage.getItem("userInfo")==null){
  window.location.href = mainUrl;
}

let form = document.getElementById("foodUpload");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let access =  localStorage.getItem("access");

  let data = {
    name: form.name.value,
    description: form.description.value,
    price: form.price.value,
    token: access
  };
  let http = new UploadFood();

  http
    .post(mainUrl+"api/foods/uploadFood/", data)
    .then((data) => window.location.href = mainUrl+"foodList/")
    .catch((err) => console.log(err));
});

var inputImage = document.getElementById("inputImage");
inputImage.addEventListener("change", function () {
  let responseMessage = document.getElementById("responseMessage");
  responseMessage.innerHTML = `<span class = "message message-await">Subiendo imagen...</span>`
  let sendImage = new UploadImage();
  console.log(inputImage.files[0]);

  var formData = new FormData();
  formData.append("image", inputImage.files[0]);
  let access =  localStorage.getItem("access");
  
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

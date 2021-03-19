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
    .post("http://127.0.0.1:8000/api/foods/uploadFood/", data)
    .then((data) => window.location.href = mainUrl+"foodList/")
    .catch((err) => console.log(err));
});

var inputImage = document.getElementById("inputImage");
inputImage.addEventListener("change", function () {
  let sendImage = new UploadImage();
  console.log(inputImage.files[0]);

  var formData = new FormData();
  formData.append("image", inputImage.files[0]);
  let access =  localStorage.getItem("access");
  
  sendImage
    .post("http://127.0.0.1:8000/api/foods/uploadImage/", formData, access)
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
});

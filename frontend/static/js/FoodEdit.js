if(localStorage.getItem("access") == null && localStorage.getItem("userInfo")==null){
  window.location.href = mainUrl;
}
let idFood = window.location.href.split("/")[4];

let formEdit = document.getElementById("foodUploadEdit");
formEdit.addEventListener("submit", function (e) {
  e.preventDefault();
  let access =  localStorage.getItem("access");
  // console.log(idFood);
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
    .put("http://127.0.0.1:8000/api/foods/updateFood/", data)
    .then((data) => window.location.href = mainUrl+"foodList/")
    .catch((err) => console.log(err));
});

var inputImageUpdate = document.getElementById("inputImageUpdate");
inputImageUpdate.addEventListener("change", function () {
  let sendImage = new UpdateImage();
  let access =  localStorage.getItem("access");

  console.log(inputImageUpdate.files[0]);

  var formData = new FormData();
  formData.append("image", inputImageUpdate.files[0]);
  formData.append("_id", idFood);

  sendImage
    .put("http://127.0.0.1:8000/api/foods/updateImage/", formData, access)
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
});

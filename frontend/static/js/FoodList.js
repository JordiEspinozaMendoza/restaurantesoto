if (
  localStorage.getItem("access") == null &&
  localStorage.getItem("userInfo") == null
) {
  window.location.href = mainUrl;
}

var FoodListReq = new XMLHttpRequest();
FoodListReq.onload = function () {
  if (FoodListReq.status == 200) {
    console.log("GET request success");
    responseObject = JSON.parse(FoodListReq.responseText);

    var menuContainer = document.getElementById("menu1");
    var FoodListTable = document.getElementById("FoodListTable");
    //Variable para almacenar los nuevos contenidos obtenidos del backend
    var foodsList =
      "<tr><th>Nombre</th><th>Precio</th><th>Editar</th><th>Eliminar</th></tr>";
    for (var i = 0; i < responseObject.length; i++) {
      url = "http://127.0.0.1:8000/editFood/" + responseObject[i].id;
      foodsList += "<tr>";
      foodsList += "<td>" + responseObject[i].name + "</td>";
      foodsList += "<td>$ " + responseObject[i].price + "</td>";
      foodsList +=
        "<td><a href = " + url + "><i class='fas fa-edit'></i></a></td>";
      foodsList +=
        "<td><i class='far fa-trash-alt deleteFood' data-food = " +
        responseObject[i].id +
        "></i></td>";
      foodsList += "</tr>";
    }
    try {
      FoodListTable.innerHTML = foodsList;

      var deleteFoodsBtns = document.getElementsByClassName("deleteFood");
      for (let index = 0; index < deleteFoodsBtns.length; index++) {
        deleteFoodsBtns[index].addEventListener("click", function () {
          if (confirm("¿Estas seguro de eliminar esta comida?")) {
            let access = localStorage.getItem("access");
            let data = {
              _id: deleteFoodsBtns[index].getAttribute("data-food"),
              token: access,
            };
            let deleteFoodRequest = new DeleteFood();
            deleteFoodRequest
              .delete("http://127.0.0.1:8000/api/foods/deleteFood/", data)
              .then((data) => (window.location.href = mainUrl + "foodList/"));
            FoodListReq.onload();
          }
        });
      }
    } catch {}
  }
};

FoodListReq.open("GET", "http://127.0.0.1:8000/api/foods/", true);
FoodListReq.send();

var buttonCreateFood = document.getElementById("buttonCreateFood");
try {
  buttonCreateFood.addEventListener("click", function () {
    const createFood = new CreateFood();
    let access = localStorage.getItem("access");
    createFood
      .post("http://127.0.0.1:8000/api/foods/createFood/", access)
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
      
  });
} catch {}

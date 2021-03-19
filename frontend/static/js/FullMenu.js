var getAllFoods = new XMLHttpRequest();

getAllFoods.onload = function () {
    if (getAllFoods.status == 200) {
      console.log("GET request success");
      responseObject = JSON.parse(getAllFoods.responseText);

      var allProducts = document.getElementById("allProducts");
      var topFoods = "";
      for (var index = 0; index < responseObject.length; index++) {
        topFoods +=
          '<div class="topProducts"> <div class="productInfo"> <h1>' +
          responseObject[index].name +
          "</h1><span>" +
          responseObject[index].description +
          '</span> <span class="price"> $' +
          responseObject[index].price +
          '</span></div> <div class="productImg"><img src = https://res.cloudinary.com/jordiespinoza/' +
          responseObject[index].img +
          " /></div></div>";
      }
  
      try {
        allProducts.innerHTML = topFoods;
      } catch {}
    }
  };
  getAllFoods.open("GET", "http://127.0.0.1:8000/api/foods/", true);
  getAllFoods.send();

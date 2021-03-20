var getFoods = new XMLHttpRequest();
var token = localStorage.getItem("access");

getFoods.onload = function () {
  if (getFoods.status == 200) {
    console.log("GET request success");
    responseObject = JSON.parse(getFoods.responseText);

    var menuContainer = document.getElementById("menu1");
    //Variable para almacenar los nuevos contenidos obtenidos del backend
    var newContent = "";

    for (var i = 0; i < 8; i++) {
      console.log(responseObject[i]);
      try{
      newContent +=
        "<div class = 'menu-item'><div class='imgContainer'><img src = https://res.cloudinary.com/jordiespinoza/" +
        responseObject[i].img +
        " /></div><h1>" +
        responseObject[i].name +
        "</h1><span>" +
        responseObject[i].description +
        "</span></div>";
      }catch{}
    }
    var topFoodsContainer = document.getElementById("topProductSection");
    var topFoods = "";
    for (var index = 0; index < 4; index++) {
      try{
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
        
      }catch{}
    }

    var sliderContainer = document.getElementById("sliderC");
    var myslides = "";
    var notImgUrl = "https://media.istockphoto.com/vectors/no-image-available-sign-vector-id922962354?k=6&m=922962354&s=612x612&w=0&h=_KKNzEwxMkutv-DtQ4f54yA5nc39Ojb_KPvoV__aHyU=";
    for (let index = 0; index < 3; index++) {
      try{
        myslides += `<div class="mySlides fade"> <div class="numbertext">${
          index + 1
        }/3</div> <img alt=${
          responseObject[index].name
        } src="https://res.cloudinary.com/jordiespinoza/${
          responseObject[index].img ? responseObject[index].img : notImgUrl
        }"   style="width:100%;"> <div class="textSlider">
          ${responseObject[index].name}
          </div> </div>`;
      }catch{}
    }
    myslides += '<a onclick = "plusSlides(-1)" class="prev">&#10094;</a> <a onclick = "plusSlides(1)" class="next">&#10095;</a>';
    try {
      //Actualizamos los valores de los contenedores con la informaccion del back
      menuContainer.innerHTML = newContent;
      topFoodsContainer.innerHTML = topFoods;
      sliderContainer.innerHTML = myslides;
      //Mostramos los slides
      showSlides(1);
    } catch {}
  }
};

//Hacemos la llamada al backend
getFoods.open("GET", mainUrl+"api/foods/", true);
getFoods.send();

//Barra de navegacion
var navBar = document.getElementById("top");
//Si la ventana se esta moviendo
window.addEventListener("scroll", function () {
  navBar.classList.toggle("Iscrolling", window.scrollY > 0);
});

//Hacemos logout
var logout = document.getElementById("logout");
logout.addEventListener("click", function () {
  console.log("Logout");
  localStorage.removeItem("access");
  localStorage.removeItem("userInfo");
  window.location.reload();
});

//Si el usuario esta logueado correctamente agregamos las acciones a la barra de navegacion
var adminActions = document.getElementsByClassName("admin");
if (
  localStorage.getItem("access") == null &&
  localStorage.getItem("userInfo") == null
) {
  for (let index = 0; index < adminActions.length; index++) {
    adminActions[index].style.display = "none";
  }
  document.getElementById("login").style.display = "block";
} else {
  for (let index = 0; index < adminActions.length; index++) {
    adminActions[index].style.display = "block";
  }
  document.getElementById("login").style.display = "none";
}
// Slider de la pagina
var slideIndex = 1; //Indice del slider
showSlides(slideIndex);
//Funcion para mostrar slides
function plusSlides(n) {
  showSlides((slideIndex += n));
}
//Elegimos que slide mostrar
function currentSlide(n) {
  showSlides((slideIndex = n));
}
function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides"); //Seleccionamos los slides que existen (3)
  var dots = document.getElementsByClassName("dot"); //Tomamos los dots
  try{
    //Evaluamos el parametro n que nos ha llegado
    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    //Activamos el slider que nos ha llegado
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
  }catch{}
}

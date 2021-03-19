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
      newContent +=
        "<div class = 'menu-item'><div class='imgContainer'><img src = https://res.cloudinary.com/jordiespinoza/" +
        responseObject[i].img +
        " /></div><h1>" +
        responseObject[i].name +
        "</h1><span>" +
        responseObject[i].description +
        "</span></div>";
    }
    var topFoodsContainer = document.getElementById("topProductSection");
    var topFoods = "";
    for (var index = 0; index < 4; index++) {
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

    var sliderContainer = document.getElementById("sliderC");
    var myslides = "";
    for (let index = 0; index < 3; index++) {
      myslides += `<div class="mySlides fade"> <div class="numbertext">${
        index + 1
      }/3</div> <img alt=${
        responseObject[index].name
      } src="https://res.cloudinary.com/jordiespinoza/${
        responseObject[index].img
      }"   style="width:100%;"> <div class="textSlider">
        ${responseObject[index].name}
        </div> </div>`;
    }
    myslides += '<a onclick = "plusSlides(-1)" class="prev">&#10094;</a> <a onclick = "plusSlides(1)" class="next">&#10095;</a>';
    try {
      menuContainer.innerHTML = newContent;
      topFoodsContainer.innerHTML = topFoods;
      sliderContainer.innerHTML = myslides;
      showSlides(1);
    } catch {}
  }
};
getFoods.open("GET", "http://127.0.0.1:8000/api/foods/", true);
getFoods.send();

var navBar = document.getElementById("top");

window.addEventListener("scroll", function () {
  navBar.classList.toggle("Iscrolling", window.scrollY > 0);
});



var logout = document.getElementById("logout");
logout.addEventListener("click", function () {
  console.log("Logout");
  localStorage.removeItem("access");
  localStorage.removeItem("userInfo");
  window.location.reload();
});

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
// Slider
var slideIndex = 1;
showSlides(slideIndex);
function plusSlides(n) {
  showSlides((slideIndex += n));
}
function currentSlide(n) {
  showSlides((slideIndex = n));
}
function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  try{
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
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
  }catch{}
}

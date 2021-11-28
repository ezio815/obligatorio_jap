const SERVER = //"http://localhost:8000";
"https://japdevdep.github.io/ecommerce-api";

const CATEGORIES_URL = `${SERVER}/category/all.json`;

const PUBLISH_PRODUCT_URL = `${SERVER}/product/publish.json`;

const CATEGORY_INFO_URL = `${SERVER}/category/1234.json`;

const PRODUCTS_URL = `${SERVER}/product/all.json`;

const PRODUCT_INFO_URL = `${SERVER}/product/5678.json`;

const PRODUCT_INFO_COMMENTS_URL = `${SERVER}/product/5678-comments.json`;

const CART_INFO_URL = `${SERVER}/cart/987.json`;

const CART_BUY_URL = `${SERVER}/cart/buy.json`;

let user = null;

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", () => {
  localStorage.removeItem("origen");
  let login = document.getElementById("log in");
  if (localStorage.getItem("user")) user = localStorage.getItem("user");
  else user = sessionStorage.getItem("user");
  if (user) {
    login.href = "#";
    login.textContent = user;
    let elementos = document.getElementById("div-menu").getElementsByTagName("a");
    for (let i = 1; i <= 3; i++) {
      elementos[i].classList.remove("disabled", "text-muted");
      elementos[i].setAttribute("aria-disabled", false);
    }
    login.classList.add("disabled", "text-primary");
    login.setAttribute("aria-disabled", true);
    document.getElementById("log out").addEventListener("click", () => {
      //signOut(); //No logré que funcionara el logout de google
      localStorage.removeItem("user");
      sessionStorage.removeItem("user");
      location.reload();
    });
  }
  else
  {
    login.addEventListener("click", () => {
      localStorage.setItem("origen", location.href);
    });
    if (/my-profile\.html/.test(location.href) || /cart\.html/.test(location.href)) location.href = "index.html";
  }
});
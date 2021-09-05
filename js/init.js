const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

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
document.addEventListener("DOMContentLoaded", function(e){
  localStorage.removeItem("origen");
  let login = document.getElementById("log in");
  //if (localStorage.getItem("user") != null || sessionStorage.getItem("user") != null) {
  if (localStorage.getItem("user") != null) user = localStorage.getItem("user");
  else user = sessionStorage.getItem("user");
  if (user) {
    login.href = "#";
    login.textContent = user;
    login.classList.add("text-primary")
    login.addEventListener("mouseover", () => {
      login.textContent = "¿Cerrar Sesión?"
      login.classList.remove("text-primary");
      login.classList.add("text-warning");
    });
    login.addEventListener("mouseout", () => {
      login.textContent = user;
      login.classList.remove("text-warning")
      login.classList.add("text-primary");
    });
    login.addEventListener("click", () => {
      //signOut();
      localStorage.removeItem("user");
      sessionStorage.removeItem("user");
      location.reload();
    });
  }
  else
  {
    login.addEventListener("click", () => {
      localStorage.setItem("origen", location.href)
    });
  }
  if (/products\.html/.test(location.href)) {
    let buscador = document.getElementById("buscar");
    buscador.addEventListener("keyup", () => {
      search = buscador.value;
      showProductsList();
    });
  }
  else if (/categories\.html/.test(location.href)) {
    let buscador = document.getElementById("buscar");
    buscador.addEventListener("keyup", () => {
      search = buscador.value;
      showCategoriesList();
    });
  }
});
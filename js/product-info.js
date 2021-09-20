//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", () => {
    getJSONData(PRODUCT_INFO_URL).then(resultObj => {
        if (resultObj.status === "ok") {
            product = resultObj.data;
            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCurrencyHTML = document.getElementById("productCurrency");
            let productCostHTML = document.getElementById("productCost");
            let productSoldCountHTML = document.getElementById("productSoldCount");
            let productCategoryHTML = document.getElementById("productCategory");

            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCurrencyHTML.innerHTML = product.currency;
            productCostHTML.innerHTML = product.cost;
            productSoldCountHTML.innerHTML = product.soldCount;
            productCategoryHTML.innerHTML = product.category;

            showImagesGallery(product.images);
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(resultObj => {
        if (resultObj.status === "ok") {
            showComments(resultObj.data);
        }
    });

    document.getElementById("comentar").addEventListener("click", addComment);
});

const showImagesGallery = (array) => {
    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `
        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

const showComments = (array) => {
    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let comment = array[i];
        let score = ""
        for (let j = 1; j <= 5; j++) {
            if (j <= comment.score) {
                score += `
                <label class="float-right star checked">★</label>
                `
            }
            else {
                score += `
                <label class="float-right star">★</label>
                `
            }
        }

        htmlContentToAppend += `
        <dt>${comment.user} ${score}</dt>
        <dd>${comment.description}</dd>
        <dd><small>Publicado el ${comment.dateTime}</small></dd>
        <hr>
        `
        document.getElementById("comments").innerHTML = htmlContentToAppend;
    }
}

const addComment = () => {
    if (localStorage.getItem("user") || sessionStorage.getItem("user")) {
        let user;
        if (localStorage.getItem("user")) user = localStorage.getItem("user");
        else user = sessionStorage.getItem("user");
        let comentario = document.getElementById("comment").value;
        let puntuacion;
        document.getElementsByName("puntaje").forEach(element => {
            if (element.checked) puntuacion = element.value;});
        let fecha = fechaActual();
        let comentarios = document.getElementById("comments");
        let score = "";
        for (let j = 1; j <= 5; j++) {
            if (j <= puntuacion) {
                score += `
                <label class="float-right star checked">★</label>
                `
            }
            else {
                score += `
                <label class="float-right star">★</label>
                `
            }
        }
        if (comentario && puntuacion > 0) {
            comentarios.innerHTML = `
            <dt>${user} ${score}</dt>
            <dd>${comentario}</dd>
            <dd><small>Publicado el ${fecha}</small></dd>
            <hr> ${comentarios.innerHTML}`;
        }
        else alert("Debes escribir un comentario y dejar tu puntuación.");
    }
    else {
        alert("Debes iniciar sesión para dejar un comentario");
    }
}

const fechaActual = () => {
    let fecha = new Date;
    let anio = fecha.getFullYear();
    let mes = fecha.getMonth() + 1;
    let dia = fecha.getDate();
    let hora = fecha.getHours();
    let minuto = fecha.getMinutes();
    let segundo = fecha.getSeconds();
    let lista = [anio, mes, dia, hora, minuto, segundo]
    for (let i = 0; i < 6; i++) {
        if (lista[i] < 10) lista[i] = `0${lista[i]}`;
    }
    // lista.forEach(element => {
    //     if (parseInt(element) < 10) element = `0${element}`;
    // });
    
    return `${lista[0]}-${lista[1]}-${lista[2]} ${lista[3]}:${lista[4]}:${lista[5]}`;
}
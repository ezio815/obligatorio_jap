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
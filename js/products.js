const showProductsList = () => {

    let htmlContentToAppend = "";
    for(let i = 0; i < currentItemsArray.length; i++){
        let product = currentItemsArray[i];

        if ((!minCount || minCount && parseInt(product.cost) >= minCount) &&
            (!maxCount || maxCount && parseInt(product.cost) <= maxCount) &&
            (!search || search && (product.name.toLowerCase().includes(search.toLowerCase()) || 
            product.description.toLowerCase().includes(search.toLowerCase())))) {

            htmlContentToAppend += `
            <div class="col-sm-12 col-md-6 col-lg-3">
                <a href="product-info.html" class="sinDecoracion">
                <div class="pulsable">
                    <div>
                        <img src="${product.imgSrc}" alt="${product.description}" class="img-thumbnail">
                    </div>
                    <div class="p-2">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${product.name}</h4>
                            <small class="text-muted">${product.soldCount} vendidos</small>
                        </div>
                        <p class="mb-1">${product.description}</p>
                        <h5 class="mb-1"><b>${product.currency}</b> ${product.cost}</h5>
                    </div>
                    </div>
                </a>
            </div>
            `
        }

        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", () => {
    getJSONData(PRODUCTS_URL).then(resultObj => {
        if (resultObj.status === "ok"){
            sortAndShowItems(ORDER_DESC_BY_COST, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", () => {
        sortAndShowItems(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", () => {
        sortAndShowItems(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortByRelev").addEventListener("click", () => {
        sortAndShowItems(ORDER_BY_RELEVANCE);
    });
});
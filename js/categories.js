function showCategoriesList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentItemsArray.length; i++){
        let category = currentItemsArray[i];

        if ((!minCount || minCount && parseInt(category.productCount) >= minCount) &&
            (!maxCount || maxCount && parseInt(category.productCount) <= maxCount) &&
            (!search || search && (category.name.toLowerCase().includes(search.toLowerCase()) ||
            category.description.toLowerCase().includes(search.toLowerCase())))) {

            htmlContentToAppend += `
            <a href="category-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="${category.imgSrc}" alt="${category.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${category.name}</h4>
                            <small class="text-muted">${category.productCount} artículos</small>
                        </div>
                        <p class="mb-1">${category.description}</p>
                    </div>
                </div>
            </a>
            `
        }

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", () => {
    getJSONData(CATEGORIES_URL).then(resultObj => {
        if (resultObj.status === "ok"){
            sortAndShowItems(ORDER_ASC_BY_NAME, "category", resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", () => {
        sortAndShowItems(ORDER_ASC_BY_NAME, "category");
    });

    document.getElementById("sortDesc").addEventListener("click", () => {
        sortAndShowItems(ORDER_DESC_BY_NAME, "category");
    });

    document.getElementById("sortByCount").addEventListener("click", () => {
        sortAndShowItems(ORDER_BY_PROD_COUNT, "category");
    });

    /*document.getElementById("clearRangeFilter").addEventListener("click", () => {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = null;
        maxCount = null;

        showCategoriesList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", () => {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if (minCount && parseInt(minCount) >= 0) {
            minCount = parseInt(minCount);
        }
        else{
            minCount = null;
        }

        if (maxCount && parseInt(maxCount) >= 0) {
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = null;
        }

        showCategoriesList();
    });*/
});
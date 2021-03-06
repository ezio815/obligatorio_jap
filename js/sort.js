const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
const ORDER_ASC_BY_COST = "Mayor precio";
const ORDER_DESC_BY_COST = "Menor precio";
const ORDER_BY_RELEVANCE = "Relev."
let currentItemsArray = [];
let currentSortCriteria = null;
let minCount = null;
let maxCount = null;
let search = null;
let showType = null;

const sortItems = (criteria, array) => {
    let result = [];  
    if (criteria === ORDER_ASC_BY_NAME) {
        result = array.sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
        });
    }
    else if (criteria === ORDER_DESC_BY_NAME) {
        result = array.sort((a, b) => {
            if (a.name > b.name) return -1;
            if (a.name < b.name) return 1;
            return 0;
        });
    }
    else if (criteria === ORDER_BY_PROD_COUNT) {
        result = array.sort((a, b) => {
            let aCount, bCount;      
            aCount = parseInt(a.productCount);
            bCount = parseInt(b.productCount);
            if (aCount > bCount) return -1;
            if (aCount < bCount) return 1;
            return 0;
        });
    }
    else if (criteria === ORDER_ASC_BY_COST) {
        result = array.sort((a, b) => {
            let aCost, bCost;
            aCost = parseInt(a.cost);
            bCost = parseInt(b.cost);
            if (aCost > bCost) return -1;
            if (aCost < bCost) return 1;
            return 0;
        });
    }
    else if (criteria === ORDER_DESC_BY_COST) {
        result = array.sort((a, b) => {
            let aCost, bCost;
            aCost = parseInt(a.cost);
            bCost = parseInt(b.cost);
            if (aCost < bCost) return -1;
            if (aCost > bCost) return 1;
            return 0;
        });
    }
    else if (criteria === ORDER_BY_RELEVANCE) {
        result = array.sort((a, b) => {
            let aCount, bCount;
            aCount = parseInt(a.soldCount);
            bCount = parseInt(b.soldCount);
            if (aCount > bCount) return -1;
            if (aCount < bCount) return 1;
            return 0;
        });
    }

    return result;
}

const sortAndShowItems = (sortCriteria, itemsArray) => {
    currentSortCriteria = sortCriteria;

    if(itemsArray){
        currentItemsArray = itemsArray;
    }

    currentItemsArray = sortItems(currentSortCriteria, currentItemsArray);

    showType();
}

document.addEventListener("DOMContentLoaded", () => {
    if (/categories\.html/.test(location.href)) showType = showCategoriesList;
    else if (/products\.html/.test(location.href)) showType = showProductsList;

    document.getElementById("clearRangeFilter").addEventListener("click", () => {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = null;
        maxCount = null;

        showType();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", () => {
        //Obtengo el m??nimo y m??ximo de los intervalos para filtrar por cantidad
        //de productos por categor??a.
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

        showType();
    });

    document.getElementById("buscar").addEventListener("keyup", function() {
        search = this.value;
        showType();
    });
});

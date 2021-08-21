const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
var currentItemsArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;

function sortItems(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){
        result = array.sort(function(a, b) {
            if ( a.name > b.name ){ return -1; }
            if ( a.name < b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.productCount);
            let bCount = parseInt(b.productCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function sortAndShowItems(sortCriteria, itemsArray, type){
    currentSortCriteria = sortCriteria;

    if(itemsArray != undefined){
        currentItemsArray = itemsArray;
    }

    currentItemsArray = sortItems(currentSortCriteria, currentItemsArray);

    //Muestro las categorías ordenadas

    // let a = {category: showCategoriesList(), product: showProductsList()};
    // let b = a.type;
    // b();


    if(type === "category"){
        showCategoriesList()
    }
    if(type === "product"){
        showProductsList()
    }
}
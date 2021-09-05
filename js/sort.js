const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
const ORDER_ASC_BY_COST = "Mayor precio";
const ORDER_DESC_BY_COST = "Menor precio";
const ORDER_BY_RELEVANCE = "Relev."
let currentItemsArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;
let search = undefined;

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

function sortAndShowItems(sortCriteria, type, itemsArray){
    currentSortCriteria = sortCriteria;

    if(itemsArray != undefined){
        currentItemsArray = itemsArray;
    }

    currentItemsArray = sortItems(currentSortCriteria, currentItemsArray);

    if(type === "category"){
        showCategoriesList()
    }
    if(type === "product"){
        showProductsList()
    }
}
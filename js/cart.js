//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", () => {
    getJSONData("https://japdevdep.github.io/ecommerce-api/cart/654.json").then(resultObj => {
        if (resultObj.status === "ok") {
            showItems(resultObj.data.articles);
        }
    });
});

const showItems = (array) => {
    let htmlContentToAppend = "";
    let total = 0;
    console.log(array)
    for (let i = 0; i < array.length; i++) {
        let item = array[i];
        let subtotal = item.unitCost * item.count;
        if (item.currency === "USD") total += subtotal * 40;
        else total += subtotal;
        htmlContentToAppend += `
        <div class="list-group-item">
            <div class="row">
                <div class="col-3">
                    <img src="${item.src}" alt="${item.name}" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">${item.name}</h4>
                        <small class="text-muted">${item.count} en el carrito</small>
                    </div>
                    <h5 class="mb-1"><b>${item.currency}</b> ${item.unitCost} por unidad</h5>
                    <h5 class="mb-1"><b>${item.currency}</b> ${subtotal} subtotal</h5>
                </div>
            </div>
        </div>
        `;
        console.log("hola")
        document.getElementById("container").innerHTML = htmlContentToAppend;
    }
    document.getElementById("total").innerHTML = `
    <h4>Total: <b>UYU</b> ${total}</h4>`;

}
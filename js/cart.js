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
        <tr class="dividido">
            <td>
                <img src="${item.src}" alt="${item.name}" width=100>
            </td>
            <td class="nombre">
                <h5>${item.name}</h5>
            </td>
            <td class="precio-u">
                <b>${item.currency}</b> <span>${item.unitCost}</span> <br> Por unidad
            </td>
            <td class="precio-s">
                <b>${item.currency}</b> <span>${subtotal}</span> <br> Subtotal
            </td>
            <td>
                <input type="number" value=${item.count} onchange=update() class="cantidad">
            </td>
        </tr>
        `
        /*`
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
        `;*/
        document.getElementById("container").innerHTML = htmlContentToAppend;
    }
    document.getElementById("total").innerHTML = `
    <h4>Total: <b>UYU</b> ${total}</h4>
    `;
}

function update() {
    let total = 0;
    let precioU = document.getElementsByClassName("precio-u");
    let precioS = document.getElementsByClassName("precio-s");
    let cantidad = document.getElementsByClassName("cantidad");
    for (let i of precioU) {
        let subtotal = precioS[i].querySelector("span");
        subtotal.innerHTML = precioU[i].querySelector("span") * cantidad[i];
        if (precioU[i].querySelector("b") === USD) total += subtotal * 40;
        else total += subtotal;
    }
    document.getElementById("total").innerHTML = total;
}
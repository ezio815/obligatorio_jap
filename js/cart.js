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
            <td>
                <h5>${item.name}</h5>
            </td>
            <td class="precio-u">
                <b>${item.currency}</b> <span>${item.unitCost}</span> <br> Por unidad
            </td>
            <td class="precio-s">
                <b>${item.currency}</b> <span>${subtotal}</span> <br> Subtotal
            </td>
            <td>
                <label for="cantidad${i}">Cantidad: </label>
                <input type="number" value=${item.count} onchange="update()" class="cantidad" id="cantidad${i}" min=0>
            </td>
        </tr>
        `;
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
    for (let i = 0; i < precioU.length; i++) {
        let subtotal = precioS[i].querySelector("span");
        subtotal.innerHTML = precioU[i].querySelector("span").innerHTML * cantidad[i].value;
        if (precioU[i].querySelector("b").innerHTML === "USD") total += parseInt(subtotal.innerHTML) * 40;
        else total += parseInt(subtotal.innerHTML);
    }
    document.getElementById("total").innerHTML = `
    <h4>Total: <b>UYU</b> ${total}</h4>
    `;
}
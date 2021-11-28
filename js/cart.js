//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", () => {
    getJSONData("https://japdevdep.github.io/ecommerce-api/cart/654.json").then(resultObj => {
        if (resultObj.status === "ok") {
            showItems(resultObj.data.articles);
        }
    });
    document.querySelectorAll("#lDropdownPais > button").forEach(element => {
        element.addEventListener("click", () => {
            document.querySelector("#dropdownPais").innerText = element.innerText;
            document.getElementsByName("pais")[0].value = element.innerText;
        });
    });
    document.getElementsByName("rEnvio").forEach(ele => {
        ele.addEventListener("click", update);
    });
    if (/localhost/.test(SERVER) || /127.0.0.1/.test(SERVER)) document.getElementById("formulario").setAttribute("action", `${SERVER}/cart/buy.json`);
});

const showItems = (array) => {
    let htmlContentToAppend = "";
    let total = 0;
    for (let i = 0; i < array.length; i++) {
        let item = array[i];
        let subtotal = item.unitCost * item.count;
        if (item.currency === "USD") total += subtotal * 40;
        else total += subtotal;
        htmlContentToAppend += `
        <input type="hidden" name="item${i}_unitario" value="${item.unitCost}" required>
        <input type="hidden" name="item${i}_subtotal" value="${subtotal}" required>
        <input type="hidden" name="item${i}_envio" value="" required>
        <tr class="dividido" id="item${i}">
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
            <td class="precioEnvio">
                <b>${item.currency}</b> <span></span> <br> Envío
            </td>
            <td>
                <input type="number" value=${item.count} onchange="update()" class="cantidad form-control text-primary" id="cantidad${i}" min="1" placeholder="Cantidad" onkeyup="verificar('cantidad${i}')" onclick="verificar('cantidad${i}')" name="item${i}_cantidad" required>
            </td>
            <td>
                <button type="button" onclick="eliminar('item${i}')" class="btn btn-danger">
                Eliminar
                </button>
            </td>
        </tr>
        `
        document.getElementById("container").innerHTML = htmlContentToAppend;
    }
    document.getElementById("total").innerHTML = `
    <h4>Total: <b>UYU</b> ${total}</h4>
    `;
    update();
}

function update() {
    let total = 0;
    let envioTotal = 0;
    let precioU = document.getElementsByClassName("precio-u");
    let precioS = document.getElementsByClassName("precio-s");
    let cantidad = document.getElementsByClassName("cantidad");
    let envios = document.getElementsByClassName("precioEnvio");
    let porcentaje;
    document.getElementsByName("tipoEnvio").forEach(ele => {
        if (ele.checked) {
            porcentaje = ele.value;
        }
    })
    for (let i = 0; i < precioU.length; i++) {
        let subtotal = precioS[i].querySelector("span");
        subtotal.innerHTML = precioU[i].querySelector("span").innerHTML * cantidad[i].value;

        if (precioU[i].querySelector("b").innerHTML === "USD") total += parseInt(subtotal.innerHTML) * 40;
        else total += parseInt(subtotal.innerHTML);
        
        let envio = envios[i].querySelector("span");
        envio.innerHTML = porcentaje * subtotal.innerHTML / 100;
        document.getElementsByName(`item${i}_envio`)[0].value = parseInt(envio.innerHTML);

        if (envios[i].querySelector("b").innerHTML === "USD") {
            envioTotal += parseInt(envio.innerHTML) * 40;
            total += parseInt(envio.innerHTML) * 40;
        }
        else {
            envioTotal += parseInt(envio.innerHTML);
            total += parseInt(envio.innerHTML);
        }
    }
    
    document.getElementById("envio").innerHTML = `
    <h5>Envío: <b>UYU</b> ${envioTotal}</h5>
    `;
    document.getElementsByName("envio")[0].value = envioTotal;
    document.getElementById("total").innerHTML = `
    <h4>Total: <b>UYU</b> ${total}</h4>
    `;
    document.getElementsByName("total")[0].value = total;
}

function verificar (id) {
    elemento = document.getElementById(id);
    if (elemento.value) {
        elemento.classList.add("is-valid");
        elemento.classList.remove("is-invalid");
    }
    else{
        elemento.classList.add("is-invalid");
        elemento.classList.remove("is-valid");
    }
}

const verificar2 = () => {
    let calle = document.getElementById("calle");
    let numero = document.getElementById("numero");
    let esquina = document.getElementById("esquina");
    if (!calle.value || !numero.value || !esquina.value) {
        alert("Faltan campos por completar");
    }
    else {
        let bien = true;
        let cantidades = document.getElementsByClassName("cantidad")
        for (let i = 0; i < cantidades.length; i++) {
            if (!cantidades[i].value) bien = false;
        }
        if (bien) {
            if (document.getElementById("formulario").getAttribute("action")) document.getElementById("formulario").submit();
            else alert("¡Compra realizada con éxito!");
        }
        else {
            alert("No puedes tener cantidades sin valor");
        }
    }
}

const eliminar = (id) => {
    document.getElementById(id).remove();
    update();
}
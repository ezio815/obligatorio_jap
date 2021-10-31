//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", () => {
    if (user && localStorage.getItem(user)) {
        let datos = JSON.parse(localStorage.getItem(user));
        document.getElementById("nombre").value = datos.nombre;
        document.getElementById("apellido").value = datos.apellido;
        document.getElementById("edad").value = datos.edad;
        document.getElementById("correo").value = datos.correo;
        document.getElementById("telefono").value = datos.telefono;
    }
});

const actualizar = () => {
    if (user) {
        let datos = {};
        datos.nombre = document.getElementById("nombre").value;
        datos.apellido = document.getElementById("apellido").value;
        datos.edad = document.getElementById("edad").value;
        datos.correo = document.getElementById("correo").value;
        datos.telefono = document.getElementById("telefono").value;
        localStorage.setItem(user, JSON.stringify(datos));
        alert("Datos actualizados con éxito");
    }
};
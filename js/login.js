//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    let volver = document.getElementById("volver");
    volver.href = localStorage.getItem("origen");
});

document.getElementById("login").addEventListener("click", () => {
    let user = document.getElementById("usuario").value;
    let pass = document.getElementById("contrasenia").value;
    if (user.trim() === "" || pass.trim() === "") {
        alert("Los campos no pueden estar vacíos");
    }
    else if (/[A-Za-z]/.test(user[0]) && !/[^\w\s-]/.test(user) && /[A-Za-z0-9]/.test(user[user.length - 1]) && user.length >= 4 && user.length <= 10) {
        if (pass.trim().length >= 4) {
            if(document.getElementById("recordar").checked){
                localStorage.setItem("user", user);
            }
            else {
                sessionStorage.setItem("user", user);
            }
            location.href = localStorage.getItem("origen");
        }
        else {
            alert("Contraseña inválida");
        }
    }
    else {
        alert("Usuario inválido");
    }
});
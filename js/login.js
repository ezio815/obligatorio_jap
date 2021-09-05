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
    else if (/[A-Za-z][\w\s-]*[A-Za-z0-9]/.test(user) && user.length >= 4) {
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
    /*else if (/[A-Za-z]/.test(user[0])) {
        for (let i = 0; i < user.length; i++) {
            if (!/[a-zA-Z0-9]/)
        }
    }*/

    /*else if (/@/.test(mail.trim())){
        let ma_il = mail.trim().split("@")
        if (ma_il.length != 2 || !(/[.]/.test(mail.trim()))){
            alert("Correo inválido");
        }
        else if (ma_il[0].length < 1 || ma_il[1].length < 4) {
            alert("Correo demasiado corto")
        }
        else if (/[a-zA-Z]/.test(mail[0]) && /[a-zA-Z]/.test(mail[mail.length-1])){
            if (pass.trim().length < 4){
                alert("Contraseña inválida");
            }
            else{
                if(document.getElementById("recordar").checked){
                    localStorage.setItem("mail", mail);
                }
                else{
                    sessionStorage.setItem("mail", mail);
                }
                location.href = localStorage.getItem("origen");
            }
        }
        else{
            alert("Correo inválido");
        }
    }
    else{
        alert("Correo invalido");
    }
});*/
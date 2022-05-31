var form = document.getElementById('form');
var cancel = document.getElementById("cancelar");

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem("cripto")) {
        let cripto = JSON.parse(localStorage.getItem("cripto"));
        window.localStorage.removeItem("cripto");
        document.getElementById('info').value = `Cripto: ${cripto.nombre} - Precio: ${cripto.precio}`;
    }
});

function validate() {
    var info = document.getElementById('info').value;
    var emailEmisor = document.getElementById('emailEmisor').value;
    var emailDestino = document.getElementById('emailDestino').value;
    var mensaje = document.getElementById('mensaje').value;
    var error_message = document.getElementById("error_message");

    error_message.style.padding = "10px";

    if (info === '') {
        error_message.innerHTML = 'Datos compartidos requerido.';
        return false;
    }

    if (emailEmisor === '') {
        error_message.innerHTML = 'Correo emisor requerido.';
        return false;
    } else if (!isValidEmail(emailEmisor)) {
        error_message.innerHTML = 'El mail no es valido';
        return false;
    }

    if (emailDestino === '') {
        error_message.innerHTML = 'Correo Destino requerido.';
        return false;
    } else if (!isValidEmail(emailDestino)) {
        error_message.innerHTML = 'El mail no es valido';
        return false;
    }

    form.action = `mailto:${emailEmisor}?subject=${info}&body=Nombre%3A${info}%0ACorreo%3A${emailDestino}%0Mensaje%3A${mensaje}`;
    form.reset();
    return true;
}

cancel.addEventListener("click", function (event) {
    form.reset();
});

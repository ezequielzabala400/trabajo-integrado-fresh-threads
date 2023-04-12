const contactoForm = document.querySelector('.contacto-form');
const inputNombre = document.querySelector('.input--nombre');
const inputApellido = document.querySelector('.input--apellido');
const inputCorreo = document.querySelector('.input--correo');
const inputAsunto = document.querySelector('.input--asunto');
const inputMensaje = document.querySelector('.input--mensaje');
const btnForm = document.querySelector('.btn--contacto');

const Correo_REGEX = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const elCampoEstaVacio = (valor) => valor.length === 0;

const comprobarCorreo = (correo) => Correo_REGEX.test(correo);

const mostrarError = (input, mensaje) => {
    const contenedorError = input.nextElementSibling;
    contenedorError.textContent = mensaje;
}

const quitarError = (input) => {
    const contenedorError = input.nextElementSibling;
    contenedorError.textContent = '';
}

const nombreEsValido = () => {
    let valido = false;
    let valorInput = inputNombre.value.trim();
    if(elCampoEstaVacio(valorInput)){
        mostrarError(inputNombre, 'Debe llenar el campo');
        return;
    }else{
        quitarError(inputNombre);
        valido = true;
    }
    return valido;
}
const apellidoEsValido = () => {
    let valido = false;
    let valorInput = inputApellido.value.trim();
    if(elCampoEstaVacio(valorInput)){
        mostrarError(inputApellido, 'Debe llenar el campo');
        return;
    }else{
        quitarError(inputApellido);
        valido = true;
    }
    return valido;
}
const correoEsValido = () => {
    let valido = false;
    let valorInput = inputCorreo.value.trim();
    if(elCampoEstaVacio(valorInput)){
        mostrarError(inputCorreo, 'Debe llenar el campo');
        return;
    }else if(!comprobarCorreo(valorInput)){
        mostrarError(inputCorreo, 'El correo no es válido');
        return;
    }else{
        quitarError(inputCorreo);
        valido = true;
    }
    
    return valido;
}
const asuntoEsValido = () => {
    let valido = false;
    let valorInput = inputAsunto.value.trim();
    if(elCampoEstaVacio(valorInput)){
        mostrarError(inputAsunto, 'Debe llenar el campo');
        return;
    }else{
        quitarError(inputAsunto);
        valido = true;
    }
    return valido;
}
const mensajeEsValido = () => {
    let valido = false;
    let valorInput = inputMensaje.value.trim();
    if(elCampoEstaVacio(valorInput)){
        mostrarError(inputMensaje, 'Debe llenar el campo');
        return;
    }else{
        quitarError(inputMensaje);
        valido = true;
    }
    return valido;
}



const enviarFormulario = (e) => {
    e.preventDefault();
    btnForm.removeAttribute('data-bs-toggle');
    btnForm.removeAttribute('data-bs-target');
    nombreEsValido();
    apellidoEsValido();
    correoEsValido();
    asuntoEsValido();
    mensajeEsValido();
    const formularioValido = nombreEsValido() && apellidoEsValido() && correoEsValido() && asuntoEsValido() && mensajeEsValido();
    if(formularioValido){
        // btnForm.setAttribute('data-bs-toggle', 'modal');
        // btnForm.setAttribute('data-bs-target', '#exampleModal')
        alert('El formulario se envió con exito :D')

        // data-bs-toggle="modal" data-bs-target="#exampleModal"
        setTimeout(() => {
            location.reload()
        }, 500);
    }
    
}

contactoForm.addEventListener('submit', enviarFormulario);

/**
 * Verifica la validez general de los campos en un formulario y aplica estilos a los campos inválidos.
 * 
 * Esta función recorre todos los campos `input`, `select` y `textarea` del formulario. Verifica si:
 * - Los campos requeridos están llenos (excepto checkboxes y radios).
 * - Los checkboxes requeridos están marcados.
 * - Si algún campo tiene la clase `invalid`.
 * 
 * Si algún campo no es válido, marca el formulario como no válido.
 * Luego, llama a `toggleRegisterButton` para habilitar o deshabilitar el botón de envío.
 * 
 * @function
 * @param {HTMLFormElement} form - El formulario que se está validando.
 * @returns {void}
 * 
 * @example
 * checkFormValidity(form);
 */
export function checkFormValidity(form) {
    const inputs = form.querySelectorAll("input, select, textarea");
    let isValid = true;
  
    inputs.forEach((input) => {
      if (
        (input.type !== "checkbox" && input.type !== "radio" && input.required && !input.value.trim()) ||
        (input.type === "checkbox" && input.required && !input.checked) ||
        input.classList.contains("invalid")
      ) {
        isValid = false;
      }
    });
  
    toggleRegisterButton(form, isValid);
  }
/**
 * Habilita o deshabilita el botón de enviar según la validez del formulario.
 * 
 * Esta función habilita o deshabilita el botón de envío dependiendo de la validez del formulario.
 * Si `forceState` es proporcionado, ese valor se utiliza en lugar de la validez calculada con `form.checkValidity()`.
 * También añade o elimina la clase `disabled` al botón de enviar dependiendo de su estado.
 * 
 * @function
 * @param {HTMLFormElement} form - El formulario que contiene el botón de envío.
 * @param {boolean|null} [forceState=null] - Si se proporciona, fuerza el estado del botón (si el formulario es válido o no).
 * @returns {void}
 * 
 * @example
 * toggleRegisterButton(form, true); // Fuerza a habilitar el botón
 */
  export function toggleRegisterButton(form, forceState = null) {
    const submitButton = form.querySelector('button[type="submit"], input[type="submit"]');
    if (!submitButton) return;
  
    const isValid = forceState !== null ? forceState : form.checkValidity();
  
    submitButton.disabled = !isValid;
    submitButton.classList.toggle("disabled", !isValid);
  }
  
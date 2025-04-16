// formValidation.js

// ==================
// Función que verifica la validez general del formulario
// y aplica estilos a campos inválidos si es necesario
// ==================
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
  
  // ==================
  // Habilita o deshabilita el botón de enviar según si el formulario es válido
  // ==================
  export function toggleRegisterButton(form, forceState = null) {
    const submitButton = form.querySelector('button[type="submit"], input[type="submit"]');
    if (!submitButton) return;
  
    const isValid = forceState !== null ? forceState : form.checkValidity();
  
    submitButton.disabled = !isValid;
    submitButton.classList.toggle("disabled", !isValid);
  }
  
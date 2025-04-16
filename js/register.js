// register.js
import { checkFormValidity, toggleRegisterButton } from "./formValidation.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#registerForm");
  if (!form) return;

  // ==================
  // Validación del Teléfono con intl-tel-input
  // ==================
  const phoneInput = document.getElementById("phone");
  const phoneRegex = /^\+?[0-9]{10,15}$/;

  const iti = window.intlTelInput(phoneInput, {
    initialCountry: "mx",
    separateDialCode: true,
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/25.3.1/js/utils.js",
  });

  phoneInput.addEventListener("input", () => {
    let phoneValue = phoneInput.value;
    phoneInput.value = phoneValue.startsWith("+")
      ? "+" + phoneValue.slice(1).replace(/[^0-9]/g, "")
      : phoneValue.replace(/[^0-9+]/g, "");
  });

  function validatePhone() {
    const value = phoneInput.value.trim();
    phoneInput.classList.toggle("valid", value && phoneRegex.test(value));
    phoneInput.classList.toggle("invalid", !phoneRegex.test(value));
    checkFormValidity(form);
  }

  phoneInput.addEventListener("blur", validatePhone);
  phoneInput.addEventListener("input", validatePhone);

  // ==================
  // Validación de Contraseñas
  // ==================
  const passwordInput = document.getElementById("password");
  const passwordConfirmInput = document.getElementById("passwordConfirmation");
  const passwordHint = document.getElementById("passwordHint");
  const passwordConfirmHint = document.getElementById("passwordConfirmHint");

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}$/;

  const validatePassword = () => {
    const passwordValue = passwordInput.value.trim();
    const isValid = passwordRegex.test(passwordValue);
    passwordInput.classList.toggle("valid", isValid);
    passwordInput.classList.toggle("invalid", !isValid);
    checkFormValidity(form);
  };

  const validatePasswordConfirmation = () => {
    const pass = passwordInput.value.trim();
    const confirm = passwordConfirmInput.value.trim();
    const isValid = confirm === pass && passwordRegex.test(pass);
    passwordConfirmInput.classList.toggle("valid", isValid);
    passwordConfirmInput.classList.toggle("invalid", !isValid);
    checkFormValidity(form);
  };

  passwordInput.addEventListener("focus", () => (passwordHint.style.display = "block"));
  passwordInput.addEventListener("blur", () => {
    if (!passwordInput.value) passwordHint.style.display = "none";
    validatePassword();
  });
  passwordInput.addEventListener("input", validatePassword);

  passwordConfirmInput.addEventListener("focus", () => (passwordConfirmHint.style.display = "block"));
  passwordConfirmInput.addEventListener("blur", () => {
    if (!passwordConfirmInput.value) passwordConfirmHint.style.display = "none";
    validatePasswordConfirmation();
  });
  passwordConfirmInput.addEventListener("input", validatePasswordConfirmation);

  // ==================
  // Validación de Nombre y Apellido
  // ==================
  const nameInput = document.getElementById("name");
  const lastnameInput = document.getElementById("last-name");

  const validateTextInput = (input) => {
    input.value = input.value.replace(/[^A-Za-z]/g, "").toUpperCase();
    input.classList.toggle("valid", input.value.trim() !== "");
    input.classList.toggle("invalid", input.value.trim() === "");
    checkFormValidity(form);
  };

  nameInput.addEventListener("input", () => validateTextInput(nameInput));
  lastnameInput.addEventListener("input", () => validateTextInput(lastnameInput));

  // ==================
  // Validación del Email
  // ==================
  const emailInput = document.getElementById("email");
  const emailRegex = /^[-\w.%+]{1,64}@(?!-)(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

  emailInput.addEventListener("input", () => {
    const email = emailInput.value.trim();
    emailInput.classList.toggle("valid", emailRegex.test(email));
    emailInput.classList.toggle("invalid", !emailRegex.test(email));
    checkFormValidity(form);
  });

  // ==================
  // Validación de Fecha de Nacimiento (mayores de 18 años)
  // ==================
  const birthInput = document.getElementById("birth");

  birthInput.addEventListener("input", () => {
    const birthDate = new Date(birthInput.value);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    birthInput.classList.toggle("valid", age >= 18);
    birthInput.classList.toggle("invalid", age < 18);
    checkFormValidity(form);
  });

  // ==================
  // Validación de Dirección
  // ==================
  const countryInput = document.getElementById("country");
  const cityInput = document.getElementById("city");
  const cologneInput = document.getElementById("cologne");
  const addressInput = document.getElementById("address");

  const validateSelect = (input) => {
    input.classList.toggle("valid", input.value !== "");
    input.classList.toggle("invalid", input.value === "");
    checkFormValidity(form);
  };

  const validateTextField = (input) => {
    input.classList.toggle("valid", input.value.trim() !== "");
    input.classList.toggle("invalid", input.value.trim() === "");
    checkFormValidity(form);
  };

  countryInput.addEventListener("change", () => validateSelect(countryInput));
  cityInput.addEventListener("change", () => validateSelect(cityInput));
  cologneInput.addEventListener("input", () => validateTextField(cologneInput));
  addressInput.addEventListener("input", () => validateTextField(addressInput));

  // ==================
  // Validación de Código Postal (máximo 5 dígitos)
  // ==================
  const zipCodeInput = document.getElementById("zipCode");
  zipCodeInput.addEventListener("input", () => {
    zipCodeInput.value = zipCodeInput.value.replace(/[^0-9]/g, "").slice(0, 5);
    zipCodeInput.classList.toggle("valid", zipCodeInput.value !== "");
    zipCodeInput.classList.toggle("invalid", zipCodeInput.value === "");
    checkFormValidity(form);
  });

  // ==================
  // Validación de Términos y Condiciones
  // ==================
  const termsCheckbox = document.getElementById("terms");
  termsCheckbox.addEventListener("change", () => checkFormValidity(form));

  // ==================
  // Eventos Generales del Formulario
  // ==================
  form.addEventListener("input", () => toggleRegisterButton(form));
  form.addEventListener("submit", registerUser);
});

// ==================
// Función que maneja el envío del formulario
// ==================
function registerUser(event) {
  event.preventDefault();
  const emailInput = document.getElementById("email");

  if (document.querySelector("#registerForm").checkValidity()) {
    const username = emailInput.value.split("@")[0];

    Swal.fire({
      title: `¡Bienvenido, ${username}!`,
      text: "Registro con éxito",
      icon: "success",
      confirmButtonText: "Ir al inicio",
      timer: 2500,
      showConfirmButton: false,
    }).then(() => {
      window.location.href = "index.html";
    });
  }

  return false;
}

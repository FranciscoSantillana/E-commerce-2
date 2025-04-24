// ==================
//  LOGIN
// ==================
/**
 * Maneja el proceso de login del usuario.
 *
 * Esta función previene el comportamiento por defecto del formulario de login y realiza las siguientes acciones:
 * - Obtiene los valores de los campos de email y contraseña.
 * - Si ambos campos están completos, extrae el nombre de usuario del email (todo antes del símbolo `@`).
 * - Muestra un modal de éxito con SweetAlert que da la bienvenida al usuario usando su nombre.
 * - Después de cerrar el modal, redirige al usuario a la página principal (`../index.html`).
 *
 * @function
 * @param {Event} event - El evento de submit del formulario de login.
 * @returns {boolean} - Retorna `false` para prevenir el comportamiento por defecto del formulario.
 *
 * @example
 * // Este código se ejecutará al enviar el formulario de login
 * loginUser(event);
 */
function loginUser(event) {
  event.preventDefault();
  const emailInput = document.getElementById("email").value;
  const passwordInput = document.getElementById("password").value;

  if (emailInput && passwordInput) {
    const username = emailInput.split("@")[0];

    Swal.fire({
      title: `¡Bienvenido, ${username}!`,
      text: "Has iniciado sesión con éxito",
      icon: "success",
      timer: 2500,
      showConfirmButton: false,
      customClass: {
        popup: "custom-swal-popup",
        title: "custom-swal-title",
        htmlContainer: "custom-swal-content",
      },
    }).then(() => {
      // Redirige después de que el modal se cierre
      window.location.href = "../index.html";
    });
  }
  return false;
}
/**
 * Escucha el evento de submit del formulario de login.
 *
 * Esta función se ejecuta cuando el contenido del documento ha sido completamente cargado
 * (evento `DOMContentLoaded`). Busca el formulario de login y, si está presente, agrega un listener
 * para ejecutar `loginUser` al enviarlo.
 *
 * @function
 * @returns {void}
 *
 * @example
 * // Esta función se ejecuta automáticamente cuando la página se carga
 * // y añade el listener al formulario de login si está presente en el DOM.
 */
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector(".login__form");
  if (loginForm) {
    loginForm.addEventListener("submit", loginUser);
  }
});

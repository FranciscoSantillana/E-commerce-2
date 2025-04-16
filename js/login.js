// ==================
//  LOGIN
// ==================
// Lógica del login
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
          popup: 'custom-swal-popup',
          title: 'custom-swal-title',
          htmlContainer: 'custom-swal-content',
        },
      }).then(() => {
        // Redirige después de que el modal se cierre
        window.location.href = "../index.html";
      });
    }
    return false;
}
  
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector(".login__form");
    if (loginForm) {
      loginForm.addEventListener("submit", loginUser);
    }

});

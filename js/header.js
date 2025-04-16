// ==========================
// Header Sticky en Scroll
// ==========================
const header = document.querySelector("header");

// Verifica que NO estemos en la página de productos
if (window.location.pathname === '/products.html') {
  header.classList.add('products');
} else {
  // Sticky Header en scroll (en páginas que no son productos)
  const header = document.querySelector("header");
  if (header) {
    window.addEventListener("scroll", () => {
      header.classList.toggle("sticky", window.scrollY > 0);
    });
  }
}
// ==========================
// Menú hamburguesa para móviles
// ==========================
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

menuToggle.addEventListener("click", () => {
  // Alterna la clase 'show' para mostrar o esconder el menú en móvil
  navMenu.classList.toggle("show");
});

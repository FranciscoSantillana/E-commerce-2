// ==========================
// Header Sticky en Scroll
// ==========================
const header = document.querySelector("header");

/**
 * Añade la clase `sticky` al header cuando se hace scroll hacia abajo en la página.
 * 
 * Esta función verifica si la página actual no es la de productos (`/products.html`), en cuyo caso 
 * se agrega un event listener al evento de scroll. Si el scroll Y es mayor que 0, se añade la clase `sticky` 
 * al `header`, haciendo que se quede fijo en la parte superior de la pantalla. En caso contrario, la clase se elimina.
 * 
 * Si el usuario está en la página de productos, se agrega la clase `products` al `header`.
 * 
 * @function
 * @returns {void}
 * 
 * @example
 * // Este código se ejecuta automáticamente en la carga de la página
 * // y activa el sticky header o ajusta la clase dependiendo de la ruta actual.
 */if (window.location.pathname === 'products.html') {
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
/**
 * Alterna la visibilidad del menú de navegación en dispositivos móviles.
 * 
 * Esta función agrega un event listener al botón con el ID `menu-toggle`. Al hacer clic en él, 
 * alterna la clase `show` en el elemento con el ID `nav-menu`, mostrando o escondiendo el menú de navegación 
 * en pantallas pequeñas.
 * 
 * @function
 * @returns {void}
 * 
 * @example
 * // Este código se ejecuta cuando el usuario hace clic en el ícono del menú hamburguesa.
 * menuToggle.addEventListener("click", () => {
 *   navMenu.classList.toggle("show");
 * });
 */

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

menuToggle.addEventListener("click", () => {
  // Alterna la clase 'show' para mostrar o esconder el menú en móvil
  navMenu.classList.toggle("show");
});

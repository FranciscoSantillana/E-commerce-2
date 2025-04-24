import "../js/header.js";
import "../js/login.js";
import "../js/register.js";
import "../js/formValidation.js";
import { initProducts } from "../js/products.js";
import { initCart } from "../js/cart.js";



document.addEventListener("DOMContentLoaded", () => {
    // Verifica si NO estamos en las páginas de login, register 
    if (!['/login.html', '/register.html'].includes(window.location.pathname)) {
        const header = document.querySelector("#header");
        if (header) {
            header.addEventListener("click", () => {
                console.log("Header clicked!");
            });
        }
    }
    // Inicializar productos y carrito
    initProducts();
    initCart();
});
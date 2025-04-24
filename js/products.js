import { addToCart } from "../js/cart.js";
// ==================
// Card Products
// ==================
const products = [
  // Productos electronicos
  {
    id: 1,
    name: "Producto 1",
    price: 1000.0,
    image: "../img/producto/910-001601.jpg",
    category: "electronicos",
    rating: 3.5,
  },
  {
    id: 2,
    name: "Producto 2",
    price: 1000.0,
    image: "../img/producto/910-002225.png",
    category: "electronicos",
    rating: 4.5,
  },
  {
    id: 3,
    name: "Producto 3",
    price: 1000.0,
    image: "../img/producto/910-003635.jpg",
    category: "electronicos",
    rating: 5,
  },
  {
    id: 4,
    name: "Producto 4",
    price: 1000.0,
    image: "../img/producto/910-004053.jpg",
    category: "electronicos",
    rating: 3,
  },
  {
    id: 5,
    name: "Producto 5",
    price: 1000.0,
    image: "../img/producto/910-004940.jpg",
    category: "electronicos",
    rating: 4.5,
  },
  {
    id: 6,
    name: "Producto 6",
    price: 1000.0,
    image: "../img/producto/910-001601.jpg",
    category: "electronicos",
    rating: 4.5,
  },
  {
    id: 7,
    name: "Producto 7",
    price: 1000.0,
    image: "../img/producto/910-001601.jpg",
    category: "electronicos",
    rating: 4.5,
  },
];

// ****
// Funciones auxiliares
// ****
/**
 * Recupera los IDs de los productos marcados como "me gusta" desde el almacenamiento local (localStorage).
 * Si no hay datos almacenados, devuelve un array vacío.
 *
 * @function
 * @returns {number[]} Array con los IDs de productos marcados como "me gusta".
 */
function getLikedProducts() {
  return JSON.parse(localStorage.getItem("likedProducts")) || [];
}
/**
 * Guarda los IDs de los productos marcados como "me gusta" en el almacenamiento local (localStorage).
 * Convierte el array de IDs en un string JSON antes de guardarlo.
 *
 * @function
 * @param {number[]} liked - Array de IDs de productos marcados como "me gusta".
 * @returns {void}
 */
function saveLikedProducts(liked) {
  localStorage.setItem("likedProducts", JSON.stringify(liked));
}
/**
 * Inicializa la funcionalidad de los botones de "me gusta" para cada producto.
 * Busca todos los botones de "me gusta" y alterna la clase 'liked' cuando se hace clic en ellos.
 * Los productos "me gusta" se guardan en el almacenamiento local.
 *
 * @function
 * @returns {void}
 */
function initLikeButtons() {
  const likedProducts = getLikedProducts(); // Cargar productos previamente marcados como "me gusta"

  document.querySelectorAll(".product__like").forEach((button) => {
    const id = parseInt(button.dataset.id); // Obtener el ID del producto desde el atributo data-id

    // Agregar evento de click al botón
    button.addEventListener("click", () => {
      button.classList.toggle("liked"); // Alternar la clase 'liked' para cambiar el color del ícono

      // Si ya estaba en la lista, lo quitamos; si no, lo agregamos
      if (likedProducts.includes(id)) {
        const index = likedProducts.indexOf(id);
        likedProducts.splice(index, 1);
      } else {
        likedProducts.push(id);
      }

      // Guardar la lista actualizada en localStorage
      saveLikedProducts(likedProducts);
    });
  });
}

/**
 * Genera el HTML para representar la calificación de estrellas de un producto.
 * Utiliza estrellas llenas, medias y vacías según la calificación del producto.
 *
 * @function
 * @param {number} rating - La calificación del producto (de 0 a 5).
 * @returns {string} HTML que representa las estrellas del producto.
 */
function getStarsHTML(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return `
    ${'<span class="fas fa-star" aria-label="Estrella llena"></span>'.repeat(
      fullStars
    )}
    ${
      halfStar
        ? '<span class="fa-star-half" aria-label="Estrella mitad llena"></span>'
        : ""
    }
    ${'<span class="far fa-star" aria-label="Estrella vacía"></span>'.repeat(
      emptyStars
    )}
  `;
}

// ****
// Export de la función principal
// ****
/**
 * Inicializa y renderiza la lista de productos en el contenedor principal.
 * Cada producto tiene un botón de "me gusta", imagen, nombre, precio, calificación y un botón para agregar al carrito.
 *
 * @function
 * @returns {void}
 */
function initProducts() {
  const container = document.getElementById("product"); // Contenedor principal donde van los productos
  if (!container) return; // Previene errores si no existe el contenedor
  const likedProducts = getLikedProducts(); // Obtener productos con "me gusta" guardados

  // Recorrer todos los productos y renderizarlos
  products.forEach((product) => {
    const productCard = document.createElement("article"); // Crear contenedor de producto
    productCard.className = "product__card";
    productCard.dataset.productId = product.id;

    const isLiked = likedProducts.includes(product.id); // Verificar si el producto ya fue marcado como "me gusta"

    // HTML dinámico de cada producto
    productCard.innerHTML = `
      <div class="product__image">
        <img src="${product.image}" alt="${product.name}" class="product__img">
        <button class="product__like ${
          isLiked ? "liked" : ""
        }" aria-label="Me gusta" data-id="${product.id}">
          <i class="fa-solid fa-heart"></i>
        </button>
      </div>
      <div class="product__info">
        <h3 class="product__name">${product.name}</h3>
        <p class="product__price">$${product.price.toFixed(2)}</p>
        <div class="product__rating">
          ${getStarsHTML(
            product.rating
          )} <!-- Función que genera estrellas según la calificación -->
        </div>
          <button class="product__btn" aria-label="Agregar al carrito">
          Agregar al carrito
        </button>
      </div>
    `;
    /**
     * Agrega un producto al carrito de compras.
     * Esta función es importada desde el archivo `cart.js` y maneja la lógica de agregar un producto al carrito.
     *
     * @function
     * @param {Object} product - Objeto que representa el producto a agregar al carrito.
     * @returns {void}
     */
    // Añadir evento al botón "Agregar al carrito"
    const addToCartBtn = productCard.querySelector(".product__btn");
    addToCartBtn.addEventListener("click", () => {
      addToCart(product); // Envía el producto completo
    });
    // Insertar la tarjeta de producto en el contenedor
    container.appendChild(productCard);
  });
  // Inicializar la funcionalidad de "me gusta" una vez que todos los productos están en el DOM
  initLikeButtons();
}
export { initProducts };

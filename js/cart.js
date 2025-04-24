let cartItems = []; // Arreglo donde se almacenan los productos añadidos al carrito

/**
 * Agrega un producto al carrito de compras.
 *
 * Este método verifica si el producto ya existe en el carrito:
 * - Si existe, incrementa su cantidad y muestra una notificación con SweetAlert.
 * - Si no existe, lo agrega al carrito con una cantidad inicial de 1, y también muestra una notificación.
 *
 * Luego de actualizar el carrito, este método:
 * - Guarda el carrito actualizado en el `localStorage`.
 * - Actualiza visualmente la lista de productos en el carrito.
 * - Actualiza el contador del ícono del carrito.
 *
 * @function
 * @param {Object} product - El producto a agregar al carrito.
 * @param {string|number} product.id - Identificador único del producto.
 * @param {string} product.name - Nombre del producto.
 * @param {number} product.price - Precio del producto.
 * @param {string} product.image - URL de la imagen del producto.
 * @param {number} [product.quantity] - Cantidad del producto (si ya está en el carrito).
 *
 * @example
 * addToCart({
 *   id: 1,
 *   name: "Zapatillas Nike",
 *   price: 120.00,
 *   image: "img/nike.jpg"
 * });
 */
export function addToCart(product) {
  // Busca si el producto ya existe en el carrito (por su ID)
  const existingProductIndex = cartItems.findIndex(
    (item) => item.id === product.id
  );

  if (existingProductIndex !== -1) {
    // Si ya existe, aumenta la cantidad
    cartItems[existingProductIndex].quantity += 1;

    // Muestra alerta de cantidad actualizada
    Swal.fire({
      icon: "success",
      title: "Cantidad actualizada",
      text: `${product.name} ahora tiene ${cartItems[existingProductIndex].quantity} en el carrito.`,
      timer: 1500,
      showConfirmButton: false,
    });
  } else {
    // Si no existe, se agrega con cantidad inicial 1
    product.quantity = 1;
    cartItems.push(product);

    // Muestra alerta de producto agregado
    Swal.fire({
      icon: "success",
      title: "Producto agregado",
      text: `${product.name} fue agregado al carrito.`,
      timer: 1500,
      showConfirmButton: false,
    });
  }
  saveCartToStorage(); // Guarda el estado actualizado del carrito en localStorage
  renderCartItems(); // Actualiza la vista del carrito con los nuevos productos
  updateItemCount(); // Actualiza el contador de productos en el ícono del carrito
}

/**
 * Renderiza visualmente los productos agregados al carrito de compras.
 *
 * Esta función selecciona el contenedor `.cart__items`, limpia su contenido actual
 * y lo repuebla con los productos presentes en el array `cartItems`.
 * Cada producto se representa con su imagen, nombre, precio unitario,
 * cantidad, total por producto y un botón para eliminarlo.
 *
 * Al finalizar:
 * - Añade los eventos a los botones de eliminar con `addRemoveEventListeners()`.
 * - Muestra el total acumulado del carrito con `renderCartTotal()`.
 *
 * @function
 * @returns {void}
 *
 * @example
 * renderCartItems();
 */
function renderCartItems() {
  const container = document.querySelector(".cart__items");
  if (!container) return;
  container.innerHTML = "";

  cartItems.forEach((item) => {
    const itemSec = document.createElement("section");
    itemSec.classList.add("cart__item");
    itemSec.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <p>${item.name}</p>
      <p>$${item.price.toFixed(2)}</p>
      <p> X ${item.quantity}</p>
      <p>$${(item.price * item.quantity).toFixed(2)}</p>
      <button class="cart__remove--item" data-id="${
        item.id
      }"><i class="fa-solid fa-trash"></i></button>
    `;
    container.appendChild(itemSec);
  });

  addRemoveEventListeners();
  renderCartTotal();
}

/**
 * Renderiza el total acumulado de los productos en el carrito de compras.
 *
 * Esta función calcula el total del carrito sumando el precio de cada producto
 * multiplicado por su cantidad, y luego muestra este total en el elemento con
 * el ID `cart--total`. Si el elemento no existe en el DOM, la función no hace nada.
 *
 * El total se muestra con dos decimales.
 *
 * @function
 * @returns {void}
 *
 * @example
 * renderCartTotal();
 */
function renderCartTotal() {
  // Selecciona el elemento donde se mostrará el total
  const totalElement = document.querySelector('#cart--total');

  // Si el elemento no existe, sale de la función
  if (!totalElement) return;

  // Calcula el total sumando el precio de cada producto multiplicado por su cantidad
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity, // Suma el precio total de todos los productos
    0 // Valor inicial para la suma es 0
  );

  // Muestra el total calculado con 2 decimales en el elemento seleccionado
  totalElement.textContent = ` ${total.toFixed(2)}`;
}

/**
 * Elimina un producto del carrito de compras según su ID.
 *
 * Esta función filtra el array `cartItems` para excluir el producto con el ID especificado.
 * Luego, realiza una serie de actualizaciones:
 * - Guarda el nuevo estado del carrito en `localStorage`.
 * - Renderiza nuevamente la lista de productos del carrito.
 * - Actualiza el contador de productos en el ícono del carrito.
 * - Recalcula y muestra el total actualizado del carrito.
 *
 * @function
 * @param {string|number} productId - El ID del producto a eliminar del carrito.
 * @returns {void}
 *
 * @example
 * removeFromCart(1);
 */
function removeFromCart(productId) {
  cartItems = cartItems.filter((item) => item.id !== productId);
  saveCartToStorage();
  renderCartItems();
  updateItemCount();
  renderCartTotal();
}

/**
 * Asigna eventos de clic a los botones de eliminación de productos del carrito.
 *
 * Esta función selecciona todos los elementos con la clase `.cart__remove--item`
 * y les añade un listener que, al hacer clic, obtiene el ID del producto desde el atributo `data-id`
 * y llama a `removeFromCart(productId)` para eliminarlo del carrito.
 *
 * El ID se convierte explícitamente a número para asegurar el tipo correcto.
 *
 * @function
 * @returns {void}
 *
 * @example
 * addRemoveEventListeners();
 */
function addRemoveEventListeners() {
  const iconRemove = document.querySelectorAll(".cart__remove--item");
  iconRemove.forEach((elem) => {
    elem.addEventListener("click", () => {
      const productId = parseInt(elem.dataset.id); // Asegura tipo numérico
      removeFromCart(productId);
    });
  });
}

/**
 * Guarda el estado actual del carrito de compras en `localStorage`.
 *
 * Convierte el array `cartItems` a una cadena JSON y lo almacena bajo la clave `"cart"`.
 * Esto permite conservar los productos del carrito entre sesiones del usuario.
 *
 * @function
 * @returns {void}
 *
 * @example
 * saveCartToStorage();
 */
function saveCartToStorage() {
  localStorage.setItem("cart", JSON.stringify(cartItems));
}

/**
 * Carga el carrito de compras desde `localStorage`.
 *
 * Recupera los datos almacenados bajo la clave `"cart"` y los convierte de nuevo en objetos.
 * Asegura que cada producto tenga definida la propiedad `quantity`, asignando 1 en caso de que falte.
 * Esto garantiza que el carrito se restaure correctamente al recargar la página o volver a la app.
 *
 * @function
 * @returns {void}
 *
 * @example
 * loadCartFromStorage();
 */
function loadCartFromStorage() {
  const stored = localStorage.getItem("cart");
  if (stored) {
    cartItems = JSON.parse(stored).map((item) => ({
      ...item,
      quantity: item.quantity || 1,
    }));
  }
}

/**
 * Actualiza el contador de artículos en el carrito y muestra/oculta el círculo
 * en función de la cantidad total de productos en el carrito.
 *
 * 1. Suma la cantidad total de todos los productos en el carrito.
 * 2. Muestra el contador si la cantidad total es mayor a 0.
 * 3. Oculta el contador si la cantidad total es 0.
 *
 * @function updateItemCount
 * @returns {void} No retorna ningún valor.
 */
function updateItemCount() {
  // Obtiene el elemento que contiene el contador de artículos en el carrito
  const countEl = document.getElementById("number--items");

  // Si el elemento de contador existe en el DOM
  if (countEl) {
    // Calcula el número total de artículos sumando la propiedad 'quantity' de cada producto en el carrito
    const itemCount = cartItems.reduce(
      (total, item) => total + item.quantity, // Suma la cantidad de cada producto
      0 // Valor inicial (total) es 0
    );

    // Actualiza el texto del contador con el número total de artículos
    countEl.textContent = itemCount;

    // Si hay productos en el carrito (cantidad total mayor que 0)
    if (itemCount > 0) {
      countEl.style.display = "flex"; // Muestra el contador (círculo)
    } else {
      countEl.style.display = "none"; // Oculta el contador (círculo)
    }
  }
}

/**
 * Vacía el carrito de compras.
 *
 * Esta función limpia el array `cartItems`, eliminando todos los productos del carrito.
 * Luego realiza las siguientes actualizaciones:
 * - Guarda el carrito vacío en `localStorage`.
 * - Renderiza el carrito actualizado (vacío) en la interfaz.
 * - Actualiza el contador de productos en el ícono del carrito.
 *
 * @function
 * @returns {void}
 *
 * @example
 * clearCart();
 */
function clearCart() {
  cartItems = [];
  saveCartToStorage();
  renderCartItems();
  updateItemCount();
}

/**
 * Muestra un modal de pago indicando que la compra fue realizada con éxito.
 *
 * Utiliza SweetAlert para mostrar un mensaje de éxito. Tras cerrar el modal, realiza las siguientes acciones:
 * - Vacía el carrito llamando a `clearCart()`.
 * - Cierra el sidebar del carrito eliminando la clase `active`.
 * - Redirige al usuario a la página principal (`index.html`).
 *
 * @function
 * @returns {void}
 *
 * @example
 * showPaymentModal();
 */
function showPaymentModal() {
  Swal.fire({
    text: "Compra Realizada",
    icon: "success",
    timer: 2500, // El modal se cierra automáticamente después de 2.5 segundos
    showConfirmButton: false, // No se muestra el botón de confirmación
  }).then(() => {
    clearCart(); // Vaciar carrito tras compra
    document.querySelector(".cart__sidebar").classList.remove("active"); // Cerrar el sidebar del carrito
    window.location.href = "index.html"; // Redirigir al usuario a la página principal
  });
}

// Asignar el evento al botón de "Pagar"
document.getElementById("payBtn").addEventListener("click", showPaymentModal);

/**
 * Inicializa el carrito de compras.
 *
 * Esta función configura los elementos del carrito, incluyendo:
 * - Mostrar/ocultar el sidebar del carrito cuando se hace clic en el ícono del carrito.
 * - Eliminar el sidebar del carrito si se hace clic fuera de él.
 * - Cargar los productos almacenados en el carrito desde `localStorage`.
 * - Renderizar los productos y actualizar el contador de artículos.
 *
 * @function
 * @returns {void}
 *
 * @example
 * initCart();
 */
export function initCart() {
  const cartSidebar = document.getElementById("cart__sidebar");
  const cartButton = document.querySelector(".header__cart");

  // Maneja el clic en el ícono del carrito para mostrar/ocultar el sidebar
  cartButton.addEventListener("click", () => {
    cartSidebar.classList.toggle("active");
    // Evita el desplazamiento de la página cuando el carrito está abierto
    document.body.style.overflow = cartSidebar.classList.contains("active") ? "hidden" : "";
  });

  // Maneja el clic fuera del sidebar para cerrarlo
  window.addEventListener("click", (event) => {
    if (!cartSidebar.contains(event.target) && !cartButton.contains(event.target)) {
      cartSidebar.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // Carga los productos del carrito desde el almacenamiento local
  loadCartFromStorage();

  // Renderiza los productos en el carrito y actualiza el contador de artículos
  renderCartItems();
  updateItemCount();
}


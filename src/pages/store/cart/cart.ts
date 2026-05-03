// /home/user/FoodStoreParcial1/src/pages/store/cart/cart.ts
// lógica: render, cantidades, total
// parcial 1 aldo manfredi
import { getCarrito, saveCarrito } from "../../../utils/localStorage";
import type { ICarritoItem } from "../../../types/carrito"; // Asegúrate de tener este tipo

/**
 * FABRICA: Crea la tarjeta de un producto dentro del carrito
 */
const crearItemCarrito = (item: ICarritoItem): HTMLElement => {
    const precio = item.precioUnidad || 0;
    const subtotalItem = precio * item.cantidad;

    const card = document.createElement("article");
    card.className = "tarjeta";

    // Estructura fija del carrito
    card.innerHTML = `
        <h3 class="tarjeta-titulo"></h3>
        <p class="tarjeta-descripcion info-precios"></p>
        
        <div class="tarjeta-footer">
            <button class="btn-agregar" data-id="${item.id}" data-op="restar">-</button>
            <span class="cantidad-display" style="font-weight: bold;"></span>
            <button class="btn-agregar" data-id="${item.id}" data-op="sumar">+</button>
        </div>

        <div class="tarjeta-footer" style="margin-top: 10px;">
            <button class="btn-agregar btn-eliminar" data-id="${item.id}" 
                    style="background: var(--color-primario); width: 100%; justify-content: center;">
                Quitar del pedido
            </button>
        </div>
    `;

    // Asignación segura de textos
    card.querySelector(".tarjeta-titulo")!.textContent = item.nombre;
    card.querySelector(".info-precios")!.textContent = `Unitario: $${precio} | Subtotal: $${subtotalItem}`;
    card.querySelector(".cantidad-display")!.textContent = item.cantidad.toString();

    return card;
};

/**
 * RENDER: Dibuja el carrito y calcula totales
 */
const renderCarrito = () => {
    const contenedor = document.getElementById("contenedor-carrito");
    const totalTxt = document.getElementById("total-final");
    const subtotalTxt = document.getElementById("subtotal");

    if (!contenedor || !totalTxt || !subtotalTxt) return;

    const carrito = getCarrito();

    // Caso carrito vacío
    if (carrito.length === 0) {
        contenedor.innerHTML = `<p class="tarjeta-descripcion">Tu carrito está vacío.</p>`;
        totalTxt.textContent = "$0";
        subtotalTxt.textContent = "$0";
        return;
    }

    // Calcular acumulado
    const acumulado = carrito.reduce((acc, item) => acc + (item.precioUnidad || 0) * item.cantidad, 0);

    // Renderizar todas las tarjetas de un golpe
    contenedor.replaceChildren(...carrito.map(crearItemCarrito));

    totalTxt.textContent = `$${acumulado}`;
    subtotalTxt.textContent = `$${acumulado}`;
};

/**
 * EVENTOS: Delegación de clicks
 */
document.addEventListener("click", (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    
    // 1. Vaciar Carrito
    if (target.id === "btn-vaciar") {
        saveCarrito([]);
        renderCarrito();
        return;
    }

    const btn = target.closest("button");
    if (!btn || !btn.dataset.id) return;

    const id = Number(btn.dataset.id);
    let carrito = getCarrito();

    // 2. Sumar o Restar
    if (btn.dataset.op) {
        const op = btn.dataset.op;
        carrito = carrito.map(item => {
            if (item.id === id) {
                if (op === "sumar") item.cantidad++;
                if (op === "restar" && item.cantidad > 1) item.cantidad--;
                item.total = (item.precioUnidad || 0) * item.cantidad;
            }
            return item;
        });
    } 
    // 3. Eliminar (Detectamos por la clase que agregamos en la fábrica)
    else if (btn.classList.contains("btn-eliminar")) {
        carrito = carrito.filter(item => item.id !== id);
    }

    saveCarrito(carrito);
    renderCarrito();
});

// Inicio
renderCarrito();
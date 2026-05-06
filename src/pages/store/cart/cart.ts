// /home/user/FoodStoreParcial1/src/pages/store/cart/cart.ts
// lógica: render, cantidades, total
// parcial 1 aldo manfredi
// /home/user/FoodStoreParcial1/src/pages/store/cart/cart.ts
// lógica: render, cantidades, total
// parcial 1 aldo manfredi
import { getCarrito, saveCarrito } from "../../../utils/localStorage";
import type { ICarritoItem } from "../../../types/carrito";

/**
 * CREAR ITEM CARRITO
 * Genera el elemento HTML para un producto dentro del carrito
 */
function crearItemCarrito(item: ICarritoItem): HTMLElement {
    const precio = item.precioUnidad || 0;
    const subtotalItem = precio * item.cantidad;
    const card = document.createElement("article");
    card.className = "tarjeta";
    
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

    card.querySelector(".tarjeta-titulo")!.textContent = item.nombre;
    card.querySelector(".info-precios")!.textContent = `Unitario: $${precio} | Subtotal: $${subtotalItem}`;
    card.querySelector(".cantidad-display")!.textContent = item.cantidad.toString();
    
    return card;
}

/**
 * RENDER CARRITO
 * Actualiza la vista del carrito y los totales
 */
function renderCarrito(): void {
    const contenedor = document.getElementById("contenedor-carrito");
    const totalTxt = document.getElementById("total-final");
    const subtotalTxt = document.getElementById("subtotal");

    if (!contenedor || !totalTxt || !subtotalTxt) return;
    const carrito = getCarrito() as ICarritoItem[];

    if (carrito.length === 0) {
        contenedor.innerHTML = `<p class="tarjeta-descripcion">Tu carrito está vacío.</p>`;
        totalTxt.textContent = "$0";
        subtotalTxt.textContent = "$0";
        return;
    }

    const acumulado = carrito.reduce((acc, item) => acc + (item.precioUnidad || 0) * item.cantidad, 0);
    contenedor.replaceChildren(...carrito.map(crearItemCarrito));

    totalTxt.textContent = `$${acumulado}`;
    subtotalTxt.textContent = `$${acumulado}`;
}

/**
 * EVENTOS: DELEGACIÓN DE CLIC
 */
document.addEventListener("click", function (e: MouseEvent): void {
    const target = e.target as HTMLElement;
    
    if (target.id === "btn-vaciar") {
        saveCarrito([]);
        renderCarrito();
        return;
    }

    const btn = target.closest("button");
    if (!btn || !btn.dataset.id) return;

    const id = Number(btn.dataset.id);
    
    let carrito = getCarrito() as ICarritoItem[];

    if (btn.dataset.op) {
        const op = btn.dataset.op;
        carrito = carrito.map(function (item) {
            if (item.id === id) {
                if (op === "sumar") item.cantidad++;
                if (op === "restar" && item.cantidad > 1) item.cantidad--;
                item.total = (item.precioUnidad || 0) * item.cantidad;
            }
            return item;
        });
    } 
    else if (btn.classList.contains("btn-eliminar")) {
        carrito = carrito.filter(function (item) {
            return item.id !== id;
        });
    }

    saveCarrito(carrito);
    renderCarrito();
});

// Inicialización
renderCarrito();
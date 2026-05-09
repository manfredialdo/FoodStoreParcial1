// /home/user/FoodStoreParcial1/src/pages/store/cart/cart.ts
// lógica: render, cantidades, total optimizada
// parcial 1 aldo manfredi
import { getCarrito, saveCarrito } from "../../../utils/localStorage";
import type { ICartItem } from "../../../types/product";
import { PRODUCTS } from "../../../data/data";

/**
 * CREAR ITEM CARRITO
 */
function crearItemCarrito(item: ICartItem): HTMLElement {
    const precio = item.precioUnidad;
    const subtotalItem = item.total; // Usamos la propiedad total que ya existe en el objeto
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
    
    // console.log(`Item renderizado: ${item.nombre} x${item.cantidad}`);
    return card;
}

/**
 * RENDER CARRITO
 */
function renderCarrito(): void {
    const contenedor = document.getElementById("contenedor-carrito");
    const totalTxt = document.getElementById("total-final");
    const subtotalTxt = document.getElementById("subtotal");

    if (!contenedor || !totalTxt || !subtotalTxt) return;
    
    const carrito = getCarrito(); // TS ya sabe que devuelve ICartItem[]

    if (carrito.length === 0) {
        contenedor.innerHTML = `<p class="tarjeta-descripcion">Tu carrito está vacío.</p>`;
        totalTxt.textContent = subtotalTxt.textContent = "$0";
        return;
    }

    // Sumo los totales de cada item
    const acumulado = carrito.reduce((acc, item) => acc + item.total, 0);
    const formatoPrecio = `$${acumulado}`;

    contenedor.replaceChildren(...carrito.map(crearItemCarrito));
    totalTxt.textContent = subtotalTxt.textContent = formatoPrecio;
    
    // console.log("Carrito actualizado. Total final:", acumulado);
}

/**
 * EVENTOS: DELEGACIÓN DE CLIC
 */
document.addEventListener("click", (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    
    if (target.id === "btn-vaciar") {
        saveCarrito([]);
        renderCarrito();
        return;
    }
    

    const btn = target.closest("button");
    if (!btn || !btn.dataset.id) return;

    const id = Number(btn.dataset.id);
    let carrito = getCarrito();
    const op = btn.dataset.op;

    if (op) {
        // al sumar se busca el producto original 1 sola vez
        const productoOriginal = op === "sumar" ? PRODUCTS.find(p => p.id === id) : null;

        carrito = carrito.map(item => {
            if (item.id === id) {
                if (op === "sumar") {
                    if (productoOriginal && item.cantidad < productoOriginal.stock) {
                        item.cantidad++;
                    } else {
                        alert(`Límite de stock: ${productoOriginal?.stock || 0} unidades.`);
                    }
                } else if (op === "restar" && item.cantidad > 1) {
                    item.cantidad--;
                }
                item.total = item.precioUnidad * item.cantidad;
            }
            return item;
        });
        // console.log(`Operación ${op} realizada sobre ID: ${id}`);
    } 
    else if (btn.classList.contains("btn-eliminar")) {
        carrito = carrito.filter(item => item.id !== id);
        // console.log(`Producto ID ${id} eliminado del carrito`);
    }

    saveCarrito(carrito);
    renderCarrito();
});

// Inicialización
renderCarrito();
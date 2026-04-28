// lógica: render, cantidades, total
import type { Product as IProduct } from "../../../types/product";

interface ICartItem extends IProduct {
    cantidad: number;
}

const contenedor = document.getElementById("contenedor-carrito");
const totalTxt = document.getElementById("total-final");

const renderCarrito = () => {
    const carrito: ICartItem[] = JSON.parse(localStorage.getItem("carrito") || "[]");
    
    if (!contenedor || !totalTxt) return;
    contenedor.replaceChildren();

    if (carrito.length === 0) {
        const msg = document.createElement("p");
        msg.textContent = "Tu carrito está vacío.";
        contenedor.append(msg);
        totalTxt.textContent = "$0";
        return;
    }

    let acumulado = 0;

    carrito.forEach(item => {
        acumulado += item.precio * item.cantidad;
        
        const card = document.createElement("article");
        card.className = "tarjeta"; // Hereda fondo, padding y borde del CSS

        // 1. Imagen (Usa la clase del CSS para tamaño y ajuste)
        const img = document.createElement("img");
        img.className = "tarjeta-img"; 
        img.src = `/${item.imagen}`;

        // 2. Título
        const nombre = document.createElement("h3");
        nombre.className = "tarjeta-titulo";
        nombre.textContent = item.nombre;

        // 3. Info de precio
        const subtotal = document.createElement("p");
        subtotal.className = "tarjeta-descripcion";
        subtotal.textContent = `Cantidad: ${item.cantidad} - Subtotal: $${item.precio * item.cantidad}`;

        // 4. Controles (Footer de tarjeta usa flex y justify-content)
        const controles = document.createElement("div");
        controles.className = "tarjeta-footer";

        const btnMenos = document.createElement("button");
        btnMenos.className = "btn-agregar";
        btnMenos.textContent = "-";
        btnMenos.dataset.id = item.id.toString();
        btnMenos.dataset.op = "restar";

        const btnMas = document.createElement("button");
        btnMas.className = "btn-agregar";
        btnMas.textContent = "+";
        btnMas.dataset.id = item.id.toString();
        btnMas.dataset.op = "sumar";

        const btnEliminar = document.createElement("button");
        btnEliminar.className = "btn-agregar";
        btnEliminar.textContent = "Eliminar";
        btnEliminar.dataset.id = item.id.toString();
        // Estilo mínimo para diferenciar el botón de borrado
        btnEliminar.style.background = "var(--color-primario)";

        controles.append(btnMenos, btnMas, btnEliminar);

        // Armado sin estilos inline
        card.append(img, nombre, subtotal, controles);
        contenedor.append(card);
    });

    totalTxt.textContent = `$${acumulado}`;
};

// Delegación de eventos (Misma lógica, cero basura visual)
document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    let carrito: ICartItem[] = JSON.parse(localStorage.getItem("carrito") || "[]");

    const btnCant = target.closest(".btn-cantidad") || target.closest(".btn-agregar");
    const el = btnCant as HTMLElement;

    if (el && el.dataset.id && el.dataset.op) {
        const id = Number(el.dataset.id);
        const op = el.dataset.op;
        
        carrito = carrito.map(item => {
            if (item.id === id) {
                if (op === "sumar") item.cantidad++;
                if (op === "restar" && item.cantidad > 1) item.cantidad--;
            }
            return item;
        });
        localStorage.setItem("carrito", JSON.stringify(carrito));
        renderCarrito();
    }

    if (el && el.textContent === "Eliminar") {
        const id = Number(el.dataset.id);
        carrito = carrito.filter(item => item.id !== id);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        renderCarrito();
    }

    if (target.id === "btn-vaciar") {
        localStorage.removeItem("carrito");
        renderCarrito();
    }
});

renderCarrito();
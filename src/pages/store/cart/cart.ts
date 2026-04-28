// lógica: render, cantidades, total
import type { Product as IProduct } from "../../../types/product";

// Definimos la extensión aquí mismo para que el carrito sepa manejar 'cantidad'
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
        card.className = "tarjeta";
        // Estilos inline para mantener la estructura horizontal de la captura
        card.style.flexDirection = "row";
        card.style.width = "100%";
        card.style.marginBottom = "10px";
        card.style.alignItems = "center";
        card.style.gap = "15px";

        // 1. Imagen
        const img = document.createElement("img");
        img.src = `/${item.imagen}`;
        img.style.width = "60px";
        img.style.height = "60px";
        img.style.objectFit = "contain";
        img.style.borderRadius = "8px";

        // 2. Info (Nombre y Subtotal)
        const infoDiv = document.createElement("div");
        infoDiv.style.flexGrow = "1";

        const nombre = document.createElement("h3");
        nombre.style.fontSize = "1rem";
        nombre.textContent = item.nombre;

        const subtotal = document.createElement("p");
        subtotal.style.color = "var(--color-gris)";
        subtotal.style.fontSize = "0.85rem";
        subtotal.textContent = `Subtotal: $${item.precio * item.cantidad}`;

        infoDiv.append(nombre, subtotal);

        // 3. Controles
        const controles = document.createElement("div");
        controles.className = "tarjeta-footer";
        controles.style.gap = "10px";

        const btnMenos = document.createElement("button");
        btnMenos.textContent = "-";
        btnMenos.className = "btn-cantidad";
        btnMenos.dataset.id = item.id.toString();
        btnMenos.dataset.op = "restar";
        btnMenos.style.cssText = "background:#444; color:white; border:none; padding:5px 12px; border-radius:5px; cursor:pointer;";

        const cantSpan = document.createElement("span");
        cantSpan.textContent = item.cantidad.toString();
        cantSpan.style.fontWeight = "bold";

        const btnMas = document.createElement("button");
        btnMas.textContent = "+";
        btnMas.className = "btn-cantidad";
        btnMas.dataset.id = item.id.toString();
        btnMas.dataset.op = "sumar";
        btnMas.style.cssText = "background:#444; color:white; border:none; padding:5px 12px; border-radius:5px; cursor:pointer;";

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.className = "btn-eliminar";
        btnEliminar.dataset.id = item.id.toString();
        btnEliminar.style.cssText = "color:var(--color-primario); background:none; border:none; cursor:pointer; font-size:0.8rem; margin-left:10px;";

        controles.append(btnMenos, cantSpan, btnMas, btnEliminar);

        card.append(img, infoDiv, controles);
        contenedor.append(card);
    });

    totalTxt.textContent = `$${acumulado}`;
};

// Delegación de eventos
document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    let carrito: ICartItem[] = JSON.parse(localStorage.getItem("carrito") || "[]");

    const btnCant = target.closest(".btn-cantidad") as HTMLButtonElement;
    if (btnCant) {
        const id = Number(btnCant.dataset.id);
        const op = btnCant.dataset.op;
        
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

    const btnEliminar = target.closest(".btn-eliminar") as HTMLButtonElement;
    if (btnEliminar) {
        const id = Number(btnEliminar.dataset.id);
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
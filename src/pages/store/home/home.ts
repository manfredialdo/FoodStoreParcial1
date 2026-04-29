// lógica: render, búsqueda, filtros
import type { Product as IProduct } from "../../../types/product";
import type { Icategoria as ICategory } from "../../../types/categoria";
import { agregarProductoAlCarrito, getCarrito } from "../../../utils/localStorage";
// import { getCarrito } from "../../../utils/localStorage";

// 2. Datos (sin el .ts al final)
import { PRODUCTS } from "../../../data/data";

// 3. Tu lógica...
console.log("¿Llegaron los productos?", PRODUCTS);

/**
 * Función para renderizar las categorías en el menú lateral/superior
 */
const cargarCategorias = (productos: IProduct[]): void => {
    const ul = document.getElementById("lista-categorias") as HTMLUListElement;
    if (!ul) return;

    ul.replaceChildren();

    // Como 'categorias' no está exportado en data.ts, las sacamos de los productos
    const categoriasMapa = new Map<number, ICategory>();
    
    productos.forEach(p => {
        if (p.categorias) {
            p.categorias.forEach(cat => {
                categoriasMapa.set(cat.id, cat);
            });
        }
    });

    // Añadimos una opción para mostrar todos
    const liTodos = document.createElement("li");
    liTodos.innerHTML = `<a href="#" data-id="todos">Todos</a>`;
    ul.append(liTodos);

    categoriasMapa.forEach(cat => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = "#";
        a.textContent = cat.nombre;
        a.dataset.id = cat.id.toString();
        li.append(a);
        ul.append(li);
    });
};

/**
 * Procedimiento mostrarMenu adaptado para no romperse
 */
/**
 * Renderiza las tarjetas de forma segura evitando XSS
 */
const mostrarMenu = (datos: IProduct[]): void => {
    const contenedor = document.getElementById("contenedor-productos");
    if (!contenedor) return;

    contenedor.replaceChildren();

    datos.forEach(p => {
        const tarjeta = document.createElement("article");
        tarjeta.className = "tarjeta";

        // Creamos cada elemento manualmente. 
        // Usar .textContent es lo que nos da la seguridad total.
        
        const img = document.createElement("img");
        img.className = "tarjeta-img";
        img.src = `/${p.imagen}`;
        img.alt = p.nombre;

        const pCat = document.createElement("p");
        pCat.className = "tarjeta-categoria";
        pCat.textContent = p.categorias?.[0]?.nombre.toUpperCase() || "PRODUCTO";

        const h3 = document.createElement("h3");
        h3.className = "tarjeta-titulo";
        h3.textContent = p.nombre;

        const pDesc = document.createElement("p");
        pDesc.className = "tarjeta-descripcion";
        pDesc.textContent = p.descripcion;

        const divFooter = document.createElement("div");
        divFooter.className = "tarjeta-footer";

        const spanPrecio = document.createElement("span");
        spanPrecio.className = "tarjeta-precio";
        spanPrecio.textContent = `$${p.precio}`;

        const btn = document.createElement("button");
        btn.className = "btn-agregar";
        btn.dataset.id = p.id.toString();
        btn.dataset.nombre = p.nombre;
        // Para el botón, si querés el "+" usamos textContent y un span interno
        btn.innerHTML = `<span>+</span> Agregar`; 

        divFooter.append(spanPrecio, btn);
        tarjeta.append(img, pCat, h3, pDesc, divFooter);
        contenedor.append(tarjeta);
    });
};

// Delegación de Eventos
// Delegación de Eventos
document.addEventListener("click", (e: MouseEvent) => {
    const el = e.target as HTMLElement;

    // 1. Lógica para Agregar
    const btnAgregar = el.closest(".btn-agregar") as HTMLButtonElement;
    if (btnAgregar) {
        const id = Number(btnAgregar.dataset.id);
        const productoParaAgregar = PRODUCTS.find(p => p.id === id);

        if (productoParaAgregar) {
            agregarProductoAlCarrito(productoParaAgregar);
            const item = getCarrito().find(i => i.id === id);

            if (item) {
                // Quitamos el clear para ver el historial de clics
                console.log(`Producto: ${item.nombre} | Cantidad: ${item.cantidad} | Total: $${item.total}`);
            }
        }
        return; // Salimos para no evaluar filtros si ya clickeamos un botón
    }
    
    // 2. Lógica para Filtros
    const enlaceFiltro = el.closest(".link-filtro"); // Usar una clase específica es más seguro que solo "a"
    const filtroId = enlaceFiltro?.getAttribute("data-id");
    
    if (enlaceFiltro && filtroId) {
        e.preventDefault();
        const filtrados = filtroId === "todos" 
            ? PRODUCTS 
            : PRODUCTS.filter(p => p.categorias.some(c => c.id.toString() === filtroId));
            
        mostrarMenu(filtrados);
    }
});

// Inicialización
// Usamos directamente PRODUCTS que es lo que viene del archivo del profe
cargarCategorias(PRODUCTS);
mostrarMenu(PRODUCTS);
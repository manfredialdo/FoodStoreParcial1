// lógica: render, búsqueda, filtros
import type { Product as IProduct } from "../../../types/product";
import type { Icategoria as ICategory } from "../../../types/categoria";
import { agregarProductoAlCarrito, getCarrito } from "../../../utils/localStorage";
import { PRODUCTS } from "../../../data/data";

/**
 * Función para renderizar las categorías en el menú
 */
const cargarCategorias = (productos: IProduct[]): void => {
    const ul = document.getElementById("lista-categorias") as HTMLUListElement;
    if (!ul) return;

    ul.replaceChildren();

    const categoriasMapa = new Map<number, ICategory>();
    
    productos.forEach(p => {
        if (p.categorias) {
            p.categorias.forEach(cat => {
                categoriasMapa.set(cat.id, cat);
            });
        }
    });

    // --- OPCIÓN "TODOS" ---
    const liTodos = document.createElement("li");
    const aTodos = document.createElement("a");
    aTodos.href = "#";
    aTodos.textContent = "Todos";
    aTodos.dataset.id = "todos"; 
    liTodos.append(aTodos);
    ul.append(liTodos);

    // --- RESTO DE CATEGORÍAS ---
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
 * Renderiza las tarjetas de forma segura evitando XSS
 */
const mostrarMenu = (datos: IProduct[]): void => {
    const contenedor = document.getElementById("contenedor-productos");
    if (!contenedor) return;

    contenedor.replaceChildren();

    datos.forEach(p => {
        const tarjeta = document.createElement("article");
        tarjeta.className = "tarjeta";
        
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
        btn.innerHTML = `<span>+</span> Agregar`; 

        divFooter.append(spanPrecio, btn);
        tarjeta.append(img, pCat, h3, pDesc, divFooter);
        contenedor.append(tarjeta);
    });
};

// --- DELEGACIÓN DE EVENTOS (CLICK) ---
document.addEventListener("click", (e: MouseEvent) => {
    const el = e.target as HTMLElement;

    // 1. Lógica para Agregar al Carrito
    const btnAgregar = el.closest(".btn-agregar") as HTMLButtonElement;
    if (btnAgregar) {
        const id = Number(btnAgregar.dataset.id);
        const productoParaAgregar = PRODUCTS.find(p => p.id === id);

        if (productoParaAgregar) {
            agregarProductoAlCarrito(productoParaAgregar);
            const item = getCarrito().find(i => i.id === id);

            if (item) {
                console.log(`Producto: ${item.nombre} | Cantidad: ${item.cantidad} | Total: $${item.total}`);
            }
        }
        return; 
    }
    
    // 2. Lógica para Filtros de Categorías
    const enlaceFiltro = el.closest("a"); 
    const filtroId = enlaceFiltro?.dataset.id;

    if (enlaceFiltro && filtroId) {
        e.preventDefault();
        
        const filtrados = filtroId === "todos" 
            ? PRODUCTS 
            : PRODUCTS.filter(p => p.categorias.some(c => c.id.toString() === filtroId));
            
        mostrarMenu(filtrados);
        console.log(`Filtrando por: ${filtroId}`);
    }
});

// Inicialización
cargarCategorias(PRODUCTS);
mostrarMenu(PRODUCTS);
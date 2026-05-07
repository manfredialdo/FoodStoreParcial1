// src/pages/store/home/home.ts 
// Food Store Parcial 1, vista catalogo
// lógica: render, búsqueda, filtros
import type { Product as IProduct } from "../../../types/product";
import { agregarProductoAlCarrito, getCarrito } from "../../../utils/localStorage";
import { PRODUCTS } from "../../../data/data";

const formBusqueda = document.getElementById("form-busqueda") as HTMLFormElement;
const inputBusqueda = document.getElementById("input-busqueda") as HTMLInputElement;

/**
 * MENU CATEGORIAS
 */
function crearItemCategoria(id: string, nombre: string): HTMLLIElement {
    const li = document.createElement("li");
    const a = document.createElement("a");
    
    a.href = "#";
    a.textContent = nombre;
    a.dataset.id = id;
    
    li.append(a);
    return li;
}

/**
 * Carga o renderiza las categorías en el menú
 */
function cargarCategorias(productos: IProduct[]): void {
    const ul = document.getElementById("lista-categorias") as HTMLUListElement;
    if (!ul) return;

    const todasLasCategorias = productos.flatMap(p => p.categorias || []);
    const unicas = todasLasCategorias.filter((cat, index, self) => 
        index === self.findIndex(c => c.id === cat.id)
    );
    // console.log("Todas las categorías extraídas:", todasLasCategorias);

    const items = [
        crearItemCategoria("todos", "Todos"),
        ...unicas.map(cat => crearItemCategoria(cat.id.toString(), cat.nombre))
    ];

    ul.replaceChildren(...items);
}

/**
 * CREAR TARJETA PRODUCTOS
 */
function crearTarjeta(p: IProduct): HTMLElement {
    const tarjeta = document.createElement("article");
    tarjeta.className = "tarjeta";
    // console.log(`Renderizando tarjeta: ${p.nombre} | Imagen: /${p.imagen}`);

    tarjeta.innerHTML = `
        <img class="tarjeta-img" src="/${p.imagen}" alt="${p.nombre}">
        <p class="tarjeta-categoria"></p>
        <h3 class="tarjeta-titulo"></h3>
        <p class="tarjeta-descripcion"></p>
        <div class="tarjeta-footer">
            <span class="tarjeta-precio"></span>
            <button class="btn-agregar" data-id="${p.id}">
                <span>+</span> Agregar
            </button>
        </div>
    `;

    tarjeta.querySelector(".tarjeta-categoria")!.textContent = p.categorias?.[0]?.nombre.toUpperCase() || "PRODUCTO";
    tarjeta.querySelector(".tarjeta-titulo")!.textContent = p.nombre;
    tarjeta.querySelector(".tarjeta-descripcion")!.textContent = p.descripcion;
    tarjeta.querySelector(".tarjeta-precio")!.textContent = `$${p.precio}`;
    console.log(tarjeta)

    return tarjeta;
}

/**
 * MOSTRAR MENU
 */
function mostrarMenu(datos: IProduct[]): void {
    const contenedor = document.getElementById("contenedor-productos");
    if (!contenedor) return;

    contenedor.replaceChildren(...datos.map(crearTarjeta));
}

/**
 * EVENTOS: DELEGACIÓN DE CLIC (CARRITO Y FILTROS)
 */
document.addEventListener("click", function(e: MouseEvent) {
    const el = e.target as HTMLElement;

    const btnAgregar = el.closest(".btn-agregar") as HTMLButtonElement;
    
    if (btnAgregar) {
        const id = Number(btnAgregar.dataset.id);
        const productoParaAgregar = PRODUCTS.find(p => p.id === id);
    
        if (productoParaAgregar) {
            // --- VALIDACIÓN DE STOCK ---
            const carritoActual = getCarrito();
            const itemEnCarrito = carritoActual.find(i => i.id === id);
            const cantidadEnCarrito = itemEnCarrito ? itemEnCarrito.cantidad : 0;
    
            if (cantidadEnCarrito < productoParaAgregar.stock) {
                agregarProductoAlCarrito(productoParaAgregar);
                alert(`¡${productoParaAgregar.nombre} agregado!`);
            } else {
                alert(`Lo sentimos, no hay más stock de ${productoParaAgregar.nombre} (Máximo: ${productoParaAgregar.stock})`);
            }
        }
        return;
    }

    const enlaceFiltro = el.closest("a"); 
    const filtroId = enlaceFiltro?.dataset.id;

    if (enlaceFiltro && filtroId) {
        e.preventDefault();
        
        const filtrados = filtroId === "todos" 
            ? PRODUCTS 
            : PRODUCTS.filter(p => p.categorias.some(c => c.id.toString() === filtroId));

        mostrarMenu(filtrados);
        // console.log(`Filtrando por: ${filtroId}`);
    }
});

/**
 * LÓGICA DE EL CAMPO DE BÚSQUEDA
 */
formBusqueda?.addEventListener("input", function(e) {
    e.preventDefault();

    const busqueda = inputBusqueda.value.toLowerCase().trim();
    const resultados = PRODUCTS.filter(p => 
        p.nombre.toLowerCase().includes(busqueda)
    );
    
    // console.log(`Buscando: "${busqueda}" | Coincidencias: ${resultados.length}`);

    const contenedor = document.getElementById("contenedor-productos");
    if (!contenedor) return;

    if (resultados.length > 0) {
        mostrarMenu(resultados);
    } else {
        contenedor.replaceChildren();
        const mensaje = document.createElement("p");
        mensaje.className = "tarjeta-descripcion";
        mensaje.textContent = `No se encontraron productos que coincidan con "${busqueda}"`;
        contenedor.append(mensaje);
    }
});

// console.table(PRODUCTS);

// Inicialización
cargarCategorias(PRODUCTS);
mostrarMenu(PRODUCTS);
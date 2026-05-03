// src/pages/store/home/home.ts 
// Food Store Parcial 1, vista catalogo
// lógica: render, búsqueda, filtros
import type { Product as IProduct } from "../../../types/product";
import { agregarProductoAlCarrito, getCarrito } from "../../../utils/localStorage";
import { PRODUCTS } from "../../../data/data";
const formBusqueda = document.getElementById("form-busqueda") as HTMLFormElement;
const inputBusqueda = document.getElementById("input-busqueda") as HTMLInputElement;


/**
 * Crea un elemento de lista (li) para el menú de categorías y lo devuelve
 * @param id Identificador único de la categoría
 * @param nombre Nombre de la categoría
 * @returns Un elemento de lista (li) para el menú de categorías
 *
 * Crea un elemento de lista (li) para el menú de categorías y lo devuelve
 */
const crearItemCategoria = (id: string, nombre: string): HTMLLIElement => {
    const li = document.createElement("li");    // Crea un elemento de lista (li)
    const a = document.createElement("a");      // Crea un enlace (a)
    
    a.href = "#";                               // Establece el enlace para que no redireccione
    a.textContent = nombre;                     // Establece el texto del enlace
    a.dataset.id = id;                          // Establece el ID del enlace
    
    li.append(a);                               // Agrega el enlace a la lista
    return li;                                  // Devuelve la lista
};

/**
 * Carga o renderiza las categorías en el menú
 * 
 */
const cargarCategorias = (productos: IProduct[]): void => {
    const ul = document.getElementById("lista-categorias") as HTMLUListElement;
    if (!ul) return;
    // 1. Extraer categorías únicas de forma directa
    // Usamos flatMap para aplanar todos los arrays de categorías en uno solo
    const todasLasCategorias = productos.flatMap(p => p.categorias || []);
    // Filtramos para que no haya repetidos comparando el ID
    const unicas = todasLasCategorias.filter((cat, index, self) => 
        index === self.findIndex(c => c.id === cat.id)
    );
    // 2. Crear los elementos usando .map()
    const items = [
        crearItemCategoria("todos", "Todos"),
        ...unicas.map(cat => crearItemCategoria(cat.id.toString(), cat.nombre))
    ];
    // 3. Renderizar de una sola vez
    ul.replaceChildren(...items);
};

/**
 * Renderiza las tarjetas de productos en el DOM
 * Crea el elemento HTML de una tarjeta de producto y lo devuelve
 */
const crearTarjeta = (p: IProduct): HTMLElement => {
    const tarjeta = document.createElement("article");
    tarjeta.className = "tarjeta";

    // Estructura base (HTML estático)
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


    // Usamos el operador "!" porque sabemos que estos elementos existen en el string de arriba
    tarjeta.querySelector(".tarjeta-categoria")!.textContent = p.categorias?.[0]?.nombre.toUpperCase() || "PRODUCTO";
    tarjeta.querySelector(".tarjeta-titulo")!.textContent = p.nombre;
    tarjeta.querySelector(".tarjeta-descripcion")!.textContent = p.descripcion;
    tarjeta.querySelector(".tarjeta-precio")!.textContent = `$${p.precio}`;

    return tarjeta;
};

/**
 * Renderiza los productos en el DOM
 * Renderiza todas las tarjetas en el contenedor principal
 */
const mostrarMenu = (datos: IProduct[]): void => {
    const contenedor = document.getElementById("contenedor-productos");
    if (!contenedor) return;

    // 1. Limpia el contenedor
    // 2. Mapea los datos a elementos HTML
    // 3. Los esparce (...) como argumentos individuales para append
    contenedor.replaceChildren(...datos.map(crearTarjeta));
};

// --- LOGICA PARA EL BOTON AGREGAR ---
// --- DELEGACIÓN DE EVENTOS (CLICK BOTN AGREGAR) ---
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


// --- LÓGICA DE EL CAMPO DE BÚSQUEDA ---
formBusqueda?.addEventListener("input", (e) => {
    e.preventDefault(); // Evita que la página se recargue

    const busqueda = inputBusqueda.value.toLowerCase().trim();
    
    // Filtrar productos cuyo nombre incluya el texto buscado
    const resultados = PRODUCTS.filter(p => 
        p.nombre.toLowerCase().includes(busqueda)
    );

    const contenedor = document.getElementById("contenedor-productos");
    if (!contenedor) return;

    if (resultados.length > 0) {
        mostrarMenu(resultados);
    } else {
        // Si no hay resultados, limpiar y mostrar mensaje
        contenedor.replaceChildren();
        const mensaje = document.createElement("p");
        mensaje.className = "tarjeta-descripcion"; // Usamos tus clases de CSS
        mensaje.textContent = `No se encontraron productos que coincidan con "${busqueda}"`;
        contenedor.append(mensaje);
    }
});

// Inicialización
cargarCategorias(PRODUCTS);
mostrarMenu(PRODUCTS);
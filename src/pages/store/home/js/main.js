
const cargarCategorias = (lista) => {
    const ulCategorias = document.getElementById("lista-categorias");
    ulCategorias.replaceChildren(); // Forma moderna y segura de limpiar el contenedor

    lista.forEach(cat => {
        const li = document.createElement("li");
        const a = Object.assign(document.createElement("a"), {
            href: "#",
            textContent: cat.nombre
        });
        a.dataset.id = cat.id;

        li.append(a);
        ulCategorias.append(li);
    });
};

const mostrarMenu = (datos) => {
    const contenedor = document.getElementById("contenedor-productos");
    contenedor.replaceChildren(); // Limpia sin usar innerHTML

    datos.forEach((p) => {
        const tarjeta = document.createElement("article");
        tarjeta.className = "tarjeta";

        const img = Object.assign(document.createElement("img"), { 
            src: p.imagen, 
            alt: p.alt, 
            title: p.title 
        });
        img.style.width = "200px";

        const h3 = Object.assign(document.createElement("h3"), { textContent: p.titulo });
        const pDesc = Object.assign(document.createElement("p"), { textContent: p.descripcion });
        
        // Reemplazo de innerHTML en el precio:
        const pPrecio = document.createElement("p");
        const fuerte = Object.assign(document.createElement("strong"), { textContent: `$${p.precio}` });
        pPrecio.append(fuerte);

        const btn = Object.assign(document.createElement("button"), {
            type: "button",
            className: "btn-agregar",
            textContent: "Agregar"
        });
        btn.dataset.nombre = p.titulo;

        tarjeta.append(img, h3, pDesc, pPrecio, btn);
        contenedor.append(tarjeta);
    });
};

// Eventos
document.addEventListener("click", (e) => {
    const el = e.target;

    if (el.classList.contains("btn-agregar")) {
        alert(`Producto añadido: ${el.dataset.nombre}`);
    }
    
    if (el.dataset.id) {
        e.preventDefault();
        const seleccion = el.dataset.id;
        // Asumiendo que 'menu' es tu array global de productos
        mostrarMenu(seleccion === "todos" ? menu : menu.filter(p => p.categoria === seleccion));
    }
});

// Ejecución inicial
cargarCategorias(categorias);
mostrarMenu(menu);
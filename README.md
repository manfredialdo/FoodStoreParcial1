
# FOOD STORE PARCIAL 1 Aldo Manfredi

## 📋 Resumen del Proyecto
Esta aplicación es una posible solución del parcial 1 programacion 3 de la utn TUPAD, diseñada para ofrecer una experiencia de compra fluida, rápida y segura. El sistema gestiona automáticamente todo el flujo de venta, desde la exhibición de productos hasta el cálculo final de la compra... Las consignas en el pdf

## 🛠️ Funcionalidades Implementadas

### 📦 Catálogo Inteligente
* **Carga Automática**: Los productos se muestran dinámicamente, asegurando que la tienda siempre esté actualizada con el inventario más reciente.
* **Buscador en Tiempo Real**: Los usuarios pueden encontrar productos al instante simplemente escribiendo su nombre.
* **Control de Disponibilidad**: El sistema detecta automáticamente si un producto se agotó y bloquea la compra para evitar errores en el pedido.
* **Filtros por Categoría**: El menú se organiza solo según los tipos de productos disponibles, facilitando la navegación.

### 💳 Carrito de Compras Funcional
* **Memoria de Compra**: El carrito no se borra; si el usuario cierra la página o la refresca, sus productos siguen ahí guardados.
* **Validación de Inventario**: El sistema impide que se agreguen más unidades de las que realmente existen en el stock físico.
* **Cálculos Automáticos**: Se procesan los precios, cantidades y el total final de forma instantánea ante cualquier cambio.
* **Gestión de Cantidades**: El usuario puede sumar, restar o eliminar productos directamente desde el panel del carrito con actualización inmediata del precio.


---



## 📁 Estructura del Proyecto

```
/
/
├── src/
│   ├── data/
│   │   └── data.ts              # parcial1: Fuente de datos: PRODUCTS y getCategories()
│   ├── pages/
│   │   ├── admin/                           
│   │   ├── auth/                            
│   │   ├── client/                          
│   │   └── store/               # parcial1: Módulos públicos de la tienda
│   │       ├── home/
│   │       │   ├── home.html    # parcial1: Maquetación del catálogo de productos
│   │       │   └── home.ts      # p arcial 1: Lógica: renderizado, búsqueda y filtros
│   │       └── cart/
│   │           ├── cart.html    # parcial1: Vista del carrito de compras
│   │           └── cart.ts      # parcial1: Lógica: gestión de cantidades, totales y pedidos
│   ├── types/                   # parcial1: Definición de interfaces y tipos globales
│   │   ├── product.ts           # parcial1: Interfaces Product y CartItem
│   │   ├── categoria.ts         # parcial1: Interface ICategoria
│   │   └── user.ts                          # tp4: Interfaces IUser y Rol
│   └── utils/                   # Funciones auxiliares y lógica reutilizable
│       ├── auth.ts                          # tp4: Verificación de rol, sesión y permisos
│       ├── localStorage.ts      # parcial1: Persistencia de datos (Carrito, Token, Usuario) y tp4
│       └── navigate.ts          # Centralización de rutas y redirecciones
├── package.json                 # Scripts y dependencias del proyecto
└── README.md                    # Documentación principal```


---

## 🚀 Instalación y Uso

### 0. Clonamos el proyecto 

```bash
git clone https://github.com/manfredialdo/FoodStoreParcial1.git
```

### 1. Navega hacia la carpeta principal del frontend donde reside el proyecto Vite

```bash
cd FoodStoreParcial1
```


### 2. Instalar pnpm

Si no tienes `pnpm` instalado, puedes hacerlo fácilmente a través de `npm` (que viene con Node.js) ejecutando el siguiente comando en tu terminal:

```bash
npm install -g pnpm@latest-10
```

### 2. Instalar Dependencias del Proyecto

Una vez en la carpeta raíz del proyecto, instala las dependencias necesarias con `pnpm`:

```bash
pnpm install
```

### 3. Ejecutar el Proyecto

Para iniciar el servidor de desarrollo de Vite, ejecuta:

```bash
pnpm run dev
```


La aplicación estará disponible en la URL que aparezca en la terminal (generalmente `http://localhost:5173`).


---
# 📝 Documentación del Proyecto

## 📦 ¿Cómo Funciona la Gestión del Catálogo?
El catálogo es el motor visual de la tienda. Su funcionamiento se basa en la **renderización dinámica** y el **filtrado en tiempo real** mediante TypeScript:

### 1. Renderización Basada en Datos
* **Generación de Interfaz**: El sistema recorre el array central de productos (`PRODUCTS`) y, mediante una función constructora de HTML, genera "tarjetas" dinámicas en el DOM.
* **Validaciones de Seguridad**: Cada tarjeta incluye controles lógicos; por ejemplo, si un producto no tiene stock, el botón de compra se deshabilita automáticamente (usando la propiedad `disabled` de `HTMLButtonElement`) para mejorar la experiencia del usuario[cite: 1].

### 2. Búsqueda e Interacción
* **Eventos en Tiempo Real**: Utiliza eventos de tipo `input` en elementos `HTMLInputElement` para filtrar la lista de productos mientras el usuario escribe.
* **Motor de Filtrado**: El motor de búsqueda compara el texto ingresado con los nombres de los productos utilizando métodos de cadena (`includes`) y actualiza el DOM de forma inmediata.

### 3. Sistema de Categorías
* **Extracción Automática**: Las categorías se generan automáticamente extrayendo los valores únicos de la base de datos de productos.
* **Sincronización**: Esto garantiza que el menú lateral siempre esté sincronizado con los productos disponibles sin necesidad de actualizaciones manuales en el código.

---

## 💳 ¿Cómo Funciona la Gestión del Carrito?
La gestión del carrito garantiza la **persistencia** e **integridad** de la compra mediante tres pilares fundamentales:

### 1. Persistencia Local (LocalStorage)
* **Almacenamiento de Datos**: Toda la información del carrito se almacena en el navegador del usuario en formato **JSON**.
* **Continuidad de Sesión**: Esto permite que el usuario no pierda sus productos si refresca la página o cierra la sesión, utilizando funciones de sincronización como `getCarrito` y `saveCarrito`.

### 2. Validación Estricta de Stock
* **Doble Verificación**: Antes de agregar un producto o incrementar su cantidad, el sistema realiza un chequeo cruzado entre el elemento del carrito (`ICartItem`) y el stock real disponible en la base de datos original.
* **Prevención de Excesos**: Si se intenta superar el límite de stock, el sistema bloquea la acción mediante un `alert` y evita que la cantidad aumente indebidamente.

### 3. Cálculo Dinámico
* **Recálculo Automático**: El carrito actualiza subtotales y totales finales cada vez que se detecta un cambio (sumar, restar o eliminar un producto).
* **Procesamiento Eficiente**: Se utiliza el método `.reduce()` para procesar el acumulado económico de forma eficiente y limpia, asegurando que el total mostrado sea siempre exacto.

---

### 📋 Historias de Usuario (Pruebas de Validación)

* **HU-P1-03 (Agregar)**: El producto se persiste en el storage y gestiona correctamente el incremento de cantidades ante duplicados.
* **HU-P1-04 (Visualizar)**: Los datos de nombre, precio y cantidad se listan correctamente en la página de pedidos.
* **HU-P1-05 (Total)**: El total general de la compra se recalcula automáticamente ante cualquier modificación del carrito.
---


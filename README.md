#  PARCIAL 1 PROGRAMACION 3 Proyecto: Carrito + Protección de Rutas (Educativo) 

## ✍️ Descripción
En el parcial 1 se solicita:
1. Carrito básico con persistencia. Implementar un carrito de compras utilizando localStorage que permita:
   ● Agregar productos desde el catálogo
   ● Visualizar los productos agregados en una vista de carrito
   ● Mostrar nombre, precio y cantidad de cada producto
   ● Calcular y mostrar el total de la compra

2. Búsqueda y filtrado de productos
   Incorporar funcionalidades de interacción sobre el catálogo:
   ● Búsqueda de productos por nombre
   ● Filtrado por categoría (desde el menú lateral o equivalente)

Vale decir, por otro lado q el presente proyecto es una continuacion trabajo practico 4 (typescript, unidad 4) que es una demostración creado con fines educativos para ilustrar un mecanismo básico de protección de rutas en el lado del cliente (frontend) utilizando **Vite** y **TypeScript**. El objetivo por fue mostrar cómo se puede restringir el acceso a ciertas páginas según el rol de un usuario (por ejemplo, `ADMIN` o `CLIENT`).

---
## ✍️ Descripción
En el presente proyecto se implementa como demostración educativa para ilustrar la implementación de un carrito de compras funcional en el lado del cliente (frontend). El objetivo principal es mostrar cómo gestionar el estado de los productos seleccionados y garantizar la persistencia de datos utilizando el localStorage del navegador.



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
npm -g install pnpm
```

### 2. Instalar Dependencias del Proyecto

Una vez en la carpeta raíz del proyecto, instala las dependencias necesarias con `pnpm`:

```bash
pnpm install
```

### 3. Ejecutar el Proyecto

Para iniciar el servidor de desarrollo de Vite, ejecuta:

```bash
pnpm dev
```


La aplicación estará disponible en la URL que aparezca en la terminal (generalmente `http://localhost:5173`).


---
# 📝 Documentación del Proyecto

## 📦 ¿Cómo Funciona la Gestión del Catálogo?
El catálogo es el motor visual de la tienda. Su funcionamiento se basa en la **renderización dinámica** y el **filtrado en tiempo real** mediante TypeScript[cite: 1]:

### 1. Renderización Basada en Datos
* **Generación de Interfaz**: El sistema recorre el array central de productos (`PRODUCTS`) y, mediante una función constructora de HTML, genera "tarjetas" dinámicas en el DOM[cite: 1].
* **Validaciones de Seguridad**: Cada tarjeta incluye controles lógicos; por ejemplo, si un producto no tiene stock, el botón de compra se deshabilita automáticamente (usando la propiedad `disabled` de `HTMLButtonElement`) para mejorar la experiencia del usuario[cite: 1].

### 2. Búsqueda e Interacción
* **Eventos en Tiempo Real**: Utiliza eventos de tipo `input` en elementos `HTMLInputElement` para filtrar la lista de productos mientras el usuario escribe[cite: 1].
* **Motor de Filtrado**: El motor de búsqueda compara el texto ingresado con los nombres de los productos utilizando métodos de cadena (`includes`) y actualiza el DOM de forma inmediata[cite: 1].

### 3. Sistema de Categorías
* **Extracción Automática**: Las categorías se generan automáticamente extrayendo los valores únicos de la base de datos de productos[cite: 1].
* **Sincronización**: Esto garantiza que el menú lateral siempre esté sincronizado con los productos disponibles sin necesidad de actualizaciones manuales en el código[cite: 1].

---

## 💳 ¿Cómo Funciona la Gestión del Carrito?
La gestión del carrito garantiza la **persistencia** e **integridad** de la compra mediante tres pilares fundamentales:

### 1. Persistencia Local (LocalStorage)
* **Almacenamiento de Datos**: Toda la información del carrito se almacena en el navegador del usuario en formato **JSON**[cite: 1].
* **Continuidad de Sesión**: Esto permite que el usuario no pierda sus productos si refresca la página o cierra la sesión, utilizando funciones de sincronización como `getCarrito` y `saveCarrito`[cite: 1].

### 2. Validación Estricta de Stock
* **Doble Verificación**: Antes de agregar un producto o incrementar su cantidad, el sistema realiza un chequeo cruzado entre el elemento del carrito (`ICartItem`) y el stock real disponible en la base de datos original[cite: 1].
* **Prevención de Excesos**: Si se intenta superar el límite de stock, el sistema bloquea la acción mediante un `alert` y evita que la cantidad aumente indebidamente[cite: 1].

### 3. Cálculo Dinámico
* **Recálculo Automático**: El carrito actualiza subtotales y totales finales cada vez que se detecta un cambio (sumar, restar o eliminar un producto)[cite: 1].
* **Procesamiento Eficiente**: Se utiliza el método `.reduce()` para procesar el acumulado económico de forma eficiente y limpia, asegurando que el total mostrado sea siempre exacto[cite: 1].

---

### 📋 Historias de Usuario (Pruebas de Validación)

* **HU-P1-03 (Agregar)**: El producto se persiste en el storage y gestiona correctamente el incremento de cantidades ante duplicados.
* **HU-P1-04 (Visualizar)**: Los datos de nombre, precio y cantidad se listan correctamente en la página de pedidos.
* **HU-P1-05 (Total)**: El total general de la compra se recalcula automáticamente ante cualquier modificación del carrito.
---

## 📁 Estructura del Proyecto

```
/
/
├── src/
│   ├── data/
│   │   └── data.ts              # parcial1: Fuente de datos: PRODUCTS y getCategories()
│   ├── pages/
│   │   ├── admin/                           # tp4: Vistas y lógica exclusivas para administradores
│   │   ├── auth/                            # tp4: Gestión de autenticación (Login, Registro)
│   │   ├── client/                          # tp4: Vistas privadas para clientes registrados
│   │   └── store/               # parcial1: Módulos públicos de la tienda
│   │       ├── home/
│   │       │   ├── home.html                # tp4: Maquetación del catálogo de productos
│   │       │   └── home.ts                  # tp4: Lógica: renderizado, búsqueda y filtros
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

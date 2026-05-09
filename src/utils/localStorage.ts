// /home/user/FoodStoreParcial1/src/utils/localStorage.ts
import type { Product as IProduct, ICartItem } from "../types/product"; 
import type { IUser } from "../types/IUser";

// --- FUNCIONES DEL CARRITO ---
/**
 * Obtiene el carrito desde localStorage
 */
export function getCarrito(): ICartItem[] {
    const data = localStorage.getItem("carrito");
    return data ? (JSON.parse(data) as ICartItem[]) : [];
}

/**
 * Guarda el array del carrito en localStorage
 */
export function saveCarrito(carrito: ICartItem[]): void {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

/**
 * Agrega un producto o incrementa su cantidad si ya existe
 */
export function agregarProductoAlCarrito(producto: IProduct): void {
    const carrito = getCarrito();
    const itemExistente = carrito.find(item => item.id === producto.id);

    if (itemExistente) {
        if (itemExistente.cantidad < producto.stock) {
            itemExistente.cantidad++; 
            itemExistente.total = itemExistente.precioUnidad * itemExistente.cantidad;
            // console.table(`Actualizando: ${itemExistente.nombre} x${itemExistente.cantidad}. Total: $${itemExistente.total}`);
        } else {
            alert(`No hay más stock disponible de ${producto.nombre}`);
            return; // Salimos sin guardar si no hay stock
        }
    } else {
        const nuevoItem: ICartItem = {
            id: producto.id,
            nombre: producto.nombre,
            precioUnidad: producto.precio,
            cantidad: 1,
            total: producto.precio,
            imagen: producto.imagen,
            categorias: producto.categorias
        };
        carrito.push(nuevoItem);
    }
    saveCarrito(carrito);
}

// --- FUNCIONES DE USUARIOS Y SESIÓN ---
/**
 * localstorage del tp4
 * Obtiene la lista global de usuarios registrados
 
// import type { IUser } from "../types/IUser";

export const getUsuarios = (): any[] => {
  const data = localStorage.getItem("users");
  return data ? JSON.parse(data) : [];
};

export const saveListaUsuarios = (usuarios: any[]) => {
  localStorage.setItem("users", JSON.stringify(usuarios));
};


export const saveUser = (user: IUser) => {
  const parseUser = JSON.stringify(user);
  localStorage.setItem("userData", parseUser);
};
export const getUSer = () => {
  return localStorage.getItem("userData");
};
export const removeUser = () => {
  localStorage.removeItem("userData");
};
*/


export function getUsuarios(): IUser[] {
  const data = localStorage.getItem("users");
  return data ? (JSON.parse(data) as IUser[]) : [];
}

/**
* Guarda la lista actualizada de usuarios
*/
export function saveListaUsuarios(usuarios: IUser[]): void {
  localStorage.setItem("users", JSON.stringify(usuarios));
}

/**
* Guarda el usuario que inició sesión actualmente
*/
export function saveUser(user: IUser): void {
  localStorage.setItem("userData", JSON.stringify(user));
}

/**
* Obtiene los datos del usuario logueado. 
* Corregido para que devuelva el objeto IUser parseado en lugar de un string crudo.
*/
export function getLoggedUser(): IUser | null {
  const data = localStorage.getItem("userData");
  return data ? (JSON.parse(data) as IUser) : null;
}

/**
* Elimina la sesión del usuario (Logout)
*/
export function removeUser(): void {
  localStorage.removeItem("userData");
}
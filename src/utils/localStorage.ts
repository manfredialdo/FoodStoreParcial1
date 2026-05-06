import type { Product as IProduct, ICartItem } from "../types/product"; // Importación actualizada
import type { IUser } from "../types/IUser";

// --- FUNCIONES DEL CARRITO ---

/**
 * Obtiene el carrito desde localStorage
 */
export function getCarrito(): ICartItem[] {
    const data = localStorage.getItem("carrito");
    return data ? JSON.parse(data) : [];
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
    
    const itemExistente = carrito.find(function(item) {
        return item.id === producto.id;
    });

    if (itemExistente) {
        itemExistente.cantidad++; 
        itemExistente.total = itemExistente.precioUnidad * itemExistente.cantidad;
        
        console.log(`Actualizando: ${itemExistente.nombre} x${itemExistente.cantidad}. Total: $${itemExistente.total}`);
    } else {
        const nuevoItem: ICartItem = {
            id: producto.id,
            nombre: producto.nombre,
            precioUnidad: producto.precio,
            cantidad: 1,
            total: producto.precio
        };
        carrito.push(nuevoItem);
    }

    saveCarrito(carrito);
}

// --- FUNCIONES DE USUARIOS Y SESIÓN ---

export function getUsuarios(): any[] {
    const data = localStorage.getItem("users");
    return data ? JSON.parse(data) : [];
}

export function saveListaUsuarios(usuarios: any[]): void {
    localStorage.setItem("users", JSON.stringify(usuarios));
}

export function saveUser(user: IUser): void {
    localStorage.setItem("userData", JSON.stringify(user));
}

export function getUSer(): string | null {
    return localStorage.getItem("userData");
}

export function removeUser(): void {
    localStorage.removeItem("userData");
}
import type { Product as IProduct } from "../types/product";
import type { IUser } from "../types/IUser";


// --- FUNCIONES DEL CARRITO ---
// 1. ACTUALIZAMOS LA INTERFAZ (Agregamos los campos que faltaban)
export interface ICartItem {
    id: number;
    nombre: string;
    precioUnidad: number;
    cantidad: number;
    total: number;
}

export const getCarrito = (): ICartItem[] => {
    const data = localStorage.getItem("carrito");
    return data ? JSON.parse(data) : [];
};

export const saveCarrito = (carrito: ICartItem[]): void => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
};

export const agregarProductoAlCarrito = (producto: IProduct): void => {
    const carrito = getCarrito();
    
    // Ahora TypeScript sabe que 'item' tiene total y precioUnidad
    const itemExistente = carrito.find(item => item.id === producto.id);

    if (itemExistente) {
        itemExistente.cantidad++; 
        // Actualizamos el total usando el precioUnidad que ya guardamos
        itemExistente.total = itemExistente.precioUnidad * itemExistente.cantidad;
        
        console.log(`Actualizando: ${itemExistente.nombre} x${itemExistente.cantidad}. Total: $${itemExistente.total}`);
    } else {
        // Creamos el nuevo item respetando la interfaz
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
};

// ---------------------------------
// --- FUNCIONES TP4 ----
// --- FUNCIONES DE USUARIOS ---
export const getUsuarios = (): any[] => {
    const data = localStorage.getItem("users");
    return data ? JSON.parse(data) : [];
};

export const saveListaUsuarios = (usuarios: any[]) => {
    localStorage.setItem("users", JSON.stringify(usuarios));
};

// --- FUNCIONES DE SESIÓN ---
export const saveUser = (user: IUser) => {
    localStorage.setItem("userData", JSON.stringify(user));
};

export const getUSer = () => {
    return localStorage.getItem("userData");
};

export const removeUser = () => {
    localStorage.removeItem("userData");
};

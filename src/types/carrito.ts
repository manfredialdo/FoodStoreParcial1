// /src/types/carrito.ts
// parcial1
import type { Icategoria } from "./categoria";

export interface ICarritoItem {
    id: number;
    nombre: string;
    precioUnidad: number; // El precio base del producto
    cantidad: number;     // Cuántos lleva el usuario
    total: number;        // subtotal calculado (precioUnidad * cantidad)
    imagen: string;       // Para mostrar la foto también en el carrito
    categorias: Icategoria[]; // Para mantener la coherencia con el producto original
}
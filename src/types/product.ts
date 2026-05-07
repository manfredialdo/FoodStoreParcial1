// /home/user/FoodStoreParcial1/src/types/product.ts
//  interfaces Product y CartItem
/**
 * Interfaz principal para los Productos del catálogo
 */
import type { Icategoria } from "./categoria";

export interface Product {
  id: number;
  nombre: string;       // Nombre del producto (se muestra en la tarjeta)
  precio: number;       // Valor numérico para cálculos
  descripcion: string;  // Detalle del producto
  stock: number;        // Cantidad disponible en almacén
  imagen: string;       // Ruta de la imagen (ej: "pizza.jpg")
  disponible: boolean;  // Si está a la venta o no
  categorias: Icategoria[]; // Array de objetos de categoría (relación)
  createdAt: string;    // Fecha de alta
  eliminado: boolean;   // Borrado lógico
  
  // Propiedades opcionales para mayor flexibilidad
  title?: string;       
  alt?: string;
}


export interface ICartItem {
  id: number;
  nombre: string;
  precioUnidad: number; // El precio base del producto
  cantidad: number;     // Cuántos lleva el usuario
  total: number;        // subtotal calculado (precioUnidad * cantidad)
  imagen: string;       // Para mostrar la foto también en el carrito
  categorias: Icategoria[]; // Para mantener la coherencia con el producto original
}
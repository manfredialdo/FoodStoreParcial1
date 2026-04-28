// interface Icategoria
// src/types/categoria.ts
export interface Icategoria {  
  id: number;
  nombre: string;
  eliminado: boolean;
  createdAt: string;
  descripcion: string;
}
export type ICategory = Icategoria;
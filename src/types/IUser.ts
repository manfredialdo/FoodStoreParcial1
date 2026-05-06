// /home/user/FoodStoreParcial1/src/types/IUser.ts
import type { Rol } from "./Rol";

export interface IUser {
  email: string;
  loggedIn: boolean;
  role: Rol;
}

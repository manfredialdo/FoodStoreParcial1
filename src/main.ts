// /src/main.ts
import type { IUser } from "./types/IUser";

const checkAuth = (): void => {
  const currentPath = window.location.pathname;
  
  const userDataJSON = localStorage.getItem("userData");
  const user: IUser | null = userDataJSON ? JSON.parse(userDataJSON) : null;

  // A. Si no hay sesión y no está intentando loguearse o registrarse
  // Agregamos registro.html para que no te rebote si te querés registrar
  const isAuthPage = currentPath.includes("login.html") || currentPath.includes("registro.html");

  if (!user && !isAuthPage && currentPath !== "/") {
    window.location.href = "/src/pages/auth/login/login.html";
    return;
  }

  // B. Validación de Rol (Protección de carpeta /admin/)
  if (user && currentPath.includes("/admin/")) {
    if (user.role !== "admin") {
      console.warn("Acceso denegado: Se requiere rol de Admin");
      // Redirigir a la zona de cliente si es un intruso
      window.location.href = "/src/pages/client/home/home.html";
    }
  }

  // C. Si ya está logueado e intenta ir al login, mandarlo a su home
  if (user && isAuthPage) {
    const target = user.role === "admin" ? "/src/pages/admin/home/home.html" : "/src/pages/client/home/home.html";
    window.location.href = target;
  }
};

checkAuth();